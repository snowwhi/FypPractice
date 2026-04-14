import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
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
      className="relative h-screen w-full overflow-hidden cursor-crosshair"
    >
      {/* Base layer */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Dark cinematic background"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Reveal layer with magic lens */}
      <div
        ref={revealRef}
        className="absolute inset-0 magic-lens"
      >
        <img
          src={revealImg}
          alt="Hidden world revealed by cursor"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 netflix-gradient" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-gradient-red mb-4"
        >
          CINEBOT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-8 font-light"
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
            className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 animate-pulse-glow"
          >
            Get Started
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 text-muted-foreground text-sm"
        >
          ✨ Move your cursor to reveal the hidden world
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
