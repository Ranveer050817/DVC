import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { openWhatsApp, CALL_NUMBER } from '../utils/contact';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export function Hero() {
  return (
    <section id="home" className="relative flex flex-col lg:flex-row items-center justify-between gap-12 py-20 lg:py-0 min-h-[85vh]">
      {/* Soft red glow behind the hero section */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full max-w-3xl h-[60vh] bg-[#ff3b30]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Left Content (45%) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center space-y-10 relative z-10 text-left">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#ff3b30] font-bold tracking-[0.2em] uppercase text-xs lg:text-sm block"
        >
          PREMIUM DETAILING & CARE
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col w-full font-sans uppercase leading-[0.9] tracking-tighter"
        >
          <div className="text-[5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[8.5rem] font-black text-white/95">
            WHERE DIRT
          </div>
          <div className="text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[7.5rem] font-black text-[#ff3b30]">
            MEETS THE DEVIL'S
          </div>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed font-medium">
            Professional Deep Cleaning Services for Homes, Offices, Restaurants, Hotels, Warehouses, Villas, Resorts & Bungalows.
          </p>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed font-medium">
            Experience premium cleaning with trained professionals, modern equipment and guaranteed customer satisfaction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-8 pt-4"
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button 
              onClick={() => window.open('https://wa.me/917208901545', '_blank')}
              className="bg-[#ff3b30] text-white px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#ff3b30]/90 transition-colors duration-300 w-full sm:w-auto text-center rounded-xl"
            >
              Book Service
            </button>
            <button 
              onClick={() => window.open('https://wa.me/917208901545', '_blank')}
              className="bg-black text-[#ff3b30] border border-[#ff3b30]/30 px-8 py-4 font-black uppercase text-sm tracking-widest hover:border-[#ff3b30] hover:bg-black/80 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#ff3b30]" />
              WhatsApp
            </button>
            <a 
              href={`tel:${CALL_NUMBER}`}
              className="bg-black text-[#ff3b30] border border-[#ff3b30]/30 px-8 py-4 font-black uppercase text-sm tracking-widest hover:border-[#ff3b30] hover:bg-black/80 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl"
            >
              <Phone className="w-5 h-5 text-[#ff3b30]" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
