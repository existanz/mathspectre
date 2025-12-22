import { motion } from 'framer-motion';
import { StarRating } from '../ui/StarRating';
import { useGameStore } from '../../store/gameStore';

interface MathMapProps {
    mapId: string;
    totalLevels: number;
    onLevelSelect: (levelId: number) => void;
    colorTheme?: string;
}

export function MathMap({ mapId, totalLevels = 10, onLevelSelect, colorTheme = 'text-brand-primary' }: MathMapProps) {
    const { levels } = useGameStore();

    // Map-specific configuration
    const mapConfig = mapId === 'map1' ? {
        bgImage: '/images/maps/level1_map.png',
        bgSize: 'cover'
    } : null;

    // Generate a winding path using sine wave logic
    const nodes = Array.from({ length: totalLevels }, (_, i) => {
        const progress = i / (totalLevels - 1);
        const y = 80 - (progress * 60); // 80% to 20% height
        const x = 50 + Math.sin(progress * Math.PI * 3) * 35; // Winding left/right
        return { id: i + 1, x, y };
    });

    return (
        <div className="relative w-full h-full p-4 overflow-y-auto hide-scrollbar">
            <div
                className="relative w-full h-[800px] md:h-full min-h-[600px] rounded-3xl overflow-hidden"
                style={mapConfig ? {
                    backgroundImage: `url(${mapConfig.bgImage})`,
                    backgroundSize: mapConfig.bgSize,
                    backgroundPosition: 'center'
                } : undefined}
            >
                {/* SVG Path connecting nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d={`M ${nodes.map(n => `${n.x} ${n.y}`).join(' L ')}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className={`${colorTheme} opacity-30`}
                        strokeDasharray="5 5"
                    />
                </svg>

                {/* Level Nodes */}
                {nodes.map((node, index) => {
                    const levelKey = `${mapId}_level${node.id}`;
                    const levelData = levels[levelKey];
                    // Level 1 is always unlocked. Others depend on previous completion.
                    const isUnlocked = index === 0 || levels[`${mapId}_level${index}`]?.completed;
                    const isCompleted = levelData?.completed;

                    return (
                        <motion.button
                            key={node.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center shadow-lg border-4 z-10 transition-all
                ${isUnlocked
                                    ? 'bg-white border-brand-primary cursor-pointer hover:scale-110'
                                    : 'bg-gray-300 border-gray-400 cursor-not-allowed opacity-80'}`}
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => isUnlocked && onLevelSelect(node.id)}
                            disabled={!isUnlocked}
                        >
                            <span className={`text-xl md:text-2xl font-bold ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                                {node.id}
                            </span>

                            {isCompleted && (
                                <div className="absolute -bottom-6">
                                    <StarRating stars={levelData.stars} size="sm" />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
