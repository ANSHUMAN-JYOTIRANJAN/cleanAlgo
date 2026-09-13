import { Flame } from "lucide-react";

function StreakCard() {
    return (
        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-[#101522] p-5">

            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15">

                    <Flame
                        className="text-orange-400"
                        size={25}
                    />

                </div>

                <div>

                    <p className="text-sm text-gray-400">
                        Current Streak
                    </p>

                    <p className="text-2xl font-bold">
                        7 days
                    </p>

                </div>

            </div>

            <p className="mt-4 text-sm text-gray-500">
                Complete a quest today to keep your streak alive.
            </p>

        </div>
    );
}

export default StreakCard;