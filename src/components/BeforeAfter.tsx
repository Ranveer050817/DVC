import { motion } from 'motion/react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

import imgKitchenB from '../assets/kitchenB.jpg';
import imgKitchenA from '../assets/kitchenA.jpg';
import imgBefore from '../assets/before.jpg';
import imgAfter from '../assets/after.jpg';

const comparisons = [
  {
    label: "Kitchen",
    before: imgKitchenB,
    after: imgKitchenA
  },
  {
    label: "Hall",
    before: imgBefore,
    after: imgAfter
  }
];

export function BeforeAfter() {
  return (
    <section className="w-full flex flex-col gap-12" id="before-after">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
          BEFORE <span className="text-red-600">&</span> AFTER
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {comparisons.map((comp, index) => (
          <motion.div
            key={comp.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full"
          >
            <BeforeAfterSlider 
              label={comp.label}
              beforeImage={comp.before}
              afterImage={comp.after}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
