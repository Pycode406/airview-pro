import { useState } from "react";
import { motion } from "framer-motion";
import { History } from "lucide-react";
import CityInput from "@/components/CityInput";
import ChartDisplay from "@/components/ChartDisplay";
import LoadingState from "@/components/LoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import { getHistoricalAQI, HistoricalPoint } from "@/lib/api";

export default function Historical() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HistoricalPoint[]>([]);
  const [city, setCity] = useState("");

  const handleSubmit = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    setCity(cityName);

    try {
      const result = await getHistoricalAQI(cityName);
      if (result && result.length > 0) {
        setData(result);
      } else {
        setError("Unable to fetch historical data for this city. Please try another city.");
      }
    } catch (err) {
      setError("Failed to fetch historical data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary mb-4">
            <History className="w-4 h-4" />
            <span>Past 3 Days</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Historical <span className="gradient-text">AQI Data</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Analyze air quality trends from the past three days with daily averages.
          </p>
        </motion.div>

        {/* City Input */}
        <div className="mb-10">
          <CityInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Enter city for historical AQI..."
          />
        </div>

        {/* Content */}
        {isLoading && <LoadingState message="Fetching historical data..." />}
        
        {error && !isLoading && (
          <ErrorMessage message={error} onRetry={() => city && handleSubmit(city)} />
        )}
        
        {data.length > 0 && !isLoading && !error && (
          <ChartDisplay
            data={data}
            title="Past 3 Days AQI Average"
            city={city}
            type="historical"
          />
        )}

        {/* Initial State */}
        {data.length === 0 && !isLoading && !error && (
          <motion.div
            className="glass-card p-12 text-center max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <History className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">View Historical Data</h3>
            <p className="text-muted-foreground">
              Enter a city name to see the average air quality index for the past three days.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
