import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import HeroSection from "@/components/HeroSection";
const queryClient = new QueryClient();
import {GoogleOAuthProvider} from '@react-oauth/google'
 const apiKey = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const App = () => (
  <GoogleOAuthProvider clientId={apiKey}>

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<Index />}>
    <Route index element={<HeroSection />} /> 
    <Route path="home" element={<HeroSection />} />
  </Route>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/chat" element={<ChatPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
