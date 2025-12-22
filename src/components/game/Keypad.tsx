import { Button } from '../ui/Button';

interface KeypadProps {
    onInput: (digit: number) => void;
    onClear: () => void;
    disabled?: boolean;
}

export function Keypad({ onInput, onClear, disabled }: KeypadProps) {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    return (
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
            {digits.slice(0, 9).map((digit) => (
                <Button
                    key={digit}
                    variant="secondary"
                    size="lg"
                    onClick={() => onInput(digit)}
                    disabled={disabled}
                    className="aspect-square text-3xl"
                >
                    {digit}
                </Button>
            ))}

            {/* Centering the 0 and placing Reset next to it */}
            <div className="col-start-2">
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => onInput(0)}
                    disabled={disabled}
                    className="aspect-square text-3xl w-full"
                >
                    0
                </Button>
            </div>

            <div className="col-start-3">
                <Button
                    variant="danger"
                    size="lg"
                    onClick={onClear}
                    disabled={disabled}
                    className="aspect-square text-lg w-full flex items-center justify-center font-bold"
                >
                    ⌫
                </Button>
            </div>
        </div>
    );
}
