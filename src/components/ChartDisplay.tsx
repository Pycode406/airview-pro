import { motion } from "framer-motion";
import { TrendingUp, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface ChartData {
  date: string;
  aqi: number;
}

interface ChartDisplayProps {
  data: ChartData[];
  title: string;
  city: string;
  type?: "forecast" | "historical";
}

export default function ChartDisplay({ data, title, city, type = "forecast" }: ChartDisplayProps) {
  const Icon = type === "forecast" ? TrendingUp : Calendar;
  const gradientId = `gradient-${type}`;
  const strokeColor = type === "forecast" ? "#14b8a6" : "#06b6d4";

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/20">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{city}</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, "dataMax + 50"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 47% 11% / 0.95)",
                border: "1px solid hsl(217 33% 20%)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "#fff", marginBottom: "8px" }}
              formatter={(value: number) => [`AQI: ${value}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="aqi"
              stroke={strokeColor}
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              dot={{ fill: strokeColor, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: strokeColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* AQI Legend */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {[
          { label: "Good", color: "#22c55e", range: "0-50" },
          { label: "Moderate", color: "#eab308", range: "51-100" },
          { label: "Unhealthy (S)", color: "#f97316", range: "101-150" },
          { label: "Unhealthy", color: "#ef4444", range: "151-200" },
          { label: "Very Unhealthy", color: "#a855f7", range: "201-300" },
          { label: "Hazardous", color: "#be123c", range: "301+" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>
              {item.label} ({item.range})
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
