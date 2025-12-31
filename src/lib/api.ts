const API_KEY = "8b8b77d1046f7ee6662731a0daa9483c";

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface PollutantComponents {
  pm2_5: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  no?: number;
  nh3?: number;
}

export interface AQIData {
  aqi: number;
  category: string;
  message: string;
  components: PollutantComponents;
  mainPollutant: string;
  precautions: string[];
}

export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  feelsLike: number;
  pressure: number;
}

export interface ForecastPoint {
  date: string;
  aqi: number;
  timestamp: number;
}

export interface HistoricalPoint {
  date: string;
  aqi: number;
}

export const AQI_CATEGORIES = [
  { max: 50, category: "Good", message: "Air quality is satisfactory, and air pollution poses little or no risk.", class: "aqi-good", color: "#22c55e" },
  { max: 100, category: "Moderate", message: "Air quality is acceptable, but some pollutants may be a concern for sensitive groups.", class: "aqi-moderate", color: "#eab308" },
  { max: 150, category: "Unhealthy for Sensitive Groups", message: "Children, elderly, and people with respiratory issues should limit outdoor activities.", class: "aqi-unhealthy-sensitive", color: "#f97316" },
  { max: 200, category: "Unhealthy", message: "Everyone may begin to experience adverse health effects; sensitive groups should stay indoors.", class: "aqi-unhealthy", color: "#ef4444" },
  { max: 300, category: "Very Unhealthy", message: "Health alert: everyone may experience more serious health effects.", class: "aqi-very-unhealthy", color: "#a855f7" },
  { max: 500, category: "Hazardous", message: "Emergency conditions. Entire population is more likely to be affected.", class: "aqi-hazardous", color: "#be123c" },
];

export const POLLUTANT_PRECAUTIONS: Record<string, string[]> = {
  pm2_5: [
    "Wear an N95 mask outdoors",
    "Use HEPA air purifiers indoors",
    "Keep windows and doors closed",
    "Avoid outdoor exercise",
    "Monitor AQI apps frequently",
    "Seal gaps in windows to prevent air entry",
    "Keep plants indoors to absorb particulates",
  ],
  pm10: [
    "Limit time outdoors",
    "Keep house clean from dust",
    "Avoid construction zones",
    "Use wet mopping instead of sweeping",
    "Avoid outdoor burning",
    "Wear dust masks",
    "Ventilate only when air is clean",
  ],
  no2: [
    "Avoid high-traffic areas",
    "Do not burn firewood indoors",
    "Use electric stoves instead of gas",
    "Install air purifiers with activated carbon",
    "Ventilate kitchen and bathrooms properly",
    "Avoid smoking indoors",
    "Use public transport to reduce emissions",
  ],
  so2: [
    "Stay indoors during high levels",
    "Avoid burning coal or firewood",
    "Use cleaner cooking methods",
    "Ventilate your home well",
    "Install gas leak detectors",
    "Prefer electric heating",
    "Avoid industrial zones",
  ],
  co: [
    "Do not leave vehicles running in enclosed spaces",
    "Install CO detectors at home",
    "Ensure proper chimney ventilation",
    "Service gas appliances regularly",
    "Avoid smoking indoors",
    "Do not use charcoal grills indoors",
    "Keep room ventilated while using heaters",
  ],
  o3: [
    "Avoid exercise during midday",
    "Limit car usage",
    "Close windows on hot, sunny days",
    "Use indoor plants like aloe vera",
    "Stay indoors on ozone alert days",
    "Avoid gasoline-powered equipment",
    "Use public transit instead of driving",
  ],
};

export const POLLUTANT_LABELS: Record<string, string> = {
  pm2_5: "PM2.5",
  pm10: "PM10",
  no2: "NO₂",
  so2: "SO₂",
  co: "CO",
  o3: "O₃",
};

export const POLLUTANT_COLORS: Record<string, string> = {
  pm2_5: "#3b82f6",
  pm10: "#22c55e",
  no2: "#ef4444",
  so2: "#a855f7",
  co: "#f97316",
  o3: "#06b6d4",
};

function convertOpenWeatherAQI(aqiValue: number): number {
  const conversionMap: Record<number, number> = { 1: 50, 2: 100, 3: 150, 4: 200, 5: 300 };
  return conversionMap[aqiValue] || 0;
}

function getAQICategoryInfo(aqi: number) {
  for (const cat of AQI_CATEGORIES) {
    if (aqi <= cat.max) {
      return cat;
    }
  }
  return AQI_CATEGORIES[AQI_CATEGORIES.length - 1];
}

export async function getLatLon(city: string): Promise<Coordinates | null> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}

export async function getAQIData(city: string): Promise<AQIData | null> {
  try {
    const coords = await getLatLon(city);
    if (!coords) return null;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data.list || data.list.length === 0) return null;

    const pollutionData = data.list[0];
    const aqiOpenWeather = pollutionData.main.aqi;
    const aqi = convertOpenWeatherAQI(aqiOpenWeather);
    const categoryInfo = getAQICategoryInfo(aqi);

    const components: PollutantComponents = {
      pm2_5: pollutionData.components.pm2_5 || 0,
      pm10: pollutionData.components.pm10 || 0,
      no2: pollutionData.components.no2 || 0,
      so2: pollutionData.components.so2 || 0,
      co: (pollutionData.components.co || 0) * 0.001145, // Convert to proper units
      o3: pollutionData.components.o3 || 0,
    };

    const pollutants = ['pm2_5', 'pm10', 'no2', 'so2', 'co', 'o3'] as const;
    const values = pollutants.map((p) => components[p]);
    const maxIndex = values.indexOf(Math.max(...values));
    const mainPollutant = pollutants[maxIndex];

    return {
      aqi,
      category: categoryInfo.category,
      message: categoryInfo.message,
      components,
      mainPollutant,
      precautions: POLLUTANT_PRECAUTIONS[mainPollutant] || [],
    };
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    return null;
  }
}

export async function getWeatherData(city: string): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) return null;

    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feelsLike: data.main.feels_like,
      pressure: data.main.pressure,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export async function getAQIForecast(city: string): Promise<ForecastPoint[]> {
  try {
    const coords = await getLatLon(city);
    if (!coords) return [];

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data.list || data.list.length === 0) return [];

    const forecastData: ForecastPoint[] = [];
    for (let i = 0; i < Math.min(data.list.length, 24 * 3); i += 8) {
      const item = data.list[i];
      const date = new Date(item.dt * 1000);
      forecastData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric' }),
        aqi: convertOpenWeatherAQI(item.main.aqi),
        timestamp: item.dt,
      });
    }

    return forecastData;
  } catch (error) {
    console.error("Error fetching AQI forecast:", error);
    return [];
  }
}

export async function getHistoricalAQI(city: string): Promise<HistoricalPoint[]> {
  try {
    const coords = await getLatLon(city);
    if (!coords) return [];

    const now = Math.floor(Date.now() / 1000);
    const past = now - 3 * 24 * 60 * 60; // 3 days ago

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${coords.lat}&lon=${coords.lon}&start=${past}&end=${now}&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data.list || data.list.length === 0) return [];

    // Group by date and calculate daily averages
    const dailyData: Record<string, number[]> = {};
    
    for (const entry of data.list) {
      const date = new Date(entry.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const aqi = convertOpenWeatherAQI(entry.main.aqi);
      
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(aqi);
    }

    return Object.entries(dailyData).map(([date, values]) => ({
      date,
      aqi: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
    }));
  } catch (error) {
    console.error("Error fetching historical AQI:", error);
    return [];
  }
}
