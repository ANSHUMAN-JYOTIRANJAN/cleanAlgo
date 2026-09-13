import {
    UserRound,
    Sword,
    Brain,
    Target,
    Shield,
    Sparkles,
    Coins
} from "lucide-react";

import { useGame } from "../context/GameContext";

function Character() {

    const {
        gameState,
        level,
        progress
    } = useGame();

    const {
        attributes,
        gold
    } = gameState;

    const characterStats = [
        {
            name: "Strength",
            value: attributes.strength,
            icon: Sword,
            description: "Physical power and fitness"
        },
        {
            name: "Intellect",
            value: attributes.intellect,
            icon: Brain,
            description: "Learning and problem solving"
        },
        {
            name: "Focus",
            value: attributes.focus,
            icon: Target,
            description: "Concentration and consistency"
        },
        {
            name: "Discipline",
            value: attributes.discipline,
            icon: Shield,
            description: "Self-control and habits"
        }
    ];

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* HEADER */}

            <section>

                <p className="text-sm text-violet-400">
                    CHARACTER
                </p>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                    Your Character
                </h1>

                <p className="mt-2 text-gray-500">
                    Track your real-world progress and become stronger every day.
                </p>

            </section>


            {/* CHARACTER OVERVIEW */}

            <section className="grid gap-6 lg:grid-cols-3">

                {/* CHARACTER CARD */}

                <div className="rounded-2xl border border-white/10 bg-[#101522] p-6 lg:col-span-1">

                    <div className="flex flex-col items-center text-center">

                        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">

                            <UserRound
                                size={55}
                                className="text-violet-400"
                            />

                        </div>

                        <h2 className="mt-5 text-2xl font-bold">
                            Adventurer
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Level {level}
                        </p>

                    </div>


                    {/* XP */}

                    <div className="mt-8">

                        <div className="mb-2 flex items-center justify-between">

                            <span className="text-sm text-gray-400">
                                Experience
                            </span>

                            <span className="text-sm font-semibold text-violet-400">
                                {progress.currentXP} / {progress.requiredXP} XP
                            </span>

                        </div>

                        <div
                            className="h-3 overflow-hidden rounded-full bg-white/5"
                            role="progressbar"
                            aria-valuenow={progress.currentXP}
                            aria-valuemin="0"
                            aria-valuemax={progress.requiredXP}
                        >

                            <div
                                className="h-full rounded-full bg-violet-500 transition-all duration-500"
                                style={{
                                    width: `${progress.percentage}%`
                                }}
                            />

                        </div>

                        <p className="mt-2 text-xs text-gray-500">
                            {Math.max(
                                0,
                                progress.requiredXP - progress.currentXP
                            )} XP needed for the next level
                        </p>

                    </div>

                </div>


                {/* CHARACTER INFORMATION */}

                <div className="space-y-6 lg:col-span-2">

                    {/* LEVEL */}

                    <div className="rounded-2xl border border-white/10 bg-[#101522] p-6">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">

                                <Sparkles
                                    size={24}
                                    className="text-violet-400"
                                />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Current Level
                                </p>

                                <p className="text-3xl font-bold">
                                    Level {level}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* GOLD */}

                    <div className="rounded-2xl border border-white/10 bg-[#101522] p-6">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">

                                <Coins
                                    size={24}
                                    className="text-yellow-400"
                                />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Gold
                                </p>

                                <p className="text-3xl font-bold text-yellow-400">
                                    {gold}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ATTRIBUTES */}

            <section>

                <div className="mb-5">

                    <p className="text-sm text-violet-400">
                        ATTRIBUTES
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Character Stats
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Your real-world activities improve different abilities.
                    </p>

                </div>


                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {characterStats.map((stat) => {

                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.name}
                                className="rounded-2xl border border-white/10 bg-[#101522] p-6 transition hover:-translate-y-1 hover:border-violet-500/30"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">

                                        <Icon
                                            size={24}
                                            className="text-violet-400"
                                        />

                                    </div>

                                    <span className="text-3xl font-bold">
                                        {stat.value}
                                    </span>

                                </div>


                                <h3 className="mt-5 text-lg font-bold">
                                    {stat.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {stat.description}
                                </p>

                            </div>
                        );
                    })}

                </div>

            </section>


            {/* RPG EXPLANATION */}

            <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">

                <div className="flex gap-4">

                    <Sparkles
                        size={24}
                        className="mt-1 shrink-0 text-violet-400"
                    />

                    <div>

                        <h3 className="font-bold">
                            Build your character through real life
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Complete different types of quests to improve
                            different attributes. Studying increases Intellect,
                            exercising increases Strength, and focused work
                            increases Focus.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Character;