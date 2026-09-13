import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../services/api";
import {
    getLevelFromXP,
    getXPProgress
} from "../utils/progression";

const GameContext = createContext();
const STORAGE_KEY = "life-rpg-game-state";

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

function getDateDifference(date1, date2) {
    const first = new Date(date1);
    const second = new Date(date2);

    const difference =
        Math.abs(second - first) / (1000 * 60 * 60 * 24);

    return Math.round(difference);
}

const initialGameState = {
    totalXP: 0,
    gold: 420,
    streak: 0,
    lastActivityDate: null,

    attributes: {
        intellect: 0,
        strength: 0,
        focus: 0,
        discipline: 0
    },

    inventory: []
};

function loadGameState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return initialGameState;
        }

        const parsed = JSON.parse(saved);

        return {
            ...initialGameState,
            ...parsed,
            attributes: {
                ...initialGameState.attributes,
                ...(parsed.attributes || {})
            },
            inventory: Array.isArray(parsed.inventory)
                ? parsed.inventory
                : []
        };
    } catch {
        return initialGameState;
    }
}

export function GameProvider({ children }) {

    const [gameState, setGameState] = useState(loadGameState);

    const [levelUp, setLevelUp] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(gameState)
        );
    }, [gameState]);

    const level = getLevelFromXP(gameState.totalXP);

    const progress = getXPProgress(
        gameState.totalXP,
        level
    );

    const hydrateFromProfile = useCallback((profile = {}) => {
        const stats = profile.stats || {};

        setGameState({
            totalXP: Number(profile.totalXp ?? profile.xp ?? 0),
            gold: Number(profile.gold ?? 0),
            streak: Number(profile.currentStreak ?? profile.streak ?? 0),
            lastActivityDate: profile.lastActiveDate ?? null,
            attributes: {
                intellect: Number(stats.intelligence ?? 0),
                strength: Number(stats.strength ?? 0),
                focus: Number(stats.social ?? 0),
                discipline: Number(stats.discipline ?? 0)
            },
            inventory: Array.isArray(profile.inventory)
                ? profile.inventory
                : []
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        api.get("/auth/me")
            .then(({ data }) => {
                localStorage.setItem("user", JSON.stringify(data.user));
                hydrateFromProfile(data.user);
            })
            .catch((requestError) => {
                if (requestError.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    return;
                }

                console.error("Unable to load profile:", requestError);
            });
    }, [hydrateFromProfile]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem(STORAGE_KEY);
        setGameState(initialGameState);
    };

    // --------------------------------
    // ADD XP
    // --------------------------------

    const addXP = (amount) => {

        setGameState((current) => {

            const oldLevel = getLevelFromXP(
                current.totalXP
            );

            const newTotalXP =
                current.totalXP + amount;

            const newLevel =
                getLevelFromXP(newTotalXP);

            if (newLevel > oldLevel) {

                setLevelUp({
                    oldLevel,
                    newLevel
                });

            }

            return {
                ...current,
                totalXP: newTotalXP
            };

        });
    };


    // --------------------------------
    // ADD GOLD
    // --------------------------------

    const addGold = (amount) => {

        setGameState((current) => ({
            ...current,
            gold: current.gold + amount
        }));

    };


    // --------------------------------
    // UPDATE STREAK
    // --------------------------------

    const updateStreak = () => {

        const today = getTodayDate();

        setGameState((current) => {

            if (!current.lastActivityDate) {

                return {
                    ...current,
                    streak: 1,
                    lastActivityDate: today
                };

            }

            if (current.lastActivityDate === today) {

                return current;

            }

            const daysPassed = getDateDifference(
                current.lastActivityDate,
                today
            );

            if (daysPassed === 1) {

                return {
                    ...current,
                    streak: current.streak + 1,
                    lastActivityDate: today
                };

            }

            return {
                ...current,
                streak: 1,
                lastActivityDate: today
            };

        });
    };


    // --------------------------------
    // COMPLETE QUEST REWARD
    // --------------------------------

    const completeQuestReward = ({
        xp,
        gold,
        attribute
    }) => {

        setGameState((current) => {

            const oldLevel =
                getLevelFromXP(current.totalXP);

            const newTotalXP =
                current.totalXP + xp;

            const newLevel =
                getLevelFromXP(newTotalXP);

            if (newLevel > oldLevel) {

                setLevelUp({
                    oldLevel,
                    newLevel
                });

            }

            const updatedAttributes = {
                ...current.attributes
            };

            if (
                attribute &&
                updatedAttributes[attribute] !== undefined
            ) {
                updatedAttributes[attribute] += 1;
            }

            return {
                ...current,

                totalXP: newTotalXP,

                gold: current.gold + gold,

                attributes: updatedAttributes
            };

        });

        updateStreak();
    };


    // --------------------------------
    // CLOSE LEVEL-UP POPUP
    // --------------------------------

    const closeLevelUp = () => {
        setLevelUp(null);
    };


    // --------------------------------
    // BUY ITEM
    // --------------------------------

    const buyItem = async (item) => {
        const { data } = await api.post(`/shop/${item.id}/purchase`);

        setGameState((current) => ({
            ...current,
            gold: Number(data.user.gold),
            inventory: data.user.inventory
        }));

        return true;
    };


    return (
        <GameContext.Provider
            value={{
                gameState,
                level,
                progress,
                levelUp,
                closeLevelUp,
                addXP,
                addGold,
                updateStreak,
                completeQuestReward,
                buyItem,
                logout,
                hydrateFromProfile
            }}
        >
            {children}
        </GameContext.Provider>
    );
}


export function useGame() {
    return useContext(GameContext);
}
