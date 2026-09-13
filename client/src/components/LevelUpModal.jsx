import {
    Trophy,
    Sparkles,
    X
} from "lucide-react";

import { useGame } from "../context/GameContext";

function LevelUpModal() {

    const {
        levelUp,
        closeLevelUp
    } = useGame();

    if (!levelUp) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="level-up-title"
        >

            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-violet-500/30 bg-[#101522] p-8 text-center shadow-2xl">

                {/* CLOSE BUTTON */}

                <button
                    onClick={closeLevelUp}
                    className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
                    aria-label="Close level up notification"
                >
                    <X size={20} />
                </button>


                {/* GLOW */}

                <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />


                {/* ICON */}

                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10">

                    <Trophy
                        size={45}
                        className="text-violet-400"
                    />

                </div>


                {/* TITLE */}

                <div className="relative mt-6">

                    <div className="flex items-center justify-center gap-2">

                        <Sparkles
                            size={18}
                            className="text-yellow-400"
                        />

                        <p className="text-sm font-bold tracking-widest text-violet-400">
                            LEVEL UP
                        </p>

                        <Sparkles
                            size={18}
                            className="text-yellow-400"
                        />

                    </div>


                    <h2
                        id="level-up-title"
                        className="mt-3 text-4xl font-black"
                    >
                        Level {levelUp.newLevel}
                    </h2>

                    <p className="mt-3 text-gray-400">
                        You have become stronger!
                    </p>

                </div>


                {/* LEVEL CHANGE */}

                <div className="relative mt-6 flex items-center justify-center gap-4">

                    <div className="rounded-xl bg-white/5 px-5 py-3">

                        <p className="text-xs text-gray-500">
                            PREVIOUS
                        </p>

                        <p className="mt-1 text-2xl font-bold">
                            {levelUp.oldLevel}
                        </p>

                    </div>


                    <div className="text-2xl text-violet-400">
                        →
                    </div>


                    <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-5 py-3">

                        <p className="text-xs text-violet-400">
                            NEW LEVEL
                        </p>

                        <p className="mt-1 text-2xl font-bold text-violet-300">
                            {levelUp.newLevel}
                        </p>

                    </div>

                </div>


                {/* BUTTON */}

                <button
                    onClick={closeLevelUp}
                    className="relative mt-8 w-full rounded-xl bg-violet-500 px-5 py-3 font-bold text-white transition hover:bg-violet-400 active:scale-95"
                >
                    Continue Adventure
                </button>

            </div>

        </div>
    );
}

export default LevelUpModal;