import { Button } from '../ui/Button';

interface ComparisonKeypadProps {
    onInput: (symbol: '>' | '<' | '=') => void;
    disabled?: boolean;
}

export function ComparisonKeypad({ onInput, disabled }: ComparisonKeypadProps) {
    return (
        <div className="flex gap-4 w-full max-w-sm mx-auto justify-center">
            <Button
                variant="secondary"
                size="lg"
                onClick={() => onInput('>')}
                disabled={disabled}
                className="aspect-square text-4xl w-24"
            >
                &gt;
            </Button>
            <Button
                variant="secondary"
                size="lg"
                onClick={() => onInput('=')}
                disabled={disabled}
                className="aspect-square text-4xl w-24"
            >
                =
            </Button>
            <Button
                variant="secondary"
                size="lg"
                onClick={() => onInput('<')}
                disabled={disabled}
                className="aspect-square text-4xl w-24"
            >
                &lt;
            </Button>
        </div>
    );
}
