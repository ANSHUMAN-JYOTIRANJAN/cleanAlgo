import { useEffect, useState } from "react";
import { Plus, Swords, Search, Check } from "lucide-react";
import QuestCard from "../components/QuestCard";
import { useGame } from "../context/GameContext";
import api from "../services/api";

function Quests() {

    const { hydrateFromProfile } = useGame();

    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newQuest, setNewQuest] = useState({
        title: "",
        description: "",
        category: "general",
        difficulty: "easy",
        xpReward: 25,
        goldReward: 10
    });

    useEffect(() => {
        api.get("/quests")
            .then(({ data }) => setQuests(data.quests))
            .catch((requestError) => {
                setError(requestError.response?.data?.message || "Unable to load quests");
            })
            .finally(() => setLoading(false));
    }, []);

    const completeQuest = async (id) => {
        try {
            const { data } = await api.post(`/quests/${id}/complete`);

            setQuests((currentQuests) =>
                currentQuests.map((quest) =>
                    quest._id === id ? data.quest : quest
                )
            );
            hydrateFromProfile(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to complete quest");
        }
    };

    const createQuest = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const { data } = await api.post("/quests", {
                ...newQuest,
                xpReward: Number(newQuest.xpReward),
                goldReward: Number(newQuest.goldReward)
            });

            setQuests((currentQuests) => [data.quest, ...currentQuests]);
            setNewQuest({
                title: "",
                description: "",
                category: "general",
                difficulty: "easy",
                xpReward: 25,
                goldReward: 10
            });
            setShowForm(false);
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to create quest");
        }
    };

    const filteredQuests = quests.filter((quest) =>
        quest.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="mx-auto max-w-7xl space-y-6">

            {/* PAGE HEADER */}

            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    <p className="text-sm text-violet-400">
                        QUEST LOG
                    </p>

                    <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                        Your Quests
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Complete real-world challenges and earn rewards.
                    </p>

                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-400 active:scale-95"
                >
                    <Plus size={20} />
                    New Quest
                </button>

            </section>


            {showForm && (
                <form onSubmit={createQuest} className="grid gap-4 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 sm:grid-cols-2">
                    <input
                        required
                        value={newQuest.title}
                        onChange={(event) => setNewQuest({ ...newQuest, title: event.target.value })}
                        placeholder="Quest title"
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none focus:border-violet-500"
                    />
                    <input
                        value={newQuest.description}
                        onChange={(event) => setNewQuest({ ...newQuest, description: event.target.value })}
                        placeholder="Description"
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none focus:border-violet-500"
                    />
                    <select
                        value={newQuest.category}
                        onChange={(event) => setNewQuest({ ...newQuest, category: event.target.value })}
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none"
                    >
                        {["general", "health", "intelligence", "discipline", "strength", "social"].map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select
                        value={newQuest.difficulty}
                        onChange={(event) => setNewQuest({ ...newQuest, difficulty: event.target.value })}
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none"
                    >
                        {["easy", "medium", "hard", "epic"].map((difficulty) => (
                            <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min="0"
                        required
                        value={newQuest.xpReward}
                        onChange={(event) => setNewQuest({ ...newQuest, xpReward: event.target.value })}
                        placeholder="XP reward"
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none"
                    />
                    <input
                        type="number"
                        min="0"
                        required
                        value={newQuest.goldReward}
                        onChange={(event) => setNewQuest({ ...newQuest, goldReward: event.target.value })}
                        placeholder="Gold reward"
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none"
                    />
                    <button type="submit" className="rounded-xl bg-violet-500 px-4 py-3 font-semibold hover:bg-violet-400 sm:col-span-2">
                        Create quest
                    </button>
                </form>
            )}

            {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                </p>
            )}


            {/* QUEST STATS */}

            <section className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <p className="text-sm text-gray-500">
                        Total Quests
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {quests.length}
                    </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <p className="text-sm text-gray-500">
                        Completed
                    </p>

                    <p className="mt-2 text-3xl font-bold text-green-400">
                        {quests.filter((quest) => quest.status === "completed").length}
                    </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <p className="text-sm text-gray-500">
                        Available XP
                    </p>

                    <p className="mt-2 text-3xl font-bold text-violet-400">
                        {
                            quests
                                .filter((quest) => quest.status !== "completed")
                                .reduce((total, quest) => total + quest.xpReward, 0)
                        }
                    </p>

                </div>

            </section>


            {/* SEARCH */}

            <section>

                <div className="relative">

                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                        type="text"
                        placeholder="Search your quests..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/10 bg-[#101522] py-3 pl-12 pr-4 text-white placeholder-gray-600 outline-none transition focus:border-violet-500"
                    />

                </div>

            </section>


            {/* QUEST LIST */}

            <section>

                <div className="mb-4 flex items-center gap-2">

                    <Swords
                        size={20}
                        className="text-violet-400"
                    />

                    <h2 className="text-xl font-bold">
                        Active Quests
                    </h2>

                </div>


                <div className="space-y-3">

                    {loading ? (
                        <p className="text-gray-500">Loading quests...</p>
                    ) : filteredQuests.map((quest) => (

                        <QuestCard
                            key={quest._id}
                            title={quest.title}
                            category={`${quest.category} • ${quest.difficulty}`}
                            xp={quest.xpReward}
                            gold={quest.goldReward}
                            completed={quest.status === "completed"}
                            onComplete={() =>
                                completeQuest(quest._id)
                            }
                        />

                    ))}


                    {filteredQuests.length === 0 && (

                        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">

                            <p className="text-gray-500">
                                No quests found.
                            </p>

                        </div>

                    )}

                </div>

            </section>


            {/* COMPLETION MESSAGE */}

            <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/5 p-4">

                <Check
                    size={20}
                    className="text-green-400"
                />

                <p className="text-sm text-gray-400">
                    Completing a quest rewards XP, Gold, and character attribute points.
                </p>

            </div>

        </div>
    );
}

export default Quests;