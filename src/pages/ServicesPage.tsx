import { motion } from 'motion/react';
import { CheckCircle2, Plus } from 'lucide-react';
import { openWhatsApp } from '../utils/contact';

const cleaningSections = [
  {
    title: "Living Room & Bedrooms",
    items: [
      "Deep dusting of all furniture and surfaces",
      "Dust removal & wall cleaning",
      "Bed, wardrobe & dressing table cleaning",
      "Cobweb removal",
      "Door and door frame cleaning",
      "Switchboard cleaning",
      "Window glass, tracks & grill cleaning",
      "Floor scrubbing and mopping",
      "Skirting cleaning",
      "Wall cleaning (Wet or Dry)"
    ]
  },
  {
    title: "Kitchen",
    items: [
      "Kitchen platform and sink cleaning",
      "Cabinet cleaning (Inside & Outside)",
      "Chimney exterior cleaning",
      "Wall tile degreasing and cleaning",
      "Exhaust fan exterior cleaning",
      "Floor scrubbing and mopping"
    ]
  },
  {
    title: "Bathrooms",
    items: [
      "Wash basin cleaning",
      "Wall and floor tile descaling",
      "Mirror cleaning",
      "Tap and fitting polishing",
      "Drain cover cleaning",
      "Exhaust fan exterior cleaning"
    ]
  },
  {
    title: "Furniture Cleaning",
    items: [
      "Dusting of all furniture",
      "Dining table cleaning",
      "TV unit cleaning",
      "Wardrobe cleaning",
      "Study table and shelves cleaning"
    ]
  },
  {
    title: "Balcony / Utility Area",
    items: [
      "Floor cleaning and scrubbing",
      "Railing cleaning",
      "Cobweb removal"
    ]
  }
];

const addOns = [
  "Sofa Shampooing",
  "Mattress Shampooing",
  "Carpet Shampooing",
  "Curtain Cleaning",
  "Water Tank Cleaning"
];

export function ServicesPage() {
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16 lg:gap-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
          COMPLETE DEEP <span className="text-[#ff3b30]">CLEANING</span>
        </h1>
        <p className="text-[#ff3b30] font-bold tracking-[0.2em] uppercase text-sm md:text-base animate-text-shine">
          NO ONE CAN GIVE YOU THIS MANY SERVICES AT SUCH AN AMAZING PRICE
        </p>
      </motion.div>

      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cleaningSections.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-[#ff3b30]/50 transition-all duration-300 group flex flex-col h-full"
            >
              <h3 className="text-xl font-black uppercase text-white mb-6 group-hover:text-[#ff3b30] transition-colors">
                {section.title}
              </h3>
              <ul className="space-y-4 mb-8 flex-1">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ff3b30] shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => openWhatsApp({ service: section.title })}
                className="w-full bg-[#ff3b30]/10 border border-[#ff3b30]/30 text-[#ff3b30] px-6 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#ff3b30] hover:text-white transition-all rounded-xl"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-12 pt-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-white flex items-center gap-4 border-b border-white/10 pb-4"
        >
          <span className="text-yellow-500">⭐</span> Add-On Services <span className="text-gray-500 text-sm ml-auto">(Extra Charges)</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addon, index) => (
            <motion.div 
              key={addon}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-black border border-white/10 rounded-xl p-6 flex items-center justify-between group hover:border-[#ff3b30] transition-colors cursor-pointer"
            >
              <span className="font-bold text-white text-sm uppercase tracking-wider group-hover:text-[#ff3b30] transition-colors">
                {addon}
              </span>
              <Plus className="w-5 h-5 text-[#ff3b30]" />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-12 pb-8 flex justify-center"
      >
        <button 
          onClick={() => openWhatsApp()}
          className="bg-[#ff3b30] text-white px-12 py-6 font-black uppercase text-sm sm:text-base tracking-widest hover:bg-[#ff3b30]/90 transition-all rounded-2xl w-full sm:w-auto shadow-[0_0_30px_rgba(255,59,48,0.3)] hover:shadow-[0_0_50px_rgba(255,59,48,0.5)] flex items-center justify-center gap-4"
        >
          Book Your Service Now
        </button>
      </motion.div>
    </div>
  );
}
