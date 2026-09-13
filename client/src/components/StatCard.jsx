function StatCard({
    name,
    value,
    icon,
    description
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#101522] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30">

            <div className="mb-4 flex items-center justify-between">

                <span className="text-2xl">
                    {icon}
                </span>

                <span className="text-sm text-gray-500">
                    ATTRIBUTE
                </span>

            </div>

            <h3 className="text-sm text-gray-400">
                {name}
            </h3>

            <p className="mt-1 text-3xl font-bold">
                {value}
            </p>

            <p className="mt-2 text-xs text-gray-500">
                {description}
            </p>

        </div>
    );
}

export default StatCard;