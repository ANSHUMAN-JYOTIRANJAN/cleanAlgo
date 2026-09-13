import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="min-h-screen bg-[#080b14] text-white">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-lg text-violet-300">
                            ⚔
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Life RPG</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-violet-500 hover:text-white"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
                        >
                            Create account
                        </Link>
                    </div>
                </header>

                <main className="flex flex-1 items-center">
                    <div className="grid w-full items-center gap-10 lg:grid-cols-2">
                        <section>
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
                                Level up your life
                            </p>
                            <h2 className="max-w-xl text-5xl font-black leading-tight">
                                Turn everyday habits into an epic adventure.
                            </h2>
                            <p className="mt-5 max-w-xl text-lg text-gray-300">
                                Complete quests, stay consistent, earn gold, and build real momentum toward the life you want.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/register"
                                    className="rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
                                >
                                    Start your journey
                                </Link>
                                <Link
                                    to="/login"
                                    className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-gray-200 transition hover:border-violet-500 hover:text-white"
                                >
                                    I already have an account
                                </Link>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-white/10 bg-[#101522] p-6 shadow-2xl shadow-violet-900/20">
                            <div className="space-y-4">
                                <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Current quest</p>
                                    <h3 className="mt-2 text-2xl font-bold">Study Java for 1 hour</h3>
                                    <p className="mt-2 text-gray-300">Reward: +50 XP • +20 Gold</p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-white/10 bg-[#0d111c] p-4">
                                        <p className="text-sm text-gray-400">Level</p>
                                        <p className="mt-2 text-3xl font-bold">12</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-[#0d111c] p-4">
                                        <p className="text-sm text-gray-400">Gold</p>
                                        <p className="mt-2 text-3xl font-bold text-yellow-400">420</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-[#0d111c] p-4">
                                        <p className="text-sm text-gray-400">Streak</p>
                                        <p className="mt-2 text-3xl font-bold text-orange-400">7</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Landing;