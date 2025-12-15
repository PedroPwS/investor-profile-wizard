import { motion, AnimatePresence } from "framer-motion";
import { ProfileResult } from "@/types/quiz";
import { AllocationChart } from "./AllocationChart";
import { Flame, TrendingUp, Shield, Zap, Rocket } from "lucide-react";

interface ResultsPanelProps {
  result: ProfileResult | null;
}

const getProfileIcon = (name: string) => {
  switch (name) {
    case "CONSERVADORA":
      return <Shield className="w-6 h-6 text-primary" />;
    case "MODERADA":
      return <TrendingUp className="w-6 h-6 text-secondary" />;
    case "ARROJADA":
      return <Zap className="w-6 h-6 text-accent" />;
    case "SUPER ARROJADA":
      return <Rocket className="w-6 h-6 text-destructive" />;
    default:
      return null;
  }
};

export const ResultsPanel = ({ result }: ResultsPanelProps) => {
  return (
    <aside className="w-full lg:w-[360px] lg:min-w-[280px] bg-gradient-to-b from-foreground/[0.02] to-transparent p-4 rounded-xl">
      {/* Score Box */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-background/40 backdrop-blur-sm p-4 rounded-xl text-center mb-4 border border-foreground/5"
      >
        <p className="text-xs text-muted-foreground mb-1">Seu score</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={result?.score ?? "empty"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-2xl font-bold text-gold"
          >
            {result ? `${result.score} / 30` : "- / 30"}
          </motion.p>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1 }}
              className="mt-3"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                {getProfileIcon(result.name)}
                <p className="text-lg font-bold text-foreground">{result.name}</p>
              </div>
              <p className="text-sm text-gold/90 mt-2 leading-relaxed">
                {result.description}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-base font-semibold text-foreground mt-2"
            >
              Responda as perguntas
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chart */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background/20 p-4 rounded-xl text-center mb-4 border border-foreground/5 overflow-hidden"
          >
            <AllocationChart rf={result.rfPercent} rv={result.rvPercent} />
            <p className="text-xs text-muted-foreground mt-3">
              Distribuição sugerida (visual)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Allocation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-foreground/[0.02] p-4 rounded-lg mb-4 border border-foreground/5"
      >
        <p className="font-semibold text-foreground text-sm mb-2">
          Recomendação rápida
        </p>
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="allocation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground text-sm"
            >
              <p>{result.allocation}</p>
              <p className="font-bold mt-1 text-gold">
                Recomendação do método: {result.recommendation}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground text-sm"
            >
              —
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Details */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.1 }}
            className="bg-foreground/[0.02] p-4 rounded-lg mb-4 border border-foreground/5"
          >
            <p className="font-semibold text-foreground text-sm mb-2">
              Detalhes do perfil
            </p>
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground/80">Descrição profunda:</p>
              <p className="mt-1">{result.details}</p>
              <p className="font-semibold text-foreground/80 mt-3">Sugestão final:</p>
              <p className="mt-1">
                Considere combinar aportes regulares com rebalanceamento e
                acompanhamento semestral.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Button */}
      <motion.a
        href="https://api.whatsapp.com/message/TCGHUGCDLDMPC1?autoload=1&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-extrabold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-secondary/20"
      >
        <Flame className="w-5 h-5" />
        Ativar minha Fórmula
      </motion.a>
    </aside>
  );
};
