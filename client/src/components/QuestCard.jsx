import {
    Check,
    Coins,
    Sparkles,
    Circle
} from "lucide-react";

function QuestCard({
    title,
    category,
    xp,
    gold,
    completed,
    onComplete
}) {
    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                completed
                    ? "border-green-500/20 bg-[#0d1715] opacity-75"
                    : "border-white/10 bg-[#101522] hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-[#121827]"
            }`}
        >

            {/* Decorative glow */}

            {!completed && (
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-all duration-300 group-hover:bg-violet-500/20" />
            )}


            {/* MAIN CONTENT */}

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                {/* LEFT SIDE */}

                <div className="flex items-start gap-4">

                    {/* QUEST ICON */}

                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            completed
                                ? "bg-green-500/10 text-green-400"
                                : "bg-violet-500/10 text-violet-400"
                        }`}
                    >
                        {completed ? (
                            <Check size={24} />
                        ) : (
                            <Circle size={22} />
                        )}
                    </div>


                    {/* QUEST INFORMATION */}

                    <div className="min-w-0">

                        <h3
                            className={`text-lg font-semibold ${
                                completed
                                    ? "text-gray-500 line-through"
                                    : "text-white"
                            }`}
                        >
                            {title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            {category}
                        </p>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="flex items-center gap-4 sm:shrink-0">

                    {/* XP */}

                    <div className="flex items-center gap-1.5">

                        <Sparkles
                            size={17}
                            className="text-violet-400"
                        />

                        <span className="text-sm font-semibold text-violet-400">
                            +{xp} XP
                        </span>

                    </div>


                    {/* GOLD */}

                    <div className="flex items-center gap-1.5">

                        <Coins
                            size={17}
                            className="text-yellow-400"
                        />

                        <span className="text-sm font-semibold text-yellow-400">
                            +{gold}
                        </span>

                    </div>


                    {/* COMPLETE BUTTON */}

                    {completed ? (
                        <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2.5 text-sm font-medium text-green-400">
                            <Check size={16} />
                            Completed
                        </div>
                    ) : (
                        <button
                            onClick={onComplete}
                            className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/20 active:scale-95"
                        >
                            Complete
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default QuestCard;