import { useState } from "react";
import { questions } from "@/data/questions";
import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  };

  const handleClear = () => {
    setAnswers(new Array(questions.length).fill(null));
    onClear();
  };

  return (
    <div className="flex-1 bg-card p-4 rounded-xl">
      <div className="space-y-4">
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
          className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 h-auto"
        >
          Calcular Perfil
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-bold py-3 h-auto border-border"
        >
          Limpar
        </Button>
      </div>
    </div>
  );
};
