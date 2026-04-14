import { motion } from "framer-motion";
import { Brain, Sparkles, Film } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Recommendations",
    description:
      "Our advanced RAG pipeline analyzes thousands of Netflix titles to find the perfect match for your mood, taste, and viewing history.",
  },
  {
    icon: Sparkles,
    title: "Conversational Discovery",
    description:
      "Chat naturally about what you're looking for — whether it's a thriller like Stranger Things or a heartwarming rom-com.",
  },
  {
    icon: Film,
    title: "Deep Movie Knowledge",
    description:
      "We don't just match genres. We understand themes, cinematography styles, narrative structures, and the vibe you're after.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-gradient-red mb-4">
            ABOUT CINEBOT
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We built CineBot because finding the right movie shouldn't feel like
            scrolling endlessly. Our AI understands what makes a movie great — for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-panel rounded-xl p-8 hover:border-primary/40 transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl tracking-wide text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
