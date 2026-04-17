import { motion } from "framer-motion";
import { Brain, Sparkles, Film } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "NEURAL MATCHING",
    description:
      "Our RAG pipeline doesn't just filter genres. It analyzes thematic nodes across thousands of titles to find your perfect cinematic match.",
  },
  {
    icon: Sparkles,
    title: "NATURAL DIALOGUE",
    description:
      "Forget complex filters. Speak to CineBot as you would a friend. Describe a vibe, a scene, or a feeling, and we'll do the rest.",
  },
  {
    icon: Film,
    title: "VIBE ANALYSIS",
    description:
      "We decode cinematography styles and narrative structures. Whether it's 'dark noir' or '80s nostalgia,' CineBot understands the craft.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-12 px-6 bg-black text-white ">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-red-600 font-bold tracking-[0.5em] text-[10px] uppercase mb-4 block">
            The Technology
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            BEYOND THE <span className="text-red-600">ALGORITHM</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
            CineBot isn't just a search bar. It's a sophisticated AI architect 
            designed to bridge the gap between your mood and the silver screen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 bg-[#0a0a0a] border border-white/5 rounded-sm hover:border-red-600/30 transition-all duration-500 group"
            >
              {/* Corner Accent for that "Tech" look */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-red-600/0 group-hover:border-red-600/50 transition-all duration-500" />
              
              <div className="mb-8 relative">
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-red-600/10 text-red-600 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon strokeWidth={1.5} className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-lg font-bold tracking-widest text-white mb-4 uppercase">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;