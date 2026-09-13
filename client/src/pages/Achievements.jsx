import { useEffect, useState } from "react";
import { Lock, Trophy } from "lucide-react";
import api from "../services/api";

function Achievements() {
    const [achievements, setAchievements] = useState([]);
    const [unlocked, setUnlocked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([api.get("/achievements"), api.get("/achievements/me")])
            .then(([allResponse, userResponse]) => {
                setAchievements(allResponse.data.achievements);
                setUnlocked(userResponse.data.achievements.map((achievement) => achievement._id));
            })
            .catch((requestError) => {
                setError(requestError.response?.data?.message || "Unable to load achievements");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <section>
                <p className="text-sm font-semibold text-violet-400">MILESTONES</p>
                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Achievements</h1>
                <p className="mt-2 text-gray-500">Track the milestones you unlock on your journey.</p>
            </section>

            {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
            {loading ? <p className="text-gray-500">Loading achievements...</p> : (
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => {
                        const isUnlocked = unlocked.includes(achievement._id);
                        return (
                            <div key={achievement._id} className={`rounded-2xl border p-5 ${isUnlocked ? "border-yellow-500/30 bg-yellow-500/5" : "border-white/10 bg-[#101522] opacity-70"}`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-2xl">
                                        {achievement.icon || "🏆"}
                                    </div>
                                    {isUnlocked ? <Trophy className="text-yellow-400" size={20} /> : <Lock className="text-gray-500" size={20} />}
                                </div>
                                <h2 className="mt-5 text-lg font-bold">{achievement.title}</h2>
                                <p className="mt-2 text-sm text-gray-500">{achievement.description}</p>
                                <p className="mt-4 text-xs capitalize text-violet-300">
                                    {isUnlocked ? "Unlocked" : `${achievement.requirementType}: ${achievement.requirementValue}`}
                                </p>
                            </div>
                        );
                    })}
                    {!achievements.length && <p className="text-gray-500">No achievements have been configured yet.</p>}
                </section>
            )}
        </div>
    );
}

export default Achievements;
