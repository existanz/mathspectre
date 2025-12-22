import { LayoutGroup, motion } from 'framer-motion';
import { Apple, Pencil, Zap } from 'lucide-react';

// We can add more icons/assets here
const ICONS = {
    apple: Apple,
    pencil: Pencil,
    star: Zap,
};

interface VisualHintProps {
    type: 'addition' | 'subtraction' | 'counting' | 'comparison';
    valueA: number;
    valueB?: number; // Only for addition/subtraction
    icon?: keyof typeof ICONS;
    showTotal?: boolean; // If true, shows the combined set (for result hint)
}

export function VisualHint({ type, valueA, valueB = 0, icon = 'pencil', showTotal = false }: VisualHintProps) {
    const Icon = ICONS[icon];

    const renderItems = (count: number, colorClass: string, keyPrefix: string) => (
        <div className="flex flex-wrap gap-2 justify-center content-center max-w-full">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={`${keyPrefix}-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: i * 0.05
                    }}
                >
                    <Icon className={`w-8 h-8 md:w-12 md:h-12 ${colorClass}`} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );

    return (
        <div className="w-full flex items-center justify-center min-h-[100px] p-4 bg-black/5 rounded-2xl">
            <LayoutGroup>
                {/* Addition: Show A + B groups adjacent */}
                {type === 'addition' && !showTotal && (
                    <div className="flex gap-8 items-center">
                        <div className="flex flex-col items-center gap-2">
                            {renderItems(valueA, "text-red-500", "a")}
                            <span className="text-sm font-bold text-red-500 opacity-50">{valueA}</span>
                        </div>

                        <div className="text-2xl text-gray-400 font-bold">+</div>

                        <div className="flex flex-col items-center gap-2">
                            {renderItems(valueB, "text-green-500", "b")}
                            <span className="text-sm font-bold text-green-500 opacity-50">{valueB}</span>
                        </div>
                    </div>
                )}

                {/* Comparison: Show two distinct groups side by side for visual compare */}
                {type === 'comparison' && (
                    <div className="flex gap-12 items-center">
                        <div className="flex flex-col items-center gap-2">
                            {renderItems(valueA, "text-blue-500", "comp-a")}
                            <span className="text-sm font-bold text-blue-500 opacity-50">{valueA}</span>
                        </div>

                        <div className="w-1 h-12 bg-gray-600/20 rounded-full" />

                        <div className="flex flex-col items-center gap-2">
                            {renderItems(valueB, "text-orange-500", "comp-b")}
                            <span className="text-sm font-bold text-orange-500 opacity-50">{valueB}</span>
                        </div>
                    </div>
                )}

                {/* Subtraction: Logic can be tricky visually if we want to cross out.
            For now, let's just show the TOTAL amount (A) and maybe highlight B in a different way or just show A.
            Requirements say: "Under 3 appear 3 red pencils...".
            Let's stick to simple display of available items for now.
        */}
                {type === 'subtraction' && !showTotal && (
                    <div className="flex flex-col items-center gap-2">
                        {renderItems(valueA, "text-purple-500", "sub-a")}
                        <span className="text-sm font-bold text-purple-500 opacity-50">{valueA} items total</span>
                    </div>
                )}

                {(type === 'counting' || showTotal) && type !== 'comparison' && (
                    <div className="flex flex-col items-center">
                        {/* Total or Count */}
                        {renderItems(
                            type === 'addition' ? valueA + valueB :
                                type === 'subtraction' ? valueA - valueB :
                                    valueA,
                            "text-brand-accent",
                            "total"
                        )}
                    </div>
                )}
            </LayoutGroup>
        </div>
    );
}
