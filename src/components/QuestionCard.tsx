import { motion } from "framer-motion";
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
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <h3 className="text-sm md:text-base font-semibold text-foreground mb-3">
        {question}
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(idx)}
            className={cn(
              "w-full text-left p-3 rounded-lg border transition-all duration-200",
              "text-sm cursor-pointer",
              selectedIndex === idx
                ? "bg-primary text-primary-foreground border-primary font-bold shadow-lg shadow-primary/20"
                : "bg-foreground/[0.02] border-foreground/5 text-muted-foreground hover:bg-foreground/[0.05] hover:border-foreground/10"
            )}
          >
            {String.fromCharCode(65 + idx)}) {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
