import {
    getRequiredXP,
    getLevelFromXP,
    getXPProgress
} from "./progression";

console.log("Level 1 required XP:", getRequiredXP(1));

console.log("Level 5 required XP:", getRequiredXP(5));

console.log("Level for 1000 total XP:", getLevelFromXP(1000));

console.log(
    "Progress:",
    getXPProgress(1000, getLevelFromXP(1000))
);