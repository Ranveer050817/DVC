import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Utensils, 
  Building2, 
  Warehouse, 
  Briefcase, 
  TreePine, 
  Castle, 
  Sparkles,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { openWhatsApp } from '../utils/contact';
import { fetchPublishedServices, ServiceItem } from '../lib/supabase';

function getServiceIcon(name: string, iconName?: string): LucideIcon {
  const query = `${name} ${iconName || ''}`.toLowerCase();
  if (query.includes('restaurant') || query.includes('food') || query.includes('dining')) return Utensils;
  if (query.includes('hotel') || query.includes('building')) return Building2;
  if (query.includes('warehouse') || query.includes('industrial') || query.includes('factory')) return Warehouse;
  if (query.includes('office') || query.includes('workspace') || query.includes('corporate')) return Briefcase;
  if (query.includes('resort')) return TreePine;
  if (query.includes('bungalow') || query.includes('villa') || query.includes('mansion')) return Castle;
  if (query.includes('home') || query.includes('house') || query.includes('residential')) return Home;
  return Sparkles;
}

export function MoreServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadServices() {
      setLoading(true);
      const res = await fetchPublishedServices();
      if (isMounted) {
        setServices(res.data);
        setErrorMsg(res.error);
        setLoading(false);
      }
    }
    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full" id="services">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black uppercase tracking-tighter"
        >
          CLEANING <span className="text-[#ff3b30]">SERVICES</span>
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
        {errorMsg && (
          <p className="text-xs text-amber-600 font-medium">
            (Displaying catalog • database sync notice: {errorMsg})
          </p>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white border border-[#E5E5E5] rounded-xl h-96 p-6 animate-pulse flex flex-col justify-between">
              <div className="h-48 bg-gray-100 rounded-lg w-full" />
              <div className="space-y-3 pt-4">
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-10 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white border border-[#E5E5E5] rounded-2xl max-w-2xl mx-auto shadow-sm">
          <p className="text-lg font-bold text-[#111111] mb-2 uppercase">No Cleaning Services Listed</p>
          <p className="text-sm text-[#666666] mb-6">Our service offerings are being updated. Please contact us on WhatsApp for bookings.</p>
          <button
            onClick={() => openWhatsApp({ service: "Cleaning Services Inquiry" })}
            className="bg-[#ff3b30] hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors"
          >
            Inquire via WhatsApp
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.name, service.iconName);
            return (
              <motion.div
                key={service.id || service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-[#E5E5E5] shadow-sm hover:border-[#ff3b30]/40 group transition-all duration-500 flex flex-col overflow-hidden rounded-xl"
              >
                <div className="relative h-48 overflow-hidden bg-[#F7F7F7] flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    referrerPolicy="no-referrer" 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E5E5E5] shadow-sm group-hover:border-[#ff3b30] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#ff3b30]" />
                  </div>
                  {service.category && (
                    <div className="absolute top-4 right-4 z-20 bg-black/75 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow">
                      {service.category}
                    </div>
                  )}
                </div>
                
                <div 
                  className="p-6 flex flex-col flex-1"
                  style={index === 0 ? { height: '217.5px' } : undefined}
                >
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-[#ff3b30] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {service.inclusions && service.inclusions.length > 0 && (
                    <div className="space-y-1.5 mb-6 pt-2 border-t border-gray-100">
                      {service.inclusions.slice(0, 3).map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#555555]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b30] shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => openWhatsApp({ moreService: service.name, service: service.name })}
                    className="w-full bg-[#ff3b30] text-white px-6 py-3 font-black uppercase text-xs tracking-widest hover:bg-[#ff3b30]/90 transition-all mt-auto rounded-lg"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
