import Navbar from "@/components/Navbar";
import { Outlet } from 'react-router-dom'
import Footer from "@/components/Footer";
import '../index.css'
const Index = () => {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-black">
      <Navbar />
      <main className="flex-grow relative overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      </div>
  );
};

export default Index;
