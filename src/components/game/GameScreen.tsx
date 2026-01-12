import { useMemo } from 'react';
import { Button } from '../ui/Button';
import { ProblemRenderer } from '../engine/ProblemRenderer';
import { generateProblem } from '../../engine/generator';
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
    const { completeLevel } = useGameStore();

    const problem = useMemo(() => {
        const map = MAPS.find(m => m.id === mapId);
        if (!map) {
            return generateProblem({ type: 'counting', limit: 10 }, levelId);
        }
        return generateProblem(map.problemConfig, levelId);
    }, [mapId, levelId]);

    const handleProblemComplete = (stars: 0 | 1 | 2 | 3) => {
        const levelKey = `${mapId}_level${levelId}`;
        completeLevel(levelKey, stars);
        onComplete();
    };

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
                    onComplete={handleProblemComplete}
                />
            </div>
        </div>
    );
}
