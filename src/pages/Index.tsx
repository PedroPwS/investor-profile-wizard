import { useState } from "react";
import { QuizForm } from "@/components/QuizForm";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ProfileResult } from "@/types/quiz";

const Index = () => {
  const [result, setResult] = useState<ProfileResult | null>(null);

  const handleCalculate = (score: number) => {
    let profile: ProfileResult;
    
    if (score <= 7) {
      profile = {
        score,
        name: "CONSERVADORA",
        description: "Você prioriza segurança, preservação do capital e prioriza liquidez. Prefere retornos estáveis e evita alta volatilidade.",
        recommendation: "2% (Conservador)",
        allocation: "Renda fixa 90% / Renda variável 10%",
        details: "Sugestão: enfoque em renda fixa, títulos prefixados, Tesouro e fundos conservadores. Evitar exposição elevada a ações.",
        rfPercent: 90,
        rvPercent: 10,
      };
    } else if (score <= 15) {
      profile = {
        score,
        name: "MODERADA",
        description: "Busca equilíbrio entre segurança e crescimento. Aceita alguma volatilidade para obter retornos maiores no médio prazo.",
        recommendation: "3% (Moderado)",
        allocation: "Renda fixa 70% / Renda variável 30%",
        details: "Sugestão: combinação de renda fixa e parcela em ações ou fundos multimercados. Diversificação é chave.",
        rfPercent: 70,
        rvPercent: 30,
      };
    } else if (score <= 23) {
      profile = {
        score,
        name: "ARROJADA",
        description: "Tolerância a oscilações maior para buscar crescimento no longo prazo. Aceita correções de curto prazo.",
        recommendation: "5% (Arrojado)",
        allocation: "Renda fixa 40% / Renda variável 60%",
        details: "Sugestão: maior alocação em ações, ETFs e FIIs; rebalanceamento periódico e estratégia de custo médio.",
        rfPercent: 40,
        rvPercent: 60,
      };
    } else {
      profile = {
        score,
        name: "SUPER ARROJADA",
        description: "Foco em maximizar retornos, aceita alta volatilidade e perdas temporárias para ganhos maiores.",
        recommendation: "5%+ (Agressivo)",
        allocation: "Renda fixa 10% / Renda variável 90%",
        details: "Sugestão: carteira agressiva, possibilidade de alavancagem, investimentos alternativos e estratégias ativas.",
        rfPercent: 10,
        rvPercent: 90,
      };
    }
    
    setResult(profile);
  };

  const handleClear = () => {
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-background flex justify-center p-4 md:p-7">
      <div className="w-full max-w-[960px] card-gradient rounded-2xl p-5 md:p-6 shadow-2xl relative glow-green">
        <header className="text-center mb-4">
          <h1 className="text-gold text-2xl md:text-3xl font-bold mb-2">
            Perfil Premium — Investidor Preguiçoso
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Responda ao formulário e receba uma análise detalhada — com recomendação 2% / 3% / 5% e sugestão de carteira.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-5 mt-5">
          <QuizForm onCalculate={handleCalculate} onClear={handleClear} />
          <ResultsPanel result={result} />
        </div>

        <footer className="mt-5 text-center text-muted-foreground text-xs">
          Resultados informativos — consulte um especialista para recomendações financeiras personalizadas.
        </footer>
      </div>
    </main>
  );
};

export default Index;
