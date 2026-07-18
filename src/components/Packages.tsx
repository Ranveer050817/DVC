import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/contact';

import img1bhk from '../assets/1bhk.jpg';
import img2bhk from '../assets/2bhk.jpg';
import img3bhk from '../assets/3bhk.jpg';
import img4bhk from '../assets/4bhk.jpg';

const packages = [
  { name: "1 BHK", price: "₹2799", image: img1bhk },
  { name: "2 BHK", price: "₹3599", image: img2bhk },
  { name: "3 BHK", price: "₹4399", image: img3bhk },
  { name: "4 BHK", price: "₹5499", image: img4bhk }
];

export function Packages() {
  return (
    <section className="w-full flex flex-col gap-12" id="packages">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
          OUR <span className="text-red-600">PACKAGES</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
        {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-[#050505] border border-[#ff3b30]/30 hover:border-[#ff3b30]/60 hover:shadow-[0_0_30px_rgba(255,59,48,0.15)] rounded-[20px] overflow-hidden group transition-all duration-500 h-[550px]"
            >
              <div className="h-[80%] w-full p-0 flex items-center justify-center relative bg-black/40">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ff3b30]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-contain object-center block relative z-10 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              <div className="h-[20%] p-4 flex flex-col justify-between border-t border-[#ff3b30]/20 bg-[#050505]/80 backdrop-blur-md">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-black text-xl uppercase tracking-widest text-white">
                    {pkg.name}
                  </h3>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-0.5">
                      Starting From
                    </p>
                    <p className="text-lg font-black text-[#ff3b30] leading-none">
                      {pkg.price}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => openWhatsApp({ package: pkg.name })}
                  className="w-full bg-[#ff3b30] hover:bg-red-700 text-white py-2.5 rounded-xl font-black uppercase text-sm tracking-widest transition-colors shadow-[0_4px_15px_rgba(255,59,48,0.3)] hover:shadow-[0_6px_20px_rgba(255,59,48,0.4)]"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
        ))}
      </div>
    </section>
  );
}
