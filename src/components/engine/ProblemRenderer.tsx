import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keypad } from '../game/Keypad';
import { ComparisonKeypad } from '../game/ComparisonKeypad';
import { VisualHint } from '../game/VisualHint';
import { useHintEngine, HintLevel } from '../../engine/hintEngine';
import { Button } from '../ui/Button';
import { VictoryModal } from '../game/VictoryModal';

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
    const [showVictory, setShowVictory] = useState(false);
    const [isError, setIsError] = useState(false);
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

        if (correct) {
            const isSuccess = registerAttempt(true);
            if (isSuccess) {
                setShowVictory(true);
            }
        } else {
            // Error animation
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
                registerAttempt(false);
                setCurrentInput('');
            }, 500);
        }
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isCorrect) return;

            if (e.key >= '0' && e.key <= '9') {
                handleInput(parseInt(e.key));
            } else if (e.key === 'Backspace') {
                setCurrentInput(prev => prev.slice(0, -1));
            } else if (e.key === 'Enter') {
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCorrect, handleInput, handleSubmit]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-between py-4 max-w-3xl mx-auto overflow-y-auto hide-scrollbar">


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
                    <motion.div
                        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <Button
                            onClick={handleSubmit}
                            disabled={!currentInput || isCorrect || isError}
                            size="icon"
                            className={`ml-4 w-12 h-12 md:w-16 md:h-16 rounded-xl shadow-lg border-b-4 active:border-b-0 active:translate-y-1 flex-shrink-0 transition-colors duration-200 ${isError
                                ? 'bg-red-500 hover:bg-red-600 border-red-700'
                                : 'bg-brand-secondary hover:bg-brand-secondary/90 border-brand-secondary/50'
                                }`}
                        >
                            <span className="text-xl font-bold">
                                {isError ? '😖' : 'Ok'}
                            </span>
                        </Button>
                    </motion.div>
                </div>

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
                                    hintLevel={hintLevel}
                                    // Legacy support/fallback for components not using hintLevel yet
                                    showTotal={hintLevel >= HintLevel.SHOW_RESULT || problem.type === 'counting'}
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

            <div className="w-full flex flex-col items-center gap-2 pb-4 px-4">
                {problem.type === 'comparison' ? (
                    <ComparisonKeypad onInput={handleComparisonInput} disabled={isCorrect} />
                ) : (
                    <div className="w-full flex justify-center">
                        <Keypad onInput={handleInput} onClear={handleClear} disabled={isCorrect} />
                    </div>
                )}


            </div>
            <AnimatePresence>
                {showVictory && (
                    <VictoryModal
                        stars={stars}
                        onNext={() => onComplete(stars)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
