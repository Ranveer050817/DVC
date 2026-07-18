import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/contact';

import imgFloorCleaner from '../assets/floorcleaner.jpg';
import imgToiletCleaner from '../assets/toiletcleaner.jpg';
import imgGlassCleaner from '../assets/glasscleaner.jpg';
import imgBathroomCleaner from '../assets/bathroomcleaner.jpg';
import imgKitchenDegreaser from '../assets/kitchendegreaser.jpg';
import imgMultiPurpose from '../assets/multipurpose.jpg';
import imgHardWater from '../assets/hardwaterremover.jpg';
import imgFurniturePolish from '../assets/furniturepolish.jpg';
import imgTileCleaner from '../assets/tilecleaner.jpg';
import imgMicrofiber from '../assets/microfiber.jpg';
import imgToiletBrush from '../assets/toiletbrush.jpg';
import imgMop from '../assets/mop.jpg';
import imgSprayBottle from '../assets/spraybottle.jpg';

const products = [
  {
    name: "Floor Cleaner\nDevil Cleanerz",
    image: imgFloorCleaner
  },
  {
    name: "Toilet Cleaner\nDevil Cleanerz",
    image: imgToiletCleaner
  },
  {
    name: "Glass Cleaner\nDevil Cleanerz",
    image: imgGlassCleaner
  },
  {
    name: "Bathroom Cleaner\nDevil Cleanerz",
    image: imgBathroomCleaner
  },
  {
    name: "Kitchen Degreaser\nDevil Cleanerz",
    image: imgKitchenDegreaser
  },
  {
    name: "Multi-Purpose Surface Cleaner\nDevil Cleanerz",
    image: imgMultiPurpose
  },
  {
    name: "Hard Water Stain Remover\nDevil Cleanerz",
    image: imgHardWater
  },
  {
    name: "Furniture Polish\nDevil Cleanerz",
    image: imgFurniturePolish
  },
  {
    name: "Tile & Marble Cleaner\nDevil Cleanerz",
    image: imgTileCleaner
  },
  {
    name: "Microfiber Cloths\nDevil Cleanerz",
    image: imgMicrofiber
  },
  {
    name: "Toilet Brushes\nDevil Cleanerz",
    image: imgToiletBrush
  },
  {
    name: "3-in-1 Mops\nDevil Cleanerz",
    image: imgMop
  },
  {
    name: "Spray Bottles\nDevil Cleanerz",
    image: imgSprayBottle
  }
];

export function ProductsPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-16 lg:gap-24 pt-32">
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter"
        >
          DEVIL <span className="text-[#ff3b30]">CLEANERZ</span> &amp; ENTERPRISES
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mt-4"
        >
          Premium Cleaning Products
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl uppercase tracking-widest text-sm"
        >
          High Quality Professional Cleaning Products for Home &amp; Commercial Use.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 border border-white/5 backdrop-blur-sm group hover:border-[#ff3b30]/50 transition-all duration-500 flex flex-col overflow-hidden h-[500px]"
          >
            <div className="relative h-[80%] w-full p-0 flex items-center justify-center bg-white/5">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img referrerPolicy="no-referrer" 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover object-center block transform group-hover:scale-110 transition-transform duration-700 relative z-0" 
              />
            </div>
            
            <div className="h-[20%] p-3 flex flex-col items-center text-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-tight group-hover:text-[#ff3b30] transition-colors whitespace-pre-line leading-tight">
                {product.name}
              </h3>
              
              <button 
                onClick={() => openWhatsApp({ product: product.name.replace('\n', ' ') })}
                className="w-full bg-[#ff3b30] text-white py-2.5 font-black uppercase text-xs tracking-widest hover:bg-[#ff3b30]/90 transition-all"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
