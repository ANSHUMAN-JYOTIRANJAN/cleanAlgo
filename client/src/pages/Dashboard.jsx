import {
    Trophy,
    Coins,
    Flame,
    Sparkles,
    Sword,
    Brain,
    Target,
    Shield
} from "lucide-react";

import { useGame } from "../context/GameContext";

function Dashboard() {

    const {
        gameState,
        level,
        progress
    } = useGame();

    const {
        gold,
        streak,
        attributes
    } = gameState;

    const stats = [
        {
            name: "Strength",
            value: attributes.strength,
            icon: Sword
        },
        {
            name: "Intellect",
            value: attributes.intellect,
            icon: Brain
        },
        {
            name: "Focus",
            value: attributes.focus,
            icon: Target
        },
        {
            name: "Discipline",
            value: attributes.discipline,
            icon: Shield
        }
    ];

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* HEADER */}

            <section>

                <p className="text-sm font-semibold text-violet-400">
                    ADVENTURE OVERVIEW
                </p>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                    Welcome back, Adventurer ⚔️
                </h1>

                <p className="mt-2 text-gray-500">
                    Keep completing quests and become stronger every day.
                </p>

            </section>


            {/* MAIN STATS */}

            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {/* LEVEL */}

                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <div className="flex items-center justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">

                            <Trophy
                                size={22}
                                className="text-violet-400"
                            />

                        </div>

                        <span className="text-xs text-gray-500">
                            LEVEL
                        </span>

                    </div>

                    <p className="mt-4 text-3xl font-bold">
                        {level}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Current level
                    </p>

                </div>


                {/* GOLD */}

                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <div className="flex items-center justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10">

                            <Coins
                                size={22}
                                className="text-yellow-400"
                            />

                        </div>

                        <span className="text-xs text-gray-500">
                            CURRENCY
                        </span>

                    </div>

                    <p className="mt-4 text-3xl font-bold text-yellow-400">
                        {gold}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Gold available
                    </p>

                </div>


                {/* STREAK */}

                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <div className="flex items-center justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">

                            <Flame
                                size={22}
                                className="text-orange-400"
                            />

                        </div>

                        <span className="text-xs text-gray-500">
                            STREAK
                        </span>

                    </div>

                    <p className="mt-4 text-3xl font-bold">
                        {streak}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Consecutive days
                    </p>

                </div>


                {/* XP */}

                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <div className="flex items-center justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">

                            <Sparkles
                                size={22}
                                className="text-green-400"
                            />

                        </div>

                        <span className="text-xs text-gray-500">
                            EXPERIENCE
                        </span>

                    </div>

                    <p className="mt-4 text-3xl font-bold text-green-400">
                        {progress.currentXP}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        XP this level
                    </p>

                </div>

            </section>


            {/* LEVEL PROGRESS */}

            <section className="rounded-2xl border border-white/10 bg-[#101522] p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <Sparkles
                                size={20}
                                className="text-violet-400"
                            />

                            <h2 className="text-xl font-bold">
                                Level {level}
                            </h2>

                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Keep completing quests to reach the next level.
                        </p>

                    </div>

                    <p className="font-semibold text-violet-400">
                        {progress.currentXP} / {progress.requiredXP} XP
                    </p>

                </div>


                <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/5">

                    <div
                        className="h-full rounded-full bg-violet-500 transition-all duration-700"
                        style={{
                            width: `${progress.percentage}%`
                        }}
                    />

                </div>


                <div className="mt-2 flex justify-between text-xs text-gray-500">

                    <span>
                        Level {level}
                    </span>

                    <span>
                        {Math.max(
                            0,
                            progress.requiredXP - progress.currentXP
                        )} XP to next level
                    </span>

                </div>

            </section>


            {/* ATTRIBUTES */}

            <section>

                <div className="mb-5">

                    <p className="text-sm font-semibold text-violet-400">
                        CHARACTER PROGRESSION
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Your Attributes
                    </h2>

                </div>


                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {stats.map((stat) => {

                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.name}
                                className="rounded-2xl border border-white/10 bg-[#101522] p-5"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

                                        <Icon
                                            size={20}
                                            className="text-violet-400"
                                        />

                                    </div>

                                    <span className="text-2xl font-bold">
                                        {stat.value}
                                    </span>

                                </div>

                                <p className="mt-4 font-semibold">
                                    {stat.name}
                                </p>

                                <div className="mt-3 h-2 rounded-full bg-white/5">

                                    <div
                                        className="h-full rounded-full bg-violet-500 transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                stat.value * 10,
                                                100
                                            )}%`
                                        }}
                                    />

                                </div>

                            </div>
                        );
                    })}

                </div>

            </section>


            {/* RPG TIP */}

            <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">

                <div className="flex gap-4">

                    <Sparkles
                        size={24}
                        className="mt-1 shrink-0 text-violet-400"
                    />

                    <div>

                        <h3 className="font-bold">
                            Every real-world action counts
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Complete quests, earn XP, collect Gold, and
                            improve your character attributes. Your progress
                            grows with you.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;