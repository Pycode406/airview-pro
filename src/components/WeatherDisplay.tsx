import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Gauge } from "lucide-react";
import { WeatherData } from "@/lib/api";

interface WeatherDisplayProps {
  data: WeatherData;
  city: string;
}

const metrics = [
  { key: "temp", label: "Temperature", icon: Thermometer, unit: "°C", color: "from-orange-500 to-red-500" },
  { key: "feelsLike", label: "Feels Like", icon: Thermometer, unit: "°C", color: "from-yellow-500 to-orange-500" },
  { key: "humidity", label: "Humidity", icon: Droplets, unit: "%", color: "from-blue-500 to-cyan-500" },
  { key: "windSpeed", label: "Wind Speed", icon: Wind, unit: " m/s", color: "from-cyan-500 to-teal-500" },
  { key: "pressure", label: "Pressure", icon: Gauge, unit: " hPa", color: "from-purple-500 to-pink-500" },
];

export default function WeatherDisplay({ data, city }: WeatherDisplayProps) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Weather Card */}
      <motion.div
        className="glass-card-hover p-8 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-medium text-muted-foreground mb-2">
          Weather in <span className="text-foreground font-semibold">{city}</span>
        </h2>

        <motion.div
          className="my-6 flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
            alt={data.description}
            className="w-32 h-32 drop-shadow-2xl"
          />
          <span className="text-5xl font-display font-bold gradient-text">
            {Math.round(data.temp)}°C
          </span>
          <span className="text-lg text-muted-foreground capitalize mt-2">
            {data.description}
          </span>
        </motion.div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const value = data[metric.key as keyof WeatherData];
          
          return (
            <motion.div
              key={metric.key}
              className="metric-card"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold">
                {typeof value === "number" ? Math.round(value) : value}
                {metric.unit}
              </span>
              <span className="text-sm text-muted-foreground">{metric.label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
