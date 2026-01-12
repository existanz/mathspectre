import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface VictoryModalProps {
    stars: 1 | 2 | 3;
    onNext: () => void;
}

const TITLES = [
    "Отлично!",
    "Супер!",
    "Верно!",
    "Превосходно!",
    "Молодец!",
    "Так держать!"
];

export function VictoryModal({ stars, onNext }: VictoryModalProps) {
    const [title] = useState(() => TITLES[Math.floor(Math.random() * TITLES.length)]);
    const [visibleStars, setVisibleStars] = useState(0);

    useEffect(() => {
        let mounted = true;

        const sequence = async () => {
            await new Promise(r => setTimeout(r, 500));

            for (let i = 1; i <= stars; i++) {
                if (!mounted) return;
                setVisibleStars(i);
                await new Promise(r => setTimeout(r, 600));
            }

            if (mounted) {
                await new Promise(r => setTimeout(r, 1000));
                onNext();
            }
        };

        sequence();

        return () => {
            mounted = false;
        };
    }, [stars, onNext]);

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-8 max-w-sm w-full"
            >
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white text-center bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent"
                >
                    {title}
                </motion.h2>

                <div className="flex gap-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="relative">
                            <Star
                                size={48}
                                className="text-slate-600"
                                strokeWidth={1.5}
                            />

                            <AnimatePresence>
                                {visibleStars >= index && (
                                    <motion.div
                                        initial={{ scale: 2, opacity: 0, rotate: -45 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                        className="absolute inset-0 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                                    >
                                        <Star
                                            size={48}
                                            fill="currentColor"
                                            strokeWidth={0}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                </div>
            </motion.div>
        </div>
    );
}
