import { Button } from '../ui/Button';

interface KeypadProps {
    onInput: (digit: number) => void;
    onClear: () => void;
    disabled?: boolean;
}

export function Keypad({ onInput, onClear, disabled }: KeypadProps) {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    return (
        <div className="flex flex-nowrap justify-center gap-1 w-full max-w-3xl mx-auto px-1">
            {digits.map((digit) => (
                <Button
                    key={digit}
                    variant="secondary"
                    size="lg"
                    onClick={() => onInput(digit)}
                    disabled={disabled}
                    className="flex-1 h-12 md:h-16 min-w-[32px] max-w-[64px] text-xl md:text-2xl font-bold p-0 rounded-lg shadow-md border-b-2 border-black/20 active:border-b-0 active:translate-y-0.5"
                >
                    {digit}
                </Button>
            ))}

            <Button
                variant="danger"
                size="lg"
                onClick={onClear}
                disabled={disabled}
                className="flex-1 h-12 md:h-16 min-w-[32px] max-w-[64px] text-lg md:text-xl flex items-center justify-center font-bold p-0 rounded-lg shadow-md border-b-2 border-black/20 active:border-b-0 active:translate-y-0.5"
            >
                ⌫
            </Button>
        </div>
    );
}
