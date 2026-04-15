import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const posters = [
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400",
  "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400",
  "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=400",
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=400",
 "https://images.unsplash.com/photo-1620510625142-b45cbb784397?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=400",
  "https://images.unsplash.com/photo-1776158401936-2565746a1785?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://media.istockphoto.com/id/2195751429/photo/happy-couple-laughing-while-watching-a-funny-movie-at-the-theatre.webp?a=1&b=1&s=612x612&w=0&k=20&c=Gt2XPqvtusHiXTPG9Y-KVnBpaukvcTumjYraz316mP4=",
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
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 opacity-20 grayscale brightness-50">
        {posters.map((src, i) => (
          <img key={i} src={src} className="w-full h-full object-cover" alt="movie" />
        ))}
      </div>
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 mask-radial z-10">
        {posters.map((src, i) => (
          <img key={i} src={src} className="w-full h-full object-cover" alt="movie" />
        ))}
      </div>
      <div className="relative z-30 flex flex-col items-center justify-center h-full bg-gradient-to-t from-black via-black/20 to-transparent px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-red-600 font-bold tracking-[0.4em] text-[10px] md:text-xs mb-4 block uppercase">
            AI-Powered Discovery
          </span>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-4 leading-none">
            CINE<span className="text-red-600">BOT</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-8 font-medium leading-relaxed">
            Stop scrolling. Start watching. Our neural engine maps your taste to 
            thousands of titles in seconds.
          </p>

          <Link
            to="/login"
            className="inline-block px-10 py-4 bg-red-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all rounded-sm shadow-xl"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </div>

      {/* Custom Cursor Dot */}
      <div 
        style={{ 
          left: 'var(--mouse-x)', 
          top: 'var(--mouse-y)',
          transform: 'translate(-50%, -50%)' 
        }}
        className="absolute w-6 h-6 border-2 border-red-600 rounded-full pointer-events-none z-50 hidden group-hover:block"
      />
    </section>
  );
};

export default HeroSection;