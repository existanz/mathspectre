import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { Lock } from 'lucide-react';
import { LEVEL_COORDINATES, MAPS } from '../../data/maps';

interface MapSelectionProps {
    onSelect: (mapId: string) => void;
}

export function MapSelection({ onSelect }: MapSelectionProps) {
    const { unlockedMaps } = useGameStore();
    const totalStars = LEVEL_COORDINATES.length * 3;

    return (
        <div className="w-full h-full p-8 flex flex-col items-center overflow-y-auto hide-scrollbar">
            <h2 className="text-4xl font-bold text-white mb-12 drop-shadow-lg">Выберите Карту</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {MAPS.map((map, index) => {
                    const isUnlocked = unlockedMaps.includes(map.id);
                    const Icon = map.icon;

                    // Calculate stars
                    let earnedStars = 0;
                    if (isUnlocked) {
                        LEVEL_COORDINATES.forEach(coord => {
                            const levelKey = `${map.id}_level${coord.id}`;
                            const levelData = useGameStore.getState().levels[levelKey];
                            if (levelData) {
                                earnedStars += levelData.stars;
                            }
                        });
                    }

                    const progressPercent = earnedStars / totalStars;
                    // Red (0) -> Green (120)
                    const hue = Math.min(120, Math.max(0, progressPercent * 120));
                    const progressColor = `hsl(${hue}, 80%, 45%)`;

                    return (
                        <motion.button
                            key={map.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={isUnlocked ? { scale: 1.05 } : {}}
                            whileTap={isUnlocked ? { scale: 0.98 } : {}}
                            onClick={() => isUnlocked && onSelect(map.id)}
                            className={`relative h-48 rounded-3xl p-6 flex flex-col justify-between text-left transition-all border-4 overflow-hidden
                ${isUnlocked
                                    ? 'bg-white text-gray-800 border-transparent shadow-xl hover:shadow-2xl'
                                    : 'bg-black/40 text-gray-500 border-white/10'}`}
                            disabled={!isUnlocked}
                        >
                            <div className="flex flex-row items-center w-full h-full relative z-10">
                                {/* Left Side: Progress/Lock + Details */}
                                <div className="flex-1 flex flex-col justify-between h-full pr-4">
                                    {/* Progress / Lock */}
                                    <div className="flex items-center gap-4">
                                        {isUnlocked ? (
                                            <div className="relative w-16 h-16 shrink-0">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="32"
                                                        cy="32"
                                                        r="28"
                                                        stroke="currentColor"
                                                        strokeWidth="6"
                                                        fill="transparent"
                                                        className="text-gray-200"
                                                    />
                                                    <circle
                                                        cx="32"
                                                        cy="32"
                                                        r="28"
                                                        stroke={progressColor}
                                                        strokeWidth="6"
                                                        fill="transparent"
                                                        strokeDasharray={2 * Math.PI * 28}
                                                        strokeDashoffset={2 * Math.PI * 28 * (1 - progressPercent)}
                                                        strokeLinecap="round"
                                                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700">
                                                    <span className="text-lg font-bold leading-none">{earnedStars}</span>
                                                    <span className="text-[10px] opacity-60 leading-none">/ {totalStars}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-full shrink-0">
                                                <Lock size={24} className="text-gray-500" />
                                            </div>
                                        )}

                                        {/* Stars Text Label (Optional, or just keep it minimal) */}
                                    </div>

                                    {/* Text Details */}
                                    <div className="mt-2">
                                        <h3 className="text-2xl font-bold mb-1 leading-tight">{map.title}</h3>
                                        <p className="text-sm opacity-80 leading-snug">{map.desc}</p>
                                    </div>
                                </div>

                                {/* Right Side: Big Icon */}
                                <div className={`w-32 h-32 flex items-center justify-center shrink-0 ${isUnlocked ? 'opacity-100' : 'opacity-30 grayscale'}`}>
                                    {map.iconUrl ? (
                                        <img
                                            src={map.iconUrl}
                                            alt={map.title}
                                            className="w-full h-full object-contain drop-shadow-xl transform hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <Icon size={100} className="text-brand-primary opacity-20" />
                                    )}
                                </div>
                            </div>

                            {/* Decorative Background Icon (Optional, keeping cleaner look for now or could add faint BG) */}
                        </motion.button>
                    )
                })}
            </div>
        </div>
    );
}
