import {
    Package,
    Shield,
    Palette,
    Crown,
    Sparkles
} from "lucide-react";

import { useGame } from "../context/GameContext";

function Inventory() {

    const {
        gameState
    } = useGame();

    const inventory = gameState.inventory;

    const getIcon = (type) => {

        if (type === "Badge") {
            return Shield;
        }

        if (type === "Theme") {
            return Palette;
        }

        if (type === "Cosmetic") {
            return Crown;
        }

        return Sparkles;
    };

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* HEADER */}

            <section>

                <p className="text-sm font-semibold text-violet-400">
                    INVENTORY
                </p>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                    Your Collection
                </h1>

                <p className="mt-2 text-gray-500">
                    Items you have earned and purchased during your adventure.
                </p>

            </section>


            {/* INVENTORY COUNT */}

            <section className="rounded-2xl border border-white/10 bg-[#101522] p-6">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">

                        <Package
                            size={28}
                            className="text-violet-400"
                        />

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Items Collected
                        </p>

                        <p className="text-3xl font-bold">
                            {inventory.length}
                        </p>

                    </div>

                </div>

            </section>


            {/* ITEMS */}

            {inventory.length === 0 ? (

                <section className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

                    <Package
                        size={45}
                        className="mx-auto text-gray-600"
                    />

                    <h2 className="mt-5 text-xl font-bold">
                        Your inventory is empty
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Visit the Shop and purchase your first item.
                    </p>

                </section>

            ) : (

                <section>

                    <div className="mb-5">

                        <h2 className="text-2xl font-bold">
                            Your Items
                        </h2>

                    </div>


                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {inventory.map((item, index) => {

                            const Icon = getIcon(item.type);

                            return (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="rounded-2xl border border-white/10 bg-[#101522] p-6"
                                >

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">

                                        <Icon
                                            size={28}
                                            className="text-violet-400"
                                        />

                                    </div>


                                    <h3 className="mt-5 text-xl font-bold">
                                        {item.name}
                                    </h3>


                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {item.description}
                                    </p>


                                    <div className="mt-5">

                                        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                                            {item.type}
                                        </span>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </section>

            )}

        </div>
    );
}

export default Inventory;