import { useState, useCallback } from 'react';

export const HintLevel = {
    NONE: 0,
    SHOW_PARTS: 1,
    SHOW_RESULT: 2,
    SHOW_ANSWER: 3,
} as const;

export type HintLevel = typeof HintLevel[keyof typeof HintLevel];

interface UseHintEngineProps {
    thresholds?: {
        showParts: number;
        showResult: number;
        showAnswer: number;
    };
    initialAttempts?: number;
}

export function useHintEngine({ thresholds = { showParts: 1, showResult: 2, showAnswer: 3 }, initialAttempts = 0 }: UseHintEngineProps = {}) {
    const [attempts, setAttempts] = useState(initialAttempts);
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
    if (attempts >= thresholds.showAnswer) {
        hintLevel = HintLevel.SHOW_ANSWER;
    } else if (attempts >= thresholds.showResult) {
        hintLevel = HintLevel.SHOW_RESULT;
    } else if (attempts >= thresholds.showParts) {
        hintLevel = HintLevel.SHOW_PARTS;
    }

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
