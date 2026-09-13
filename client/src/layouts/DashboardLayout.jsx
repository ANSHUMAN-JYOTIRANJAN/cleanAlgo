import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import LevelUpModal from "../components/LevelUpModal";

function DashboardLayout() {

    return (
        <div className="min-h-screen bg-[#080b14] text-white">

            <Sidebar />

            <div className="lg:ml-64">

                <TopBar />

                <main className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>

            <LevelUpModal />

        </div>
    );
}

export default DashboardLayout;