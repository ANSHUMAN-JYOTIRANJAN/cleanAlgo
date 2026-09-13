import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests";
import Shop from "./pages/Shop";
import Character from "./pages/Character";
import Inventory from "./pages/Inventory";
import Habits from "./pages/Habits";
import Achievements from "./pages/Achievements";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { GameProvider } from "./context/GameContext";

function App() {
    return (
        <GameProvider>

            <BrowserRouter>

                <Routes>

                    <Route
                        path="/"
                        element={<Landing />}
                    />

                    <Route
                        path="/login"
                        element={
                            localStorage.getItem("token")
                                ? <Navigate to="/dashboard" replace />
                                : <Login />
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            localStorage.getItem("token")
                                ? <Navigate to="/dashboard" replace />
                                : <Register />
                        }
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            <Route
                                path="/dashboard"
                                element={<Dashboard />}
                            />

                            <Route
                                path="/quests"
                                element={<Quests />}
                            />

                            <Route
                                path="/shop"
                                element={<Shop />}
                            />

                            <Route
                                path="/character"
                                element={<Character />}
                            />

                            <Route
                                path="/inventory"
                                element={<Inventory />}
                            />

                            <Route
                                path="/habits"
                                element={<Habits />}
                            />

                            <Route
                                path="/achievements"
                                element={<Achievements />}
                            />
                        </Route>
                    </Route>

                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />

                </Routes>

            </BrowserRouter>

        </GameProvider>
    );
}

export default App;