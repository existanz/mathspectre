import { useEffect, useState, useCallback } from 'react';
import { Button } from '../ui/Button';
import { ProblemRenderer } from '../engine/ProblemRenderer';
import { generateProblem, type GeneratedProblem } from '../../engine/generator';
import { useGameStore } from '../../store/gameStore';
import { ArrowLeft } from 'lucide-react';
import { MAPS } from '../../data/maps';

interface GameScreenProps {
    mapId: string;
    levelId: number;
    onBack: () => void;
    onComplete: () => void;
}

export function GameScreen({ mapId, levelId, onBack, onComplete }: GameScreenProps) {
    const { completeLevel, activeSessions, saveSession, clearSession } = useGameStore();
    const [problem, setProblem] = useState<GeneratedProblem | null>(null);
    const [initialAttempts, setInitialAttempts] = useState(0);

    const levelKey = `${mapId}_level${levelId}`;

    useEffect(() => {
        const existingSession = activeSessions[levelKey];

        if (existingSession) {
            setProblem(existingSession.problem);
            setInitialAttempts(existingSession.attempts);
        } else {
            const map = MAPS.find(m => m.id === mapId);
            const newProblem = map
                ? generateProblem(map.problemConfig, levelId)
                : generateProblem({ type: 'counting', limit: 10 }, levelId);

            setProblem(newProblem);
            setInitialAttempts(0);
            saveSession(levelKey, { problem: newProblem, attempts: 0 });
        }
    }, [mapId, levelId, levelKey]);

    const handleAttempt = useCallback((attempts: number) => {
        if (problem) {
            saveSession(levelKey, { problem, attempts });
        }
    }, [problem, saveSession, levelKey]);

    const handleProblemComplete = (stars: 0 | 1 | 2 | 3) => {
        completeLevel(levelKey, stars);
        clearSession(levelKey);
        onComplete();
    };

    if (!problem) return null;

    return (
        <div className="w-full h-full flex flex-col relative bg-slate-900/50">
            <div className="w-full p-4 flex items-center justify-between absolute top-0 left-0 z-10">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={onBack}
                    className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border-0"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </Button>

                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold">
                    Уровень {levelId}
                </div>

                <div className="w-12" />
            </div>

            <div className="flex-1 w-full h-full pt-16">
                <ProblemRenderer
                    problem={problem}
                    initialAttempts={initialAttempts}
                    onAttempt={handleAttempt}
                    onComplete={handleProblemComplete}
                />
            </div>
        </div>
    );
}
