import type { ProblemConfig } from '../data/maps';

export type ProblemType = 'counting' | 'addition' | 'subtraction' | 'comparison';

export interface GeneratedProblem {
    type: ProblemType;
    valA: number;
    valB?: number;
    result: number;
}

// Random integer between min and max (inclusive)
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function generateProblem(config: ProblemConfig, level: number): GeneratedProblem {
    const { type, limit, isAdvanced } = config;

    // logic based on level progression within constraints
    // simple scaling: early levels use smaller numbers, later levels use up to limit
    let currentLimit = limit;

    // Linear progression for difficulty
    // Level 1-3: Easy (approx 50% of limit)
    // Level 4-7: Medium (approx 80% of limit)
    // Level 8+: Hard (100% of limit)

    if (level <= 3) {
        currentLimit = Math.max(5, Math.floor(limit * 0.5)); // min 5 for very small limits
        if (isAdvanced) currentLimit = Math.floor(limit * 0.6);
    } else if (level <= 7) {
        currentLimit = Math.max(8, Math.floor(limit * 0.8));
        if (isAdvanced) currentLimit = Math.floor(limit * 0.8);
    }

    // Ensure we don't exceed the hard limit
    currentLimit = Math.min(currentLimit, limit);

    switch (type) {
        case 'counting': {
            const val = rand(1, currentLimit);
            return { type, valA: val, result: val };
        }

        case 'addition': {
            const valA = rand(1, currentLimit - 1);
            const valB = rand(1, currentLimit - valA);
            return { type, valA, valB, result: valA + valB };
        }

        case 'subtraction': {
            const valA = rand(2, currentLimit);
            const valB = rand(1, valA); // Result can be 0? Original code had rand(1, valA) so result >= 0
            // logic check: valA - valB >= 0 is guaranteed if valB <= valA
            return { type, valA, valB, result: valA - valB };
        }

        case 'comparison': {
            let valA = rand(1, currentLimit);
            let valB = rand(1, currentLimit);

            // Force close numbers for higher difficulty
            if (level > 4 && Math.random() > 0.4) {
                valB = valA + rand(-1, 1);
                if (valB < 1) valB = 1;
            }

            let result = 3; // Equal
            if (valA > valB) result = 1;
            if (valA < valB) result = 2;

            return { type, valA, valB, result };
        }
    }

    // Fallback should typically not happen if types are correct
    return { type: 'counting', valA: 1, result: 1 };
}
