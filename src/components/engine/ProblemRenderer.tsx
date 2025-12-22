import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keypad } from '../game/Keypad';
import { ComparisonKeypad } from '../game/ComparisonKeypad';
import { VisualHint } from '../game/VisualHint';
import { useHintEngine, HintLevel } from '../../engine/hintEngine';
import { Button } from '../ui/Button';

interface Problem {
    type: 'addition' | 'subtraction' | 'counting' | 'comparison';
    valA: number;
    valB?: number;
    result: number; // For comparison: 1 (>), 2 (<), 3 (=)
}

interface ProblemRendererProps {
    problem: Problem;
    onComplete: (stars: 0 | 1 | 2 | 3) => void;
}

export function ProblemRenderer({ problem, onComplete }: ProblemRendererProps) {
    const [currentInput, setCurrentInput] = useState<string>('');
    const { hintLevel, registerAttempt, stars, isCorrect } = useHintEngine();

    const handleInput = (num: number) => {
        if (isCorrect) return;
        const nextInput = currentInput === '0' ? String(num) : currentInput + String(num);
        if (nextInput.length <= 2) {
            setCurrentInput(nextInput);
        }
    };

    const handleComparisonInput = (symbol: '>' | '<' | '=') => {
        if (isCorrect) return;
        setCurrentInput(symbol);
    };

    const handleClear = () => {
        setCurrentInput('');
    };

    const handleSubmit = () => {
        if (!currentInput) return;

        let correct = false;

        if (problem.type === 'comparison') {
            const symbolMap: Record<string, number> = { '>': 1, '<': 2, '=': 3 };
            const val = symbolMap[currentInput];
            correct = val === problem.result;
        } else {
            const userVal = parseInt(currentInput, 10);
            correct = userVal === problem.result;
        }

        const isSuccess = registerAttempt(correct);

        if (isSuccess) {
            // Small delay before notifying completion to show success state
            setTimeout(() => {
                onComplete(stars as 0 | 1 | 2 | 3);
            }, 1500);
        } else {
            setCurrentInput('');
            // Shake effect could go here
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between py-4 max-w-lg mx-auto overflow-y-auto hide-scrollbar">

            {/* Problem Display Area */}
            <div className="flex flex-col items-center gap-4 w-full flex-1 justify-center min-h-[200px]">
                <div className="text-5xl md:text-7xl font-bold flex items-center gap-3 text-white drop-shadow-lg font-mono">
                    {problem.type === 'counting' ? (
                        <span>{currentInput || '?'}</span>
                    ) : (
                        <>
                            <span>{problem.valA}</span>

                            {problem.type === 'comparison' ? (
                                <span className={`min-w-[1.5em] text-center border-b-4 border-white/50 ${isCorrect ? 'text-green-400 border-green-400' : 'text-brand-accent'}`}>
                                    {isCorrect ? currentInput : currentInput || '?'}
                                </span>
                            ) : (
                                <>
                                    <span>{problem.type === 'addition' ? '+' : '-'}</span>
                                    {problem.valB !== undefined && <span>{problem.valB}</span>}
                                    <span>=</span>
                                    <span className={`min-w-[1.5em] text-center border-b-4 border-white/50 ${isCorrect ? 'text-green-400 border-green-400' : 'text-brand-accent'}`}>
                                        {isCorrect ? problem.result : currentInput || '?'}
                                    </span>
                                </>
                            )}

                            {problem.type === 'comparison' && <span>{problem.valB}</span>}
                        </>
                    )}
                </div>

                {/* Visual Hints Area */}
                <div className="w-full min-h-[160px] flex items-center justify-center px-4">
                    <AnimatePresence mode="wait">
                        {(hintLevel !== HintLevel.NONE || problem.type === 'counting') && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full"
                            >
                                <VisualHint
                                    type={problem.type}
                                    valueA={problem.valA}
                                    valueB={problem.valB}
                                    showTotal={hintLevel === HintLevel.SHOW_RESULT || problem.type === 'counting'}
                                />
                            </motion.div>
                        )}

                        {hintLevel === HintLevel.NONE && problem.type !== 'counting' && !isCorrect && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-white/60 text-lg"
                            >
                                {problem.type === 'comparison' ? 'Выберите знак' : 'Введите ответ'}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full flex flex-col items-center gap-2 pb-4">
                {problem.type === 'comparison' ? (
                    <ComparisonKeypad onInput={handleComparisonInput} disabled={isCorrect} />
                ) : (
                    <div className="w-full max-w-[240px]">
                        <Keypad onInput={handleInput} onClear={handleClear} disabled={isCorrect} />
                    </div>
                )}

                <Button
                    onClick={handleSubmit}
                    disabled={!currentInput || isCorrect}
                    size="md"
                    className="w-full max-w-[240px] mt-2 py-3 text-lg"
                >
                    {isCorrect ? 'Отлично!' : 'Проверить'}
                </Button>
            </div>
        </div>
    );
}
