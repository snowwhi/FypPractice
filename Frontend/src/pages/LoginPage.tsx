import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("cinebot_user", username.trim());
      navigate("/chat");
    }
  };

  const handleGoogleAuth = () => {
    const name = prompt("Enter your display name for CineBot:");
    if (name?.trim()) {
      localStorage.setItem("cinebot_user", name.trim());
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen  bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute  top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel rounded-2xl px-8 py-4 md:px-12 md:py-4 w-full max-w-md relative z-10"
      >
        <Link to="/" className="block text-center mb-8">
          <span className="font-display text-4xl tracking-wider text-gradient-red">
            CINEBOT
          </span>
        </Link>

        <h2 className="text-center text-foreground text-xl font-semibold mb-2">
          Welcome back
        </h2>
         <GoogleLogin
                onSuccess={(credentialResponse) => {
                  try {
                    if (credentialResponse.credential) {
                      const userObject: any = jwtDecode(credentialResponse.credential);
                      
                      sessionStorage.setItem("quiz_user", JSON.stringify({ 
                        username: userObject.name, 
                        email: userObject.email 
                      }));
                      
                      toast.success(`Welcome, ${userObject.name}!`);
                      navigate("/chat");
                    }
                  } catch (error) {
                    toast.error("Failed to process Google account data");
                  }
                }}
                onError={() => {
                  toast.error("Google Login Failed");
                }}
                width="100%"
                size="large"
                theme="outline"
                shape="rectangular"
              />

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
