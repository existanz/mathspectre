import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { MAPS } from '../../data/maps';
import type { LevelCoordinate } from '../../data/maps';

interface MathMapProps {
    mapId: string;
    onLevelSelect: (levelId: number) => void;
    colorTheme?: string;
    levelCoordinates: LevelCoordinate[];
}

export function MathMap({ mapId, onLevelSelect, colorTheme = 'text-brand-primary', levelCoordinates }: MathMapProps) {
    const { levels } = useGameStore();

    // Map-specific configuration
    const mapConfig = useMemo(() => {
        const map = MAPS.find(m => m.id === mapId);
        return map?.bgImage ? {
            bgImage: map.bgImage,
            bgSize: 'cover'
        } : null;
    }, [mapId]);

    // Use passed coordinates or map them to the format
    const nodes = levelCoordinates;

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
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center z-10 transition-all
                ${isUnlocked
                                    ? 'cursor-pointer hover:scale-110'
                                    : 'cursor-not-allowed opacity-60'}`}
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => isUnlocked && onLevelSelect(node.id)}
                            disabled={!isUnlocked}
                        >
                            <span className={`text-4xl md:text-5xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] ${isUnlocked ? 'text-white' : 'text-gray-500'}`}
                                style={{ textShadow: '0 0 10px rgba(0,0,0,0.5), 2px 2px 0 #000' }}>
                                {node.id}
                            </span>

                            {isCompleted && (
                                <div className="absolute w-24 h-24 pointer-events-none flex items-center justify-center top-1">
                                    {Array.from({ length: 3 }).map((_, i) => {
                                        // Calculate position for semi-circle (arc)
                                        // Angles: -45, 0, 45 degrees relative to bottom
                                        // Or better visually: 150, 180, 210 degrees standard circle terms if 0 is right?
                                        // Let's place them around the bottom center.
                                        // Arc from 135 to 45 (downwards).
                                        // Let's keep it simple: -30, 0, 30 degrees from vertical down.
                                        const angleConfig = [-30, 0, 30];
                                        const angle = angleConfig[i] * (Math.PI / 180);
                                        const radius = 32; // Distance from center number
                                        const starX = Math.sin(angle) * radius; // sin for x offset
                                        const starY = Math.cos(angle) * radius; // cos for y offset (down)

                                        return (
                                            <div
                                                key={i}
                                                className="absolute"
                                                style={{
                                                    transform: `translate(${starX}px, ${starY}px) rotate(${-angleConfig[i]}deg)`
                                                }}
                                            >
                                                <Star
                                                    size={16}
                                                    className={`${i < levelData.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700/50 fill-gray-900/50'} drop-shadow-md`}
                                                    strokeWidth={1}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
