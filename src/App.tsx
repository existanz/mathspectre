import { useState } from 'react';
import { GameContainer } from './components/layout/GameContainer';
import { MapSelection } from './components/game/MapSelection';
import { MathMap } from './components/game/MathMap';
import { GameScreen } from './components/game/GameScreen';
import { useGameStore } from './store/gameStore';
import { Button } from './components/ui/Button';
import { Home } from 'lucide-react';

type ViewState = 'SELECTION' | 'MAP' | 'GAME';

function App() {
    const { currentMapId, setCurrentMap } = useGameStore();

    const [view, setView] = useState<ViewState>('SELECTION');
    const [activeLevel, setActiveLevel] = useState<number | null>(null);

    const handleMapSelect = (mapId: string) => {
        setCurrentMap(mapId);
        setView('MAP');
    };

    const handleLevelSelect = (levelId: number) => {
        setActiveLevel(levelId);
        setView('GAME');
    };

    const handleGameComplete = () => {
        // Return to map after completion to show stars update
        setView('MAP');
        setActiveLevel(null);
    };

    return (
        <GameContainer>
            {view === 'SELECTION' && (
                <MapSelection onSelect={handleMapSelect} />
            )}

            {view === 'MAP' && (
                <div className="w-full h-full relative">
                    <Button
                        className="absolute top-4 left-4 z-20 rounded-full w-12 h-12 flex items-center justify-center p-0"
                        variant="secondary"
                        onClick={() => setView('SELECTION')}
                    >
                        <Home size={20} />
                    </Button>

                    <MathMap
                        mapId={currentMapId}
                        totalLevels={10}
                        onLevelSelect={handleLevelSelect}
                    />
                </div>
            )}

            {view === 'GAME' && activeLevel !== null && (
                <GameScreen
                    mapId={currentMapId}
                    levelId={activeLevel}
                    onBack={() => setView('MAP')}
                    onComplete={handleGameComplete}
                />
            )}
        </GameContainer>
    );
}

export default App;
