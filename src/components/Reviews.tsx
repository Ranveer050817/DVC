import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Rahul Mehta",
    location: "Ghatkopar",
    text: "I booked Devil Cleanerz for a complete 2BHK deep cleaning before moving in. The team was punctual, professional, and paid attention to every corner. My home looked and smelled fresh. Highly recommended!"
  },
  {
    name: "Sneha Kapoor",
    location: "Andheri West",
    text: "I was impressed with their sofa and bathroom cleaning service. The stains were completely removed, and the team was very polite. Great value for money!"
  },
  {
    name: "Priya Shah",
    location: "Powai",
    text: "Excellent service from start to finish. They cleaned my kitchen, windows, and furniture perfectly. I will definitely book Devil Cleanerz again."
  },
  {
    name: "Amit Verma",
    location: "Mulund",
    text: "Our office needed deep cleaning before a client visit, and Devil Cleanerz exceeded expectations. The place looked spotless, and the staff was very cooperative."
  },
  {
    name: "Neha Arora",
    location: "Chembur",
    text: "I've tried a few cleaning companies before, but this was the best experience. They didn't rush the work and made sure everything was properly cleaned."
  },
  {
    name: "Rohit Patil",
    location: "Vikhroli",
    text: "Honestly, service ekdum mast thi. Sofa aur bathroom dono bilkul naye jaise lag rahe the. Team bahut hardworking thi. Definitely recommend"
  }
];

export function Reviews() {
  return (
    <section className="w-full flex flex-col gap-12" id="reviews">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
          CUSTOMER REVIEWS FOR <br className="hidden md:block" />
          <span className="text-red-600">DEVIL CLEANERZ & ENTERPRISES</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            className="service-card p-6 md:p-8 rounded-xl flex flex-col gap-4 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Star className="w-24 h-24 text-red-600" />
            </div>
            
            <div className="flex gap-1 text-red-600 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            
            <p className="text-gray-300 text-sm md:text-base italic relative z-10 flex-1 leading-relaxed">
              "{review.text}"
            </p>
            
            <div className="mt-4 relative z-10">
              <h4 className="font-black text-white uppercase tracking-wider">{review.name}</h4>
              <p className="text-xs text-red-600 uppercase font-bold tracking-widest">{review.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
