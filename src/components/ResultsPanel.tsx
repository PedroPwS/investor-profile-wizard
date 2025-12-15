import { ProfileResult } from "@/types/quiz";
import { AllocationChart } from "./AllocationChart";
import { Flame } from "lucide-react";

interface ResultsPanelProps {
  result: ProfileResult | null;
}

export const ResultsPanel = ({ result }: ResultsPanelProps) => {
  return (
    <aside className="w-full lg:w-[360px] lg:min-w-[280px] bg-gradient-to-b from-foreground/[0.02] to-transparent p-4 rounded-xl">
      {/* Score Box */}
      <div className="bg-background/40 p-4 rounded-xl text-center mb-4">
        <p className="text-xs text-muted-foreground mb-1">Seu score</p>
        <p className="text-xl font-bold text-gold">
          {result ? `${result.score} / 30` : "- / 30"}
        </p>
        {result ? (
          <div className="mt-3">
            <p className="text-lg font-bold text-foreground">{result.name}</p>
            <p className="text-sm text-gold mt-2 leading-relaxed">
              {result.description}
            </p>
          </div>
        ) : (
          <p className="text-base font-semibold text-foreground mt-2">
            Responda as perguntas
          </p>
        )}
      </div>

      {/* Chart */}
      {result && (
        <div className="bg-background/20 p-4 rounded-xl text-center mb-4">
          <AllocationChart rf={result.rfPercent} rv={result.rvPercent} />
          <p className="text-xs text-muted-foreground mt-3">
            Distribuição sugerida (visual)
          </p>
        </div>
      )}

      {/* Allocation */}
      <div className="bg-foreground/[0.02] p-4 rounded-lg mb-4">
        <p className="font-semibold text-foreground text-sm mb-2">
          Recomendação rápida
        </p>
        {result ? (
          <div className="text-muted-foreground text-sm">
            <p>{result.allocation}</p>
            <p className="font-bold mt-1">
              Recomendação do método: {result.recommendation}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">—</p>
        )}
      </div>

      {/* Details */}
      {result && (
        <div className="bg-foreground/[0.02] p-4 rounded-lg mb-4">
          <p className="font-semibold text-foreground text-sm mb-2">
            Detalhes do perfil
          </p>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="font-semibold">Descrição profunda:</p>
            <p className="mt-1">{result.details}</p>
            <p className="font-semibold mt-3">Sugestão final:</p>
            <p className="mt-1">
              Considere combinar aportes regulares com rebalanceamento e
              acompanhamento semestral.
            </p>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <a
        href="https://api.whatsapp.com/message/TCGHUGCDLDMPC1?autoload=1&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-extrabold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
      >
        <Flame className="w-5 h-5" />
        Ativar minha Fórmula
      </a>
    </aside>
  );
};
