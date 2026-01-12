import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarRatingProps {
    stars: 0 | 1 | 2 | 3;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function StarRating({ stars, size = 'md', className = '' }: StarRatingProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const containerClasses = {
        sm: 'gap-0.5',
        md: 'gap-1',
        lg: 'gap-1.5',
    };

    return (
        <div className={`flex ${containerClasses[size]} ${className}`}>
            {[1, 2, 3].map((index) => (
                <div key={index} className="relative">
                    <Star
                        className={`${sizeClasses[size]} text-gray-700/50`}
                        fill="currentColor"
                        strokeWidth={0}
                    />

                    {index <= stars && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: (index - 1) * 0.1
                            }}
                            className="absolute inset-0 z-10"
                        >
                            <Star
                                className={`${sizeClasses[size]} text-yellow-400 drop-shadow-md`}
                                fill="currentColor"
                                strokeWidth={0}
                            />
                        </motion.div>
                    )}
                </div>
            ))}
        </div>
    );
}
