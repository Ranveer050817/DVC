import { motion } from 'motion/react';
import { Home, Utensils, Building2, Warehouse, Briefcase, TreePine, Castle } from 'lucide-react';
import { openWhatsApp } from '../utils/contact';

import img1bhk from '../assets/1bhk.jpg';
import imgRestaurant from '../assets/dcresraunt.jpg';
import imgHotel from '../assets/dchotel.jpg';
import imgWarehouse from '../assets/dcwarehouse.jpg';
import imgOffice from '../assets/dcoffice.jpg';
import imgResort from '../assets/dcresort.jpg';
import imgBungalow from '../assets/dcbunglow_villa.jpg';

const services = [
  {
    name: "House Deep Cleaning",
    description: "Complete home deep cleaning for a fresh and hygienic living space.",
    icon: Home,
    image: img1bhk
  },
  {
    name: "Restaurant Deep Cleaning",
    description: "Professional kitchen, dining area and restaurant deep cleaning.",
    icon: Utensils,
    image: imgRestaurant
  },
  {
    name: "Hotel Deep Cleaning",
    description: "Complete hotel room, lobby and common area deep cleaning.",
    icon: Building2,
    image: imgHotel
  },
  {
    name: "Warehouse Deep Cleaning",
    description: "Industrial warehouse dust removal and deep sanitation.",
    icon: Warehouse,
    image: imgWarehouse
  },
  {
    name: "Office Deep Cleaning",
    description: "Professional office workspace cleaning and sanitization.",
    icon: Briefcase,
    image: imgOffice
  },
  {
    name: "Resort Deep Cleaning",
    description: "Luxury resort and hospitality property deep cleaning.",
    icon: TreePine,
    image: imgResort
  },
  {
    name: "Bungalow & Villa Deep Cleaning",
    description: "Premium deep cleaning for luxury villas and bungalows.",
    icon: Castle,
    image: imgBungalow
  }
];

export function MoreServices() {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black uppercase tracking-tighter"
        >
          OUR <span className="text-[#ff3b30]">MORE</span> DEEP CLEANING SERVICES
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#ff3b30] max-w-2xl font-bold uppercase tracking-[0.2em] text-sm md:text-base animate-text-shine"
        >
          FROM HOMES TO HOSPITALITY - WE BRING THE SAME RELENTLESS STANDARD EVERYWHERE.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/40 border border-white/5 backdrop-blur-sm group hover:border-[#ff3b30]/50 transition-all duration-500 flex flex-col overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 group-hover:border-[#ff3b30] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#ff3b30]" />
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-[#ff3b30] transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>
                
                <button 
                  onClick={() => openWhatsApp({ moreService: service.name })}
                  className="w-full bg-[#ff3b30] text-white px-6 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#ff3b30]/90 transition-all mt-auto"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
