export const getRequiredXP = (level) => {
    return Math.floor(100 * Math.pow(level, 1.5));
};

export const getLevelFromXP = (totalXP) => {
    let level = 1;

    while (totalXP >= getRequiredXP(level)) {
        totalXP -= getRequiredXP(level);
        level++;
    }

    return level;
};

export const getXPProgress = (totalXP, level) => {
    let xp = totalXP;

    for (let currentLevel = 1; currentLevel < level; currentLevel++) {
        xp -= getRequiredXP(currentLevel);
    }

    const requiredXP = getRequiredXP(level);

    return {
        currentXP: Math.max(0, xp),
        requiredXP,
        percentage: Math.min(
            100,
            Math.max(0, (xp / requiredXP) * 100)
        )
    };
};