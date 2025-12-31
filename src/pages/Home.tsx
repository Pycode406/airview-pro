import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wind, MapPin, Cloud, TrendingUp, History, ArrowRight, Sparkles, Shield, Gauge } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-Time AQI",
    description: "Get instant air quality readings for any city worldwide with detailed pollutant breakdown.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Cloud,
    title: "Weather Reports",
    description: "View current weather conditions including temperature, humidity, and wind speed.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "3-Day Forecast",
    description: "Plan ahead with accurate air quality predictions for the next three days.",
    gradient: "from-teal-500 to-green-500",
  },
  {
    icon: History,
    title: "Historical Data",
    description: "Analyze past air quality trends with historical data visualization.",
    gradient: "from-purple-500 to-pink-500",
  },
];

const stats = [
  { value: "195+", label: "Countries Covered" },
  { value: "Real-time", label: "Data Updates" },
  { value: "6", label: "Pollutants Tracked" },
  { value: "100%", label: "Free to Use" },
];

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Your Air Quality Guardian</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">AIRAWARE</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-4 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Visualizing the Air You Breathe
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground/70 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Monitor real-time air quality, get health recommendations, and track pollution trends for cities worldwide.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/check-aqi" className="glow-button flex items-center gap-2 text-lg">
              <span>Check Your City's AQI</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/weather"
              className="px-6 py-3 rounded-xl border border-border/50 hover:bg-secondary/50 transition-colors flex items-center gap-2"
            >
              <Cloud className="w-5 h-5" />
              <span>View Weather</span>
            </Link>
          </motion.div>
        </div>

        {/* Animated Icon */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
        >
          <div className="relative">
            <motion.div
              className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Wind className="w-16 h-16 text-primary" />
            </motion.div>
            {/* Orbiting particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-primary rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, 80, 0, -80, 0],
                  y: [-80, 0, 80, 0, -80],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 2.5,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay informed about air quality and protect your health.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="glass-card-hover p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="glass-card p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                How It <span className="gradient-text">Works</span>
              </h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Enter Your City", desc: "Simply type the name of any city worldwide" },
                  { step: "02", title: "Get Real-Time Data", desc: "We fetch the latest AQI and weather data instantly" },
                  { step: "03", title: "View Insights", desc: "See detailed breakdowns and health recommendations" },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className="text-3xl font-display font-bold text-primary/30">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Health Alerts", color: "bg-green-500/20 text-green-500" },
                  { icon: Gauge, label: "AQI Tracking", color: "bg-cyan-500/20 text-cyan-500" },
                  { icon: TrendingUp, label: "Forecasts", color: "bg-purple-500/20 text-purple-500" },
                  { icon: History, label: "History", color: "bg-orange-500/20 text-orange-500" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className={`glass-card p-6 text-center ${item.color}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <motion.div
          className="glass-card p-8 md:p-12 text-center animated-gradient"
          style={{
            background: "linear-gradient(135deg, hsl(174 72% 50% / 0.1), hsl(160 84% 39% / 0.1), hsl(199 89% 48% / 0.1))",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Start Monitoring Your Air Quality
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Make informed decisions about your outdoor activities and protect your health with real-time air quality data.
          </p>
          <Link to="/check-aqi" className="glow-button inline-flex items-center gap-2 text-lg">
            <MapPin className="w-5 h-5" />
            <span>Check AQI Now</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
