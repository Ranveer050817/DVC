import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/contact';
import { fetchPublishedProducts, ProductItem } from '../lib/supabase';
import { Check, XCircle } from 'lucide-react';

export function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const res = await fetchPublishedProducts();
      if (isMounted) {
        setProducts(res.data);
        setErrorMsg(res.error);
        setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

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
          className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#111111] mt-4"
        >
          Premium Cleaning Products
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#555555] max-w-2xl uppercase tracking-widest text-sm"
        >
          High Quality Professional Cleaning Products for Home &amp; Commercial Use.
        </motion.p>
        {errorMsg && (
          <p className="text-xs text-amber-600 font-medium">
            (Displaying catalog • database sync notice: {errorMsg})
          </p>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-white border border-[#E5E5E5] rounded-xl h-[500px] p-6 animate-pulse flex flex-col justify-between">
              <div className="h-[340px] bg-gray-100 rounded-lg w-full" />
              <div className="space-y-2 pt-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-8 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white border border-[#E5E5E5] rounded-2xl max-w-2xl mx-auto shadow-sm">
          <p className="text-lg font-bold text-[#111111] mb-2 uppercase">No Products Listed</p>
          <p className="text-sm text-[#666666] mb-6">Our product inventory is currently being updated. Contact our sales team on WhatsApp for current product stock.</p>
          <button
            onClick={() => openWhatsApp({ product: "Product Catalog Inquiry" })}
            className="bg-[#ff3b30] hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors"
          >
            Inquire via WhatsApp
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id || product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-[#E5E5E5] shadow-sm backdrop-blur-sm group hover:border-[#ff3b30]/50 transition-all duration-500 flex flex-col overflow-hidden min-h-[500px] rounded-xl"
            >
              <div className="relative h-[72%] w-full p-6 flex items-center justify-center bg-[#F7F7F7] overflow-hidden">
                <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <img 
                  referrerPolicy="no-referrer" 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain block transform group-hover:scale-110 transition-transform duration-700 relative z-0 drop-shadow-2xl" 
                />
                
                {/* Availability Badge */}
                <div className="absolute top-3 right-3 z-20">
                  {product.isAvailable ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Check className="w-3 h-3" /> In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-200">
                      <XCircle className="w-3 h-3" /> Out of Stock
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4 flex flex-col items-center text-center justify-between flex-1 gap-3">
                <div className="w-full">
                  <h3 className="text-sm font-bold uppercase tracking-tight group-hover:text-[#ff3b30] transition-colors whitespace-pre-line leading-tight">
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-base font-black text-[#ff3b30] mt-1">
                      {product.price}
                    </p>
                  )}
                  {product.description && (
                    <p className="text-xs text-[#666666] line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  )}
                </div>
                
                <button 
                  onClick={() => openWhatsApp({ product: `${product.name.replace('\n', ' ')}${product.price ? ` (${product.price})` : ''}` })}
                  disabled={!product.isAvailable}
                  className={`w-full py-2.5 font-black uppercase text-xs tracking-widest transition-all rounded-lg ${
                    product.isAvailable 
                      ? "bg-[#ff3b30] text-white hover:bg-[#ff3b30]/90 shadow-sm" 
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.isAvailable ? "Order Now" : "Currently Unavailable"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
