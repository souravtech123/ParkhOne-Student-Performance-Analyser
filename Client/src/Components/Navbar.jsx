import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = ["Dashboard", "Analyze", "Insights", "Reports"];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-blue-200 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide cursor-pointer">
          ParakhOne
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium text-blue-950">
          {navLinks.map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer relative hover:text-blue-600"
            >
              {link}
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] bg-blue-600"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className={`h-[3px] w-6 bg-black transition-all ${open ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`h-[3px] w-6 bg-black transition-all ${open ? "opacity-0" : ""}`}></span>
          <span className={`h-[3px] w-6 bg-black transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-white/30 backdrop-blur-md p-5 space-y-4 text-center text-lg"
        >
          {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer hover:text-blue-600">
              {link}
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
