import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Send, HelpCircle, Sparkles, Film, LogOut, Trash2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const quickActions = [
  { icon: Film, label: "Trending Now", prompt: "What's trending on Netflix right now?" },
  { icon: Sparkles, label: "Surprise Me", prompt: "Surprise me with a random movie recommendation!" },
  { icon: HelpCircle, label: "Help", prompt: "What can you help me with?" },
];

// Mock movie recommendations
const mockResponses: Record<string, string> = {
  default: `Here are some great picks based on your request:\n\n🎬 **Stranger Things** — Sci-fi horror with an incredible ensemble cast. If you haven't seen it, start here.\n\n🎬 **Dark** — A German sci-fi thriller with mind-bending time travel.\n\n🎬 **The OA** — A mysterious, genre-defying series that'll keep you guessing.\n\nWant me to narrow it down by genre, mood, or decade?`,
  trending: `🔥 **Trending on Netflix This Week:**\n\n1. **Wednesday** — Tim Burton's dark comedy take on the Addams Family\n2. **Glass Onion** — Rian Johnson's sharp murder mystery sequel\n3. **All Quiet on the Western Front** — A visceral anti-war masterpiece\n4. **The Night Agent** — Fast-paced political thriller\n5. **Beef** — Dark comedy about road rage spiraling out of control\n\nAny of these catch your eye?`,
  help: `I'm **CineBot**, your AI movie recommendation assistant! Here's what I can do:\n\n🎯 **Recommend movies** based on your mood, genre, or vibe\n🔍 **Find similar titles** — "Show me movies like Inception"\n📊 **Trending picks** — See what's hot on Netflix right now\n🎲 **Surprise you** — Get a random curated recommendation\n💬 **Chat naturally** — Just tell me what you feel like watching!\n\nTry asking something like:\n- *"I want something scary but not too gory"*\n- *"Best comedies from the 2020s"*\n- *"Movies with plot twists"*`,
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("help") || lower.includes("what can")) return mockResponses.help;
  if (lower.includes("trending") || lower.includes("popular")) return mockResponses.trending;
  return mockResponses.default;
}

const TypingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-3">
    <div className="flex gap-1">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
    <span className="text-sm text-muted-foreground ml-2">CineBot is thinking...</span>
  </div>
);

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [username, setUsername] = useState("User");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cinebot_user");
    if (stored) setUsername(stored);
    else navigate("/login");
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

    const response = getMockResponse(text);
    setIsTyping(false);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleLogout = () => {
    localStorage.removeItem("cinebot_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="glass-panel border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
        <span className="font-display text-2xl tracking-wider text-gradient-red">CINEBOT</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">Hi, {username}</span>
          <button
            onClick={() => { setMessages([]); }}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <h2 className="font-display text-4xl md:text-5xl tracking-wider text-gradient-red mb-3">
                Hey, {username}! 🍿
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                What are you in the mood to watch today?
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.prompt)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl glass-panel hover:border-primary/40 transition-all duration-300 group"
                  >
                    <action.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground/80 group-hover:text-foreground">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "glass-panel rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="glass-panel rounded-2xl rounded-bl-md">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t border-border bg-background px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a movie recommendation..."
            className="flex-1 px-5 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
