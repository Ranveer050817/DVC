import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/contact';
import { fetchPublishedPackages, PackageItem } from '../lib/supabase';
import { CheckCircle2, Loader2 } from 'lucide-react';

export function Packages() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadPackages() {
      setLoading(true);
      const res = await fetchPublishedPackages();
      if (isMounted) {
        setPackages(res.data);
        setErrorMsg(res.error);
        setLoading(false);
      }
    }
    loadPackages();
    return () => {
      isMounted = false;
    };
  }, []);

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
        {errorMsg && (
          <p className="text-xs text-amber-600 mt-2 font-medium">
            (Displaying catalog • database sync notice: {errorMsg})
          </p>
        )}
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
          {[1, 2, 3, 4].map((n) => (
            <div 
              key={n} 
              className="flex flex-col bg-white border border-[#E5E5E5] rounded-[20px] p-6 h-[550px] animate-pulse justify-between"
            >
              <div className="w-full h-72 bg-gray-100 rounded-xl" />
              <div className="space-y-3 pt-4">
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-1/3" />
                <div className="h-10 bg-gray-200 rounded-xl w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white border border-[#E5E5E5] rounded-2xl max-w-2xl mx-auto shadow-sm">
          <p className="text-lg font-bold text-[#111111] mb-2 uppercase">No Packages Currently Available</p>
          <p className="text-sm text-[#666666] mb-6">Our packages are being updated. Contact our team directly on WhatsApp for customized pricing.</p>
          <button
            onClick={() => openWhatsApp({ package: "Custom Package Inquiry" })}
            className="bg-[#ff3b30] hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors"
          >
            Inquire via WhatsApp
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id || pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-white border border-[#E5E5E5] shadow-sm hover:border-[#ff3b30]/40 hover:shadow-[0_10px_30px_rgba(255,59,48,0.1)] rounded-[20px] overflow-hidden group transition-all duration-500 min-h-[550px]"
            >
              <div className="relative w-full h-72 overflow-hidden bg-[#F7F7F7] flex items-center justify-center p-2">
                <img
                  referrerPolicy="no-referrer"
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-contain block group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-4 flex flex-col justify-between flex-1 border-t border-[#E5E5E5] bg-white relative z-10 gap-3">
                <div>
                  <div className="flex justify-between items-start px-1 mb-2">
                    <h3 className="font-black text-xl uppercase tracking-widest text-[#111111]">
                      {pkg.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-[#555555] uppercase font-bold tracking-widest mb-0.5">
                        Starting From
                      </p>
                      <p className="text-lg font-black text-[#ff3b30] leading-none">
                        {pkg.price || "Contact"}
                      </p>
                    </div>
                  </div>

                  {pkg.description && (
                    <p className="text-xs text-[#666666] line-clamp-2 px-1 mb-2">
                      {pkg.description}
                    </p>
                  )}

                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div className="space-y-1 mb-2 px-1">
                      {pkg.inclusions.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#444444]">
                          <CheckCircle2 className="w-3 h-3 text-[#ff3b30] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => openWhatsApp({ package: `${pkg.name}${pkg.price ? ` (${pkg.price})` : ''}` })}
                  className="w-full bg-[#ff3b30] hover:bg-red-700 text-white py-2.5 rounded-xl font-black uppercase text-sm tracking-widest transition-colors shadow-[0_4px_15px_rgba(255,59,48,0.3)] hover:shadow-[0_6px_20px_rgba(255,59,48,0.4)] mt-auto"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
