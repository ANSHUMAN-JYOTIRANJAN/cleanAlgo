import { Bell, Coins, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

function TopBar() {
    const navigate = useNavigate();
    const { gameState, logout } = useGame();

    const storedUser = (() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
            return {};
        }
    })();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#080b14]/90 backdrop-blur">

            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                <div>
                    <p className="text-sm text-gray-500">
                        Welcome back, {storedUser.username || "Adventurer"}
                    </p>

                    <h2 className="text-lg font-semibold">
                        Your journey continues
                    </h2>
                </div>

                <div className="flex items-center gap-3">

                    <div className="hidden items-center gap-2 rounded-xl bg-yellow-500/10 px-4 py-2 sm:flex">

                        <Coins
                            size={18}
                            className="text-yellow-400"
                        />

                        <span className="font-semibold">
                            {gameState.gold}
                        </span>

                    </div>

                    <button
                        aria-label="Notifications"
                        className="rounded-xl border border-white/10 p-2.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <Bell size={20} />
                    </button>

                    <button
                        aria-label="Logout"
                        onClick={handleLogout}
                        className="rounded-xl border border-white/10 p-2.5 text-gray-400 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut size={20} />
                    </button>

                </div>

            </div>

        </header>
    );
}

export default TopBar;