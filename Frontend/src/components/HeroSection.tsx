import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpeg";
import revealImg from "@/assets/stranger-things-reveal.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !revealRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    revealRef.current.style.setProperty("--mouse-x", `${x}px`);
    revealRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      /* Changed h-screen to a calculation to leave room for Header (64px) and Footer (approx 60px) */
      className="relative h-[calc(100vh-120px)] min-h-[500px] w-full overflow-hidden cursor-crosshair"
    >
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Dark cinematic background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>
      
      <div ref={revealRef} className="absolute inset-0 magic-lens">
        <img
          src={revealImg}
          alt="Hidden world revealed by cursor"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 netflix-gradient" />

      {/* Content: Adjusted padding and margins for tighter fit */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-gradient-red mb-2"
        >
          CINEBOT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-foreground/70 max-w-xl mb-6 font-light"
        >
          Your AI-powered Netflix companion. Discover your next binge-worthy
          obsession with intelligent movie recommendations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link
            to="/login"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-md hover:bg-primary/90 transition-all duration-300 animate-pulse-glow"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;