import { useMemo } from "react";

export default function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 20,
      color: i % 3 === 0 ? "primary" : i % 3 === 1 ? "accent" : "secondary",
    }));
  }, []);

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle bg-${particle.color}/10`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            background:
              particle.color === "primary"
                ? "radial-gradient(circle, hsl(174 72% 50% / 0.1) 0%, transparent 70%)"
                : particle.color === "accent"
                ? "radial-gradient(circle, hsl(160 84% 39% / 0.1) 0%, transparent 70%)"
                : "radial-gradient(circle, hsl(199 89% 48% / 0.1) 0%, transparent 70%)",
          }}
        />
      ))}
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}
