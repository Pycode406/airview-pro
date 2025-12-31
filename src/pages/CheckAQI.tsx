import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import CityInput from "@/components/CityInput";
import AQIDisplay from "@/components/AQIDisplay";
import LoadingState from "@/components/LoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import { getAQIData, AQIData } from "@/lib/api";

export default function CheckAQI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AQIData | null>(null);
  const [city, setCity] = useState("");

  const handleSubmit = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    setCity(cityName);

    try {
      const result = await getAQIData(cityName);
      if (result) {
        setData(result);
      } else {
        setError("City not found or AQI data unavailable. Please check the city name and try again.");
      }
    } catch (err) {
      setError("Failed to fetch AQI data. Please try again later.");
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
            <MapPin className="w-4 h-4" />
            <span>Real-Time Data</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Check <span className="gradient-text">Air Quality</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Enter any city to get real-time AQI readings, pollutant levels, and health recommendations.
          </p>
        </motion.div>

        {/* City Input */}
        <div className="mb-10">
          <CityInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Search for a city (e.g., New York, London, Tokyo)..."
          />
        </div>

        {/* Content */}
        {isLoading && <LoadingState message="Fetching air quality data..." />}
        
        {error && !isLoading && (
          <ErrorMessage message={error} onRetry={() => city && handleSubmit(city)} />
        )}
        
        {data && !isLoading && !error && (
          <AQIDisplay data={data} city={city} />
        )}

        {/* Initial State */}
        {!data && !isLoading && !error && (
          <motion.div
            className="glass-card p-12 text-center max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Search for a City</h3>
            <p className="text-muted-foreground">
              Enter a city name above to view its current air quality index and detailed pollutant information.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
