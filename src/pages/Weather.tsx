import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud } from "lucide-react";
import CityInput from "@/components/CityInput";
import WeatherDisplay from "@/components/WeatherDisplay";
import LoadingState from "@/components/LoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import { getWeatherData, WeatherData } from "@/lib/api";

export default function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");

  const handleSubmit = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    setCity(cityName);

    try {
      const result = await getWeatherData(cityName);
      if (result) {
        setData(result);
      } else {
        setError("City not found. Please check the city name and try again.");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again later.");
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
            <Cloud className="w-4 h-4" />
            <span>Live Weather</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Today's <span className="gradient-text">Weather Report</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Get current weather conditions including temperature, humidity, wind speed, and more.
          </p>
        </motion.div>

        {/* City Input */}
        <div className="mb-10">
          <CityInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Enter city name for weather..."
          />
        </div>

        {/* Content */}
        {isLoading && <LoadingState message="Fetching weather data..." />}
        
        {error && !isLoading && (
          <ErrorMessage message={error} onRetry={() => city && handleSubmit(city)} />
        )}
        
        {data && !isLoading && !error && (
          <WeatherDisplay data={data} city={city} />
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
              <Cloud className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Check Weather Conditions</h3>
            <p className="text-muted-foreground">
              Enter a city name to view current weather including temperature, humidity, and wind conditions.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
