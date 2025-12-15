import { useState } from "react";
import { motion } from "framer-motion";
import { questions } from "@/data/questions";
import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calculator, RotateCcw } from "lucide-react";

interface QuizFormProps {
  onCalculate: (score: number) => void;
  onClear: () => void;
}

export const QuizForm = ({ onCalculate, onClear }: QuizFormProps) => {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleCalculate = () => {
    if (answers.some((a) => a === null)) {
      toast.error("Por favor responda todas as perguntas.");
      return;
    }
    const score = answers.reduce((sum, val) => sum + (val ?? 0), 0);
    onCalculate(score);
    toast.success("Perfil calculado com sucesso!");
  };

  const handleClear = () => {
    setAnswers(new Array(questions.length).fill(null));
    onClear();
    toast.info("Respostas limpas.");
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 bg-card p-4 rounded-xl border border-foreground/5"
    >
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progresso</span>
          <span>{answeredCount} / {questions.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        {questions.map((q, idx) => (
          <QuestionCard
            key={idx}
            question={q.question}
            options={q.options}
            selectedIndex={answers[idx]}
            onSelect={(optionIdx) => handleSelect(idx, optionIdx)}
          />
        ))}
      </div>

      <div className="flex gap-3 mt-5">
        <Button
          onClick={handleCalculate}
          className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 h-auto gap-2"
        >
          <Calculator className="w-4 h-4" />
          Calcular Perfil
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-bold py-3 h-auto border-border gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar
        </Button>
      </div>
    </motion.div>
  );
};
