import { useMemo } from 'react';
import { Button } from '../ui/Button';
import { ProblemRenderer } from '../engine/ProblemRenderer';
import { generateProblem } from '../../engine/generator';
import { useGameStore } from '../../store/gameStore';
import { ArrowLeft } from 'lucide-react';

interface GameScreenProps {
    mapId: string;
    levelId: number;
    onBack: () => void;
    onComplete: () => void;
}

export function GameScreen({ mapId, levelId, onBack, onComplete }: GameScreenProps) {
    const { completeLevel } = useGameStore();

    // Generate problem once on mount for this specific level interaction
    // In a real app we might want a "Retry" to generate a DIFFERENT problem, 
    // but for now 1 level = 1 problem instance per session is fine, or we can regenerate.
    const problem = useMemo(() => generateProblem(mapId, levelId), [mapId, levelId]);

    const handleProblemComplete = (stars: 0 | 1 | 2 | 3) => {
        const levelKey = `${mapId}_level${levelId}`;
        completeLevel(levelKey, stars);
        onComplete(); // Go back to map or next level logic
    };

    return (
        <div className="w-full h-full flex flex-col relative bg-slate-900/50">
            {/* Header */}
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

                <div className="w-12" /> {/* Spacer for centering */}
            </div>

            {/* Game Content */}
            <div className="flex-1 w-full h-full pt-16">
                <ProblemRenderer
                    problem={problem}
                    onComplete={handleProblemComplete}
                />
            </div>
        </div>
    );
}
