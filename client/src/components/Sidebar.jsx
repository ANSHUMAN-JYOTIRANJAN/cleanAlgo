import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Swords,
    ShoppingBag,
    UserRound,
    Backpack,
    Flame,
    Repeat,
    Trophy
} from "lucide-react";
import { useGame } from "../context/GameContext";

function Sidebar() {
    const location = useLocation();
    const { gameState } = useGame();

    const links = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Quests",
            path: "/quests",
            icon: Swords
        },
        {
            name: "Shop",
            path: "/shop",
            icon: ShoppingBag
        },
        {
            name: "Character",
            path: "/character",
            icon: UserRound
        },
        {
            name: "Inventory",
            path: "/inventory",
            icon: Backpack
        },
        {
            name: "Habits",
            path: "/habits",
            icon: Repeat
        },
        {
            name: "Achievements",
            path: "/achievements",
            icon: Trophy
        }
    ];

    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#0d111c] lg:block">

            <div className="flex h-full flex-col">

                <div className="border-b border-white/10 px-6 py-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                            ⚔
                        </div>

                        <div>
                            <h1 className="font-bold">
                                LIFE RPG
                            </h1>

                            <p className="text-xs text-gray-500">
                                Become your best self
                            </p>
                        </div>

                    </div>

                </div>

                <nav
                    className="flex-1 space-y-2 px-4 py-6"
                    aria-label="Main navigation"
                >

                    {links.map((link) => {

                        const Icon = link.icon;

                        const active =
                            location.pathname === link.path;

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                    active
                                        ? "bg-violet-500/15 text-violet-300"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                                aria-current={
                                    active ? "page" : undefined
                                }
                            >
                                <Icon size={20} />

                                <span>
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}

                </nav>

                <div className="border-t border-white/10 p-4">

                    <div className="flex items-center gap-3 rounded-xl bg-orange-500/10 p-3">

                        <Flame
                            size={20}
                            className="text-orange-400"
                        />

                        <div>

                            <p className="text-sm font-semibold">
                                {gameState.streak} Day Streak
                            </p>

                            <p className="text-xs text-gray-500">
                                Keep going!
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;