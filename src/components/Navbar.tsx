import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { openWhatsApp } from '../utils/contact';


import imgLogo from "../assets/devillogo_new.jpg";

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-[65px] w-full flex items-center justify-between px-2 sm:px-4 lg:px-12 glass sticky top-0 z-50 shrink-0"
    >
      <Link to="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0">
        <img referrerPolicy="no-referrer" src={imgLogo} alt="Devil Cleanerz Logo" className="h-8 md:h-10 w-auto object-contain rounded-md" />
        <span className="text-lg lg:text-xl font-black tracking-tighter text-white uppercase hidden md:block">
          DEVIL <span className="text-[#ff3b30]">CLEANERZ &amp; ENTERPRISES</span>
        </span>
      </Link>
      
      <div className="flex items-center justify-center flex-1 gap-2 sm:gap-4 md:gap-10 text-[9px] sm:text-[10px] md:text-sm font-bold tracking-widest uppercase px-1 sm:px-4 md:px-8 mx-auto" style={{ width: '358.025px', height: '20.5px' }}>
        <Link to="/" className={`${isActive('/') ? 'text-[#ff3b30]' : 'text-white'} hover:text-[#ff3b30] transition-colors`}>Home</Link>
        <Link to="/services" className={`${isActive('/services') ? 'text-[#ff3b30]' : 'text-white'} hover:text-[#ff3b30] transition-colors`}>Services</Link>
        <Link to="/products" className={`${isActive('/products') ? 'text-[#ff3b30]' : 'text-white'} hover:text-[#ff3b30] transition-colors`}>Products</Link>
      </div>

      <button 
        onClick={() => openWhatsApp()}
        className="bg-[#ff3b30] text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 shrink-0 rounded-none font-black uppercase text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-widest glow-red transition-colors hover:bg-[#ff3b30]/90"
      >
        Book Now
      </button>
    </motion.nav>
  );
}
