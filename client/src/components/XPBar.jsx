function XPBar({
    currentXP = 650,
    requiredXP = 1000
}) {
    const percentage =
        (currentXP / requiredXP) * 100;

    return (
        <div>

            <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium">
                    XP Progress
                </span>

                <span className="text-sm text-gray-400">
                    {currentXP} / {requiredXP} XP
                </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">

                <div
                    className="h-full rounded-full bg-violet-500 transition-all duration-700"
                    style={{
                        width: `${percentage}%`
                    }}
                />

            </div>

        </div>
    );
}

export default XPBar;