import { motion } from "framer-motion";
import { AlertTriangle, Shield, Wind } from "lucide-react";
import { AQIData, AQI_CATEGORIES, POLLUTANT_LABELS, POLLUTANT_COLORS } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface AQIDisplayProps {
  data: AQIData;
  city: string;
}

export default function AQIDisplay({ data, city }: AQIDisplayProps) {
  const categoryInfo = AQI_CATEGORIES.find((cat) => data.aqi <= cat.max) || AQI_CATEGORIES[5];

  const chartData = Object.entries(data.components).map(([key, value]) => ({
    name: POLLUTANT_LABELS[key] || key.toUpperCase(),
    value: Number(value.toFixed(2)),
    color: POLLUTANT_COLORS[key] || "#888",
  }));

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main AQI Card */}
      <motion.div
        className="glass-card-hover p-8 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-medium text-muted-foreground mb-2">
          Air Quality in <span className="text-foreground font-semibold">{city}</span>
        </h2>
        
        <motion.div
          className="relative inline-flex items-center justify-center my-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div
            className="w-36 h-36 rounded-full flex items-center justify-center pulse-glow"
            style={{
              background: `conic-gradient(${categoryInfo.color} ${(data.aqi / 500) * 100}%, transparent 0)`,
            }}
          >
            <div className="w-28 h-28 rounded-full bg-card flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-bold">{data.aqi}</span>
              <span className="text-xs text-muted-foreground">AQI</span>
            </div>
          </div>
        </motion.div>

        <div className={`aqi-badge ${categoryInfo.class} text-lg mb-4`}>
          {data.category}
        </div>

        <p className="text-muted-foreground max-w-md mx-auto">{data.message}</p>
      </motion.div>

      {/* Pollutant and Precautions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Pollutant Card */}
        <motion.div
          className="glass-card p-6"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-destructive/20">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Main Pollutant</h3>
              <p className="text-2xl font-display font-bold text-primary">
                {POLLUTANT_LABELS[data.mainPollutant] || data.mainPollutant.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Precautions</span>
            </div>
            <ul className="space-y-2">
              {data.precautions.map((precaution, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <span className="text-primary mt-1">•</span>
                  {precaution}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Pollutant Chart */}
        <motion.div
          className="glass-card p-6"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/20">
              <Wind className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Pollutant Levels</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#6b7280"
                  fontSize={12}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 47% 11% / 0.95)",
                    border: "1px solid hsl(217 33% 20%)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                  }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(value: number) => [`${value} µg/m³`, "Level"]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
