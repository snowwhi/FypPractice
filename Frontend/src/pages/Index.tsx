import Navbar from "@/components/Navbar";
import { Outlet } from 'react-router-dom'
import Footer from "@/components/Footer";
import '../index.css'
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
       <Outlet/>
      <Footer />
    </div>
  );
};

export default Index;
