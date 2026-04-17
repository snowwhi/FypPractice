import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
];

const Navbar = () => {

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass-panel shadow-2xl
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wider text-gradient-red">
            CINEBOT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/login"
          className="px-5 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
        >
          Sign In
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
