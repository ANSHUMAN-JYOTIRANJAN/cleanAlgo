import {
    ShoppingBag,
    Shield,
    Palette,
    Crown,
    Sparkles,
    Check
} from "lucide-react";
import { useEffect, useState } from "react";

import { useGame } from "../context/GameContext";
import api from "../services/api";

function Shop() {

    const {
        gameState,
        buyItem
    } = useGame();

    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/shop")
            .then(({ data }) => setItems(data.items))
            .catch((requestError) => {
                setError(requestError.response?.data?.message || "Unable to load shop");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleBuy = async (item) => {
        setError("");

        try {
            await buyItem(item);
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to purchase item");
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* HEADER */}

            <section>

                <p className="text-sm font-semibold text-violet-400">
                    ITEM SHOP
                </p>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                    Adventurer's Shop
                </h1>

                <p className="mt-2 text-gray-500">
                    Spend your hard-earned Gold on special items.
                </p>

            </section>

            {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                </p>
            )}


            {/* GOLD */}

            <section className="flex items-center justify-between rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

                <div>

                    <p className="text-sm text-gray-500">
                        Your Gold
                    </p>

                    <p className="mt-1 text-3xl font-bold text-yellow-400">
                        🪙 {gameState.gold}
                    </p>

                </div>

                <ShoppingBag
                    size={35}
                    className="text-yellow-400"
                />

            </section>


            {/* SHOP ITEMS */}

            <section>

                <div className="mb-5">

                    <p className="text-sm font-semibold text-violet-400">
                        AVAILABLE ITEMS
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Choose Your Reward
                    </h2>

                </div>


                {loading ? (
                    <p className="text-gray-500">Loading shop...</p>
                ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {items.map((item) => {

                        const Icon = {
                            Badge: Shield,
                            Theme: Palette,
                            Cosmetic: Crown,
                            Reward: Sparkles
                        }[item.type] || Sparkles;

                        const canBuy =
                            gameState.gold >= item.price;

                        return (
                            <div
                                key={item.id}
                                className="group rounded-2xl border border-white/10 bg-[#101522] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30"
                            >

                                {/* ICON */}

                                <div className="flex items-center justify-between">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">

                                        <Icon
                                            size={28}
                                            className="text-violet-400"
                                        />

                                    </div>
                                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                                        {item.type}
                                    </span>

                                </div>


                                {/* NAME */}

                                <h3 className="mt-6 text-xl font-bold">
                                    {item.name}
                                </h3>


                                {/* DESCRIPTION */}

                                <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                                    {item.description}
                                </p>


                                {/* PRICE */}

                                <div className="mt-6 flex items-center justify-between">

                                    <div>

                                        <p className="text-xs text-gray-500">
                                            PRICE
                                        </p>

                                        <p className="mt-1 font-bold text-yellow-400">
                                            🪙 {item.price}
                                        </p>

                                    </div>


                                    <button
                                        onClick={() =>
                                            handleBuy(item)
                                        }
                                        disabled={!canBuy}
                                        className={`rounded-xl px-4 py-2 font-semibold transition active:scale-95 ${
                                            canBuy
                                                ? "bg-violet-500 text-white hover:bg-violet-400"
                                                : "cursor-not-allowed bg-white/5 text-gray-600"
                                        }`}
                                    >
                                        {canBuy
                                            ? "Buy"
                                            : "Locked"}
                                    </button>

                                </div>

                            </div>
                        );
                    })}

                </div>
                )}

            </section>


            {/* INFO */}

            <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">

                <div className="flex gap-4">

                    <Check
                        size={24}
                        className="mt-1 shrink-0 text-violet-400"
                    />

                    <div>

                        <h3 className="font-bold">
                            Earn more Gold by completing quests
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Complete your daily quests to earn Gold,
                            then spend it here to unlock special items.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Shop;