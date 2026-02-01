export const roundToNearest5 = (num: number): number => {
    return Math.round(num / 5) * 5;
};

export const getEncumbranceDetails = (weight: number, strength: number) => {
    let multiplier = 1.0;
    if (strength >= 18) {
        multiplier = 1.50; // 50% increase
    } else if (strength >= 16) {
        multiplier = 1.30; // 30% increase
    } else if (strength >= 13) {
        multiplier = 1.15; // 15% increase
    } else if (strength <= 4) {
        multiplier = 0.60; // 40% decrease
    } else if (strength <= 7) { // This covers 5, 6, 7
        multiplier = 0.75; // 25% decrease
    }


    const thresholds = {
        normal: Math.floor(400 * multiplier),
        slowed: Math.floor(600 * multiplier),
        verySlow: Math.floor(800 * multiplier),
        max: 1600, // This one is not modified
    };

    let result;
    if (weight <= thresholds.normal) {
        result = { level: 'Normal', speed: "120'", speedValue: 120, color: 'bg-green-800/80', textColor: 'text-green-400' };
    } else if (weight <= thresholds.slowed) {
        result = { level: 'Slowed', speed: "90'", speedValue: 90, color: 'bg-yellow-800/80', textColor: 'text-yellow-400' };
    } else if (weight <= thresholds.verySlow) {
        result = { level: 'Very Slow', speed: "60'", speedValue: 60, color: 'bg-orange-800/80', textColor: 'text-orange-400' };
    } else if (weight <= thresholds.max) {
        result = { level: 'Barely Moving', speed: "30'", speedValue: 30, color: 'bg-red-800/80', textColor: 'text-red-400' };
    } else { // weight > thresholds.max
        result = { level: 'Overburdened', speed: "0'", speedValue: 0, color: 'bg-red-900', textColor: 'text-red-300' };
    }
    
    return { ...result, thresholds, maxEncumbrance: thresholds.max };
};