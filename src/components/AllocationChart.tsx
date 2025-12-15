import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface AllocationChartProps {
  rf: number;
  rv: number;
}

export const AllocationChart = ({ rf, rv }: AllocationChartProps) => {
  const data = [
    { name: "Renda Fixa", value: rf, color: "hsl(160, 100%, 38%)" },
    { name: "Renda Variável", value: rv, color: "hsl(45, 100%, 62%)" },
  ];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 6%)",
              border: "1px solid hsl(0, 0%, 15%)",
              borderRadius: "8px",
              color: "hsl(0, 0%, 100%)",
            }}
            formatter={(value: number) => [`${value}%`, ""]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span style={{ color: "hsl(0, 0%, 80%)", fontSize: "12px" }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Percentages display */}
      <div className="flex justify-center gap-6 mt-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{rf}%</div>
          <div className="text-xs text-muted-foreground">Renda Fixa</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gold">{rv}%</div>
          <div className="text-xs text-muted-foreground">Renda Variável</div>
        </div>
      </div>
    </motion.div>
  );
};
