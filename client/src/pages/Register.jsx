import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useGame } from "../context/GameContext";

function Register() {
    const navigate = useNavigate();
    const { hydrateFromProfile } = useGame();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
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

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await api.post(
                "/auth/register",
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
            setMessage(response.data.message);
            setFormData({
                username: "",
                email: "",
                password: ""
            });
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                (error.request
                    ? "Cannot connect to the server. Make sure the backend is running on port 5000."
                    : error.message) ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#080b14] px-4 text-white">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#101522] p-8 shadow-2xl shadow-violet-900/20">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">Create account</p>
                <h1 className="mt-3 text-3xl font-bold">Start your adventure</h1>
                <p className="mt-2 text-gray-400">Build a stronger routine and level up your life.</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-200">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="w-full rounded-xl border border-white/10 bg-[#0d111c] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-violet-500"
                            required
                        />
                    </div>

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
                            placeholder="Enter email"
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
                            placeholder="Enter password"
                            className="w-full rounded-xl border border-white/10 bg-[#0d111c] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-violet-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-violet-500 px-4 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                {message && (
                    <p className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                        {error}
                    </p>
                )}

                <p className="mt-5 text-center text-sm text-gray-400">
                    Already have an account? {" "}
                    <Link to="/login" className="font-semibold text-violet-400 hover:text-violet-300">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;