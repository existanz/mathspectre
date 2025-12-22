import { useState, useCallback } from 'react';

export const HintLevel = {
    NONE: 0,
    SHOW_PARTS: 1, // e.g., show 3 apples and 2 oranges
    SHOW_RESULT: 2, // e.g., show 5 total fruit
} as const;

export type HintLevel = typeof HintLevel[keyof typeof HintLevel];

interface UseHintEngineProps {
    thresholds?: {
        showParts: number; // Attempts before showing parts (default 1)
        showResult: number; // Attempts before showing result (default 2)
    };
}

export function useHintEngine({ thresholds = { showParts: 1, showResult: 2 } }: UseHintEngineProps = {}) {
    const [attempts, setAttempts] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    const registerAttempt = useCallback((correct: boolean) => {
        if (correct) {
            setIsCorrect(true);
            return true;
        } else {
            setAttempts(prev => prev + 1);
            return false;
        }
    }, []);

    const reset = useCallback(() => {
        setAttempts(0);
        setIsCorrect(false);
    }, []);

    let hintLevel: HintLevel = HintLevel.NONE;
    if (attempts >= thresholds.showResult) {
        hintLevel = HintLevel.SHOW_RESULT;
    } else if (attempts >= thresholds.showParts) {
        hintLevel = HintLevel.SHOW_PARTS;
    }

    // Calculate stars: 3 for 0 hints used, 2 for 1 hint, etc.
    // Note: hints are shown AFTER the failure. So:
    // 0 attempts (success on 1st try) -> 3 stars.
    // 1 attempt (fail, then success) -> 2 stars (Hint 1 was shown).
    // 2 attempts (fail, fail, then success) -> 1 star (Hint 2 was shown).
    const stars = Math.max(1, 3 - attempts) as 1 | 2 | 3;

    return {
        attempts,
        hintLevel,
        isCorrect,
        registerAttempt,
        reset,
        stars
    };
}
