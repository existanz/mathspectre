import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { Lock, Calculator, Hash, Minus, Scale } from 'lucide-react';

interface MapSelectionProps {
    onSelect: (mapId: string) => void;
}

const MAPS = [
    { id: 'map1', title: 'Счет до 10', icon: Hash, iconUrl: '/images/maps/level1_icon.png', desc: 'Учимся считать предметы' },
    { id: 'map2', title: 'Сложение до 10', icon: Calculator, iconUrl: '/images/maps/level2_icon.png', desc: 'Простые примеры на сложение' },
    { id: 'map3', title: 'Вычитание до 10', icon: Minus, iconUrl: '/images/maps/level3_icon.png', desc: 'Учимся отнимать' },
    { id: 'map4', title: 'Больше / Меньше', icon: Scale, iconUrl: '/images/maps/level4_icon.png', desc: 'Сравниваем количества' },
    { id: 'map5', title: 'Сложение до 20', icon: Calculator, iconUrl: '/images/maps/level5_icon.png', desc: 'Сложные примеры' },
    { id: 'map6', title: 'Вычитание до 20', icon: Minus, iconUrl: '/images/maps/level6_icon.png', desc: 'Сложное вычитание' },
    { id: 'map7', title: 'Сравнение до 20', icon: Scale, iconUrl: '/images/maps/level7_icon.png', desc: 'Сравнение больших чисел' },
];

export function MapSelection({ onSelect }: MapSelectionProps) {
    const { unlockedMaps } = useGameStore();

    return (
        <div className="w-full h-full p-8 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-white mb-12 drop-shadow-lg">Выберите Карту</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {MAPS.map((map, index) => {
                    const isUnlocked = unlockedMaps.includes(map.id);
                    const Icon = map.icon;

                    return (
                        <motion.button
                            key={map.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={isUnlocked ? { scale: 1.05 } : {}}
                            whileTap={isUnlocked ? { scale: 0.98 } : {}}
                            onClick={() => isUnlocked && onSelect(map.id)}
                            className={`relative h-48 rounded-3xl p-6 flex flex-col items-start justify-between text-left transition-all border-4
                ${isUnlocked
                                    ? 'bg-white text-gray-800 border-transparent shadow-xl hover:shadow-2xl'
                                    : 'bg-black/40 text-gray-500 border-white/10'}`}
                            disabled={!isUnlocked}
                        >
                            <div className="flex justify-between w-full">
                                <div className={`p-3 rounded-2xl ${isUnlocked ? 'bg-brand-primary/10 text-brand-primary' : 'bg-white/5 text-gray-600'}`}>
                                    {map.iconUrl ? (
                                        <img src={map.iconUrl} alt={map.title} className="w-12 h-12 object-contain" />
                                    ) : (
                                        <Icon size={32} />
                                    )}
                                </div>
                                {!isUnlocked && <Lock className="text-gray-500" />}
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-1">{map.title}</h3>
                                <p className="text-sm opacity-80">{map.desc}</p>
                            </div>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    );
}
