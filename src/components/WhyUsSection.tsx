import { motion } from "framer-motion";
import { Zap, Shield, MessageSquare, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Instant Recommendations",
    stat: "< 2s",
    description: "Get personalized picks in under 2 seconds. No surveys, no quizzes — just tell us what you feel like watching.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    stat: "100%",
    description: "Your viewing preferences stay private. We don't track, sell, or share your data with anyone.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    stat: "24/7",
    description: "Chat like you would with a movie-buff friend. Our AI understands context, nuance, and even sarcasm.",
  },
  {
    icon: TrendingUp,
    title: "Always Learning",
    stat: "10K+",
    description: "Our database covers over 10,000 Netflix titles and grows daily, so you never run out of options.",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-gradient-red mb-4">
            WHY CINEBOT?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            There are plenty of recommendation engines out there. Here's why CineBot is different.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-panel rounded-xl p-8 flex gap-6 items-start hover:border-primary/40 transition-all duration-500"
            >
              <div className="shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                <reason.icon className="w-6 h-6 text-primary mb-1" />
                <span className="text-xs font-bold text-primary">{reason.stat}</span>
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-wide text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
