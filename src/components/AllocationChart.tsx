import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface AllocationChartProps {
  rf: number;
  rv: number;
}

export const AllocationChart = ({ rf, rv }: AllocationChartProps) => {
  const data = [
    { name: "Renda Fixa", value: rf },
    { name: "Renda Variável", value: rv },
  ];

  const COLORS = ["hsl(160, 100%, 38%)", "hsl(45, 100%, 62%)"];

  return (
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
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
  );
};
