import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GameContainerProps {
    children: ReactNode;
    className?: string;
}

export function GameContainer({ children, className = '' }: GameContainerProps) {
    return (
        <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-primary rounded-full blur-[100px]" />
                <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-brand-secondary rounded-full blur-[100px]" />
            </div>

            <motion.div
                className={`relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden ${className}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
