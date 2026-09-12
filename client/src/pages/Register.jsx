import { useState } from "react";
import api from "../services/api";

function Register() {
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

            setMessage(response.data.message);

            setFormData({
                username: "",
                email: "",
                password: ""
            });
        } catch (error) {
            console.error("Registration error:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Your Character</h1>

            <p>Create your Life RPG account</p>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                    />
                </div>

                <br />

                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <br />

                <div>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <br />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Account"}
                </button>

            </form>

            {message && (
                <p>
                    {message}
                </p>
            )}

            {error && (
                <p>
                    {error}
                </p>
            )}
        </div>
    );
}

export default Register;