import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Mock array of posters - Replace with your actual assets
const posters = [
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400",
  "https://images.unsplash.com/photo-1542204172-658a09bb620c?q=80&w=400",
  "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400",
  "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=400",
  "https://images.unsplash.com/photo-1594908941015-a740879c9431?q=80&w=400",
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=400",
  "https://images.unsplash.com/photo-1501250987900-211872507e12?q=80&w=400",
  "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=400",
  "https://images.unsplash.com/photo-1516663713099-37eb6d60c825?q=80&w=400",
  "https://images.unsplash.com/photo-1614850523296-6cc6524388bf?q=80&w=400",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-full w-full bg-black overflow-hidden group cursor-none"
    >
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 opacity-30 grayscale brightness-50">
        {posters.map((src, i) => (
          <img key={i} src={src} className="w-full h-full object-cover" alt="movie" />
        ))}
      </div>
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 mask-radial z-10 transition-opacity duration-500">
        {posters.map((src, i) => (
          <img key={i} src={src} className="w-full h-full object-cover shadow-2xl" alt="movie" />
        ))}
      </div>

      {/* Modern Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full bg-gradient-to-t from-black via-transparent to-black/50 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="text-red-600 font-bold tracking-[0.3em] text-xs mb-4 block">
            AI-POWERED DISCOVERY
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
            CINE<span className="text-red-600">BOT</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-8 font-medium leading-relaxed">
            Stop scrolling. Start watching. Our neural engine maps your taste to 
            thousands of titles in seconds.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-red-600 text-white rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
            >
              Start Your Journey
            </Link>
          </div>
        </motion.div>
      </div>
      <div 
        style={{ left: 'var(--mouse-x)', top: 'var(--mouse-y)' }}
        className="fixed w-4 h-4 bg-red-600 rounded-full pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2 hidden group-hover:block"
      />
    </section>
  );
};

export default HeroSection;