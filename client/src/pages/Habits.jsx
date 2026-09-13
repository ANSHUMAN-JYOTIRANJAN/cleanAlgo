import { useEffect, useState } from "react";
import { Check, Plus, Repeat } from "lucide-react";
import api from "../services/api";
import { useGame } from "../context/GameContext";

const categories = ["general", "health", "intelligence", "discipline", "strength", "social"];

function Habits() {
    const { hydrateFromProfile } = useGame();
    const [habits, setHabits] = useState([]);
    const [form, setForm] = useState({
        name: "",
        frequency: "daily",
        category: "general"
    });
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadHabits = () => {
        api.get("/habits")
            .then(({ data }) => setHabits(data.habits))
            .catch((requestError) => {
                setError(requestError.response?.data?.message || "Unable to load habits");
            })
            .finally(() => setLoading(false));
    };

    useEffect(loadHabits, []);

    const createHabit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const { data } = await api.post("/habits", form);
            setHabits((current) => [data.habit, ...current]);
            setForm({ name: "", frequency: "daily", category: "general" });
            setShowForm(false);
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to create habit");
        }
    };

    const completeHabit = async (id) => {
        setError("");

        try {
            const { data } = await api.post(`/habits/${id}/complete`);
            setHabits((current) =>
                current.map((habit) => habit._id === id ? data.habit : habit)
            );
            hydrateFromProfile(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to complete habit");
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-violet-400">DAILY ROUTINE</p>
                    <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Your Habits</h1>
                    <p className="mt-2 text-gray-500">Build consistency and earn rewards every day.</p>
                </div>
                <button
                    onClick={() => setShowForm((current) => !current)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold hover:bg-violet-400"
                >
                    <Plus size={20} /> New Habit
                </button>
            </section>

            {showForm && (
                <form onSubmit={createHabit} className="grid gap-4 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 sm:grid-cols-3">
                    <input
                        required
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        placeholder="Habit name"
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none focus:border-violet-500"
                    />
                    <select
                        value={form.frequency}
                        onChange={(event) => setForm({ ...form, frequency: event.target.value })}
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                    <select
                        value={form.category}
                        onChange={(event) => setForm({ ...form, category: event.target.value })}
                        className="rounded-xl border border-white/10 bg-[#101522] px-4 py-3 text-white outline-none"
                    >
                        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                    <button type="submit" className="rounded-xl bg-violet-500 px-4 py-3 font-semibold hover:bg-violet-400 sm:col-span-3">
                        Create habit
                    </button>
                </form>
            )}

            {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

            {loading ? <p className="text-gray-500">Loading habits...</p> : (
                <section className="grid gap-4 md:grid-cols-2">
                    {habits.map((habit) => (
                        <div key={habit._id} className="rounded-2xl border border-white/10 bg-[#101522] p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400"><Repeat size={22} /></div>
                                    <div>
                                        <h2 className="text-lg font-semibold">{habit.name}</h2>
                                        <p className="mt-1 text-sm capitalize text-gray-500">{habit.frequency} • {habit.category}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-violet-300">{habit.currentStreak} day streak</span>
                            </div>
                            <button
                                disabled={!habit.isActive || habit.completedDates?.some((date) => new Date(date).toDateString() === new Date().toDateString())}
                                onClick={() => completeHabit(habit._id)}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500/15 px-4 py-3 font-semibold text-green-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Check size={18} /> Complete today
                            </button>
                        </div>
                    ))}
                    {!habits.length && <p className="text-gray-500">No habits yet. Create your first habit.</p>}
                </section>
            )}
        </div>
    );
}

export default Habits;
