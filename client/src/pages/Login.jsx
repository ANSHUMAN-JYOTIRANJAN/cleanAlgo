import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useGame } from "../context/GameContext";

function Login() {
    const navigate = useNavigate();
    const { hydrateFromProfile } = useGame();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            hydrateFromProfile(response.data.user);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                (error.request
                    ? "Cannot connect to the server. Make sure the backend is running on port 5000."
                    : error.message) ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#080b14] px-4 text-white">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#101522] p-8 shadow-2xl shadow-violet-900/20">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">Welcome back</p>
                <h1 className="mt-3 text-3xl font-bold">Continue your journey</h1>
                <p className="mt-2 text-gray-400">Log in to your Life RPG account.</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-200">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-white/10 bg-[#0d111c] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-violet-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-200">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-xl border border-white/10 bg-[#0d111c] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-violet-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-violet-500 px-4 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && (
                    <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                        {error}
                    </p>
                )}

                <p className="mt-5 text-center text-sm text-gray-400">
                    Need an account? {" "}
                    <Link to="/register" className="font-semibold text-violet-400 hover:text-violet-300">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;