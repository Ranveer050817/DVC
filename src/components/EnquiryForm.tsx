import React, { useState } from 'react';
import { motion } from 'motion/react';
import { openWhatsApp, EnquiryDetails } from '../utils/contact';

const serviceOptions = [
  "Home Deep Cleaning",
  "Office Deep Cleaning",
  "Restaurant Cleaning",
  "Warehouse Cleaning",
  "Villa & Bungalow Cleaning",
  "Resort Cleaning",
  "Shop Cleaning",
  "Hotel Cleaning"
];

const packageOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Not Applicable"];

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: '',
    package: '',
    date: '',
    timeSlot: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, address, service, package: pkg, date, timeSlot, message } = formData;
    
    openWhatsApp({
      name,
      phone,
      address,
      service,
      package: pkg,
      date,
      time: timeSlot
    });
  };

  return (
    <section className="w-full flex flex-col gap-12" id="book">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
          BOOK YOUR <span className="text-red-600">SERVICE</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto w-full glass p-8 md:p-12 rounded-2xl relative overflow-hidden"
      >
        {/* Glow accent */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Client Name *</label>
              <input 
                required type="text" name="name" value={formData.name} onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number *</label>
              <input 
                required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Address *</label>
            <input 
              required type="text" name="address" value={formData.address} onChange={handleChange}
              className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600 transition-colors"
              placeholder="Your full address..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Select Service *</label>
              <select 
                required name="service" value={formData.service} onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600 transition-colors [&>option]:bg-brand-black"
              >
                <option value="" disabled>Select a service</option>
                {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Select Package</label>
              <select 
                name="package" value={formData.package} onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600 transition-colors [&>option]:bg-brand-black"
              >
                <option value="" disabled>Select a package</option>
                {packageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Preferred Date *</label>
              <input 
                required type="date" name="date" value={formData.date} onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Preferred Time Slot *</label>
              <input 
                required type="time" name="timeSlot" value={formData.timeSlot} onChange={handleChange}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Additional Message</label>
            <textarea 
              name="message" value={formData.message} onChange={handleChange} rows={4}
              className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
              placeholder="Any special instructions..."
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-red-600 text-white px-8 py-4 mt-4 font-black uppercase text-sm tracking-widest hover:bg-red-700 transition-all glow-red rounded-lg">
            Book Now
          </button>
        </form>
      </motion.div>
    </section>
  );
}
