import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export const QuestionCard = ({
  question,
  options,
  selectedIndex,
  onSelect,
}: QuestionCardProps) => {
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="mb-4">
      <h3 className="text-sm md:text-base font-semibold text-foreground/90 mb-3">
        {question}
      </h3>
      <div className="grid gap-2">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={cn(
              "text-left p-3 rounded-lg border transition-all duration-200 text-sm",
              selectedIndex === idx
                ? "bg-primary text-primary-foreground font-bold border-primary/70"
                : "bg-foreground/[0.02] border-foreground/[0.05] text-muted-foreground hover:bg-foreground/[0.05] hover:border-foreground/10"
            )}
          >
            {letters[idx]}) {option}
          </button>
        ))}
      </div>
    </div>
  );
};
