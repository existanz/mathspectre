export type ProblemType = 'counting' | 'addition' | 'subtraction' | 'comparison';

export interface GeneratedProblem {
    type: ProblemType;
    valA: number;
    valB?: number;
    result: number;
}

// Random integer between min and max (inclusive)
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function generateProblem(mapId: string, level: number): GeneratedProblem {
    // Config based on map type

    const isAdvanced = ['map5', 'map6', 'map7'].includes(mapId);
    const maxLimit = isAdvanced ? 20 : 10;

    // Map 1: Counting 0-10
    if (mapId === 'map1') {
        const maxVal = level <= 3 ? 5 : 10;
        const val = rand(1, maxVal);

        return {
            type: 'counting',
            valA: val,
            result: val
        };
    }

    // Map 2 & 5: Addition
    if (mapId === 'map2' || mapId === 'map5') {
        let currentLimit = maxLimit;
        if (!isAdvanced) {
            currentLimit = level <= 3 ? 5 : level <= 7 ? 8 : 10;
        } else {
            // Advanced: Scale from 10 to 20
            currentLimit = level <= 3 ? 12 : level <= 7 ? 16 : 20;
        }

        const valA = rand(1, currentLimit - 1);
        const valB = rand(1, currentLimit - valA);

        return {
            type: 'addition',
            valA,
            valB,
            result: valA + valB
        };
    }

    // Map 3 & 6: Subtraction
    if (mapId === 'map3' || mapId === 'map6') {
        let currentLimit = maxLimit;
        if (isAdvanced) {
            currentLimit = level <= 3 ? 12 : level <= 7 ? 16 : 20;
        } else {
            currentLimit = level <= 3 ? 5 : 10;
        }

        const valA = rand(2, currentLimit);
        const valB = rand(1, valA);

        return {
            type: 'subtraction',
            valA,
            valB,
            result: valA - valB
        };
    }

    // Map 4 & 7: Comparison (>, <, =)
    if (mapId === 'map4' || mapId === 'map7') {
        let currentLimit = maxLimit;
        if (isAdvanced) {
            currentLimit = level <= 3 ? 12 : 20;
        }

        let valA = rand(1, currentLimit);
        let valB = rand(1, currentLimit);

        if (level > 4 && Math.random() > 0.4) {
            // Force close numbers often in later levels
            valB = valA + rand(-1, 1);
            if (valB < 1) valB = 1;
        }

        let result = 3; // Equal
        if (valA > valB) result = 1; // Greater
        if (valA < valB) result = 2; // Less

        return {
            type: 'comparison',
            valA,
            valB,
            result
        };
    }

    // Default fallback
    return {
        type: 'counting',
        valA: 1,
        result: 1
    } as GeneratedProblem;
}
