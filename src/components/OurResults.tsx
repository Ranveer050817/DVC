import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeftRight, Sparkles, CheckCircle2 } from "lucide-react";
import { openWhatsApp } from "../utils/contact";
import { fetchPublishedResults, ResultItem } from "../lib/supabase";

function InteractiveResultsSlider({ comparison }: { comparison: ResultItem }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    const percent = Math.max(0, Math.min((x / width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Interactive Slider Area */}
      <div
        ref={containerRef}
        className="h-[280px] sm:h-[340px] md:h-[380px] relative overflow-hidden bg-[#F7F7F7] select-none cursor-ew-resize group touch-none"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* BEFORE Image (Base / Left Side) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${comparison.before})` }}
        />

        {/* AFTER Image (Clipped overlay / Right Side) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${comparison.after})`,
            clipPath: `inset(0 0 0 ${sliderPosition}%)`
          }}
        />

        {/* Divider Slider Line with Handle */}
        <div
          className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Vertical line indicator */}
          <div className="w-[3px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
          
          {/* Central Handle Button */}
          <div className="absolute w-11 h-11 bg-[#ff3b30] rounded-full border-4 border-white shadow-lg flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
            <ArrowLeftRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Left Badge: BEFORE */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-[11px] font-black uppercase tracking-wider rounded-md border border-white/20 shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          BEFORE (LEFT)
        </div>

        {/* Right Badge: AFTER */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#ff3b30] text-white text-[11px] font-black uppercase tracking-wider rounded-md shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          AFTER (RIGHT)
        </div>

        {/* Bottom Helper Bar */}
        <div className="absolute bottom-3 inset-x-4 z-10 flex justify-between pointer-events-none text-[10px] font-black tracking-widest uppercase text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          <span className="bg-black/60 px-2.5 py-0.5 rounded backdrop-blur-xs">◀ Before Clean</span>
          <span className="bg-[#ff3b30]/80 px-2.5 py-0.5 rounded backdrop-blur-xs">After Clean ▶</span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <h3 className="text-xl font-black uppercase text-[#111111] tracking-tight">
            {comparison.title}
          </h3>
          {comparison.subtitle && (
            <p className="text-sm text-[#666666] mt-1 font-medium">
              {comparison.subtitle}
            </p>
          )}
        </div>

        {comparison.highlights && comparison.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F0F0F0]">
            {comparison.highlights.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F7F7F7] text-[#333333] text-xs font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b30]" />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function OurResults() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const res = await fetchPublishedResults();
      if (isMounted) {
        setResults(res.data);
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
    <section className="w-full flex flex-col gap-12" id="our-results">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 border border-red-200 text-[#ff3b30] text-xs font-bold uppercase tracking-widest rounded-full">
          <Sparkles className="w-3.5 h-3.5" /> Proven Quality Transformations
        </div>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#111111]">
          OUR <span className="text-[#ff3b30]">RESULTS</span>
        </h2>
        <p className="text-[#ff3b30] max-w-2xl mx-auto font-bold uppercase tracking-[0.2em] text-sm md:text-base animate-text-shine">
          REAL RESULTS • BEFORE ON LEFT, AFTER ON RIGHT
        </p>
        {errorMsg && (
          <p className="text-xs text-amber-600 font-medium">
            (Database notice: {errorMsg})
          </p>
        )}
      </motion.div>

      {/* Sliders Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          {[1, 2].map((n) => (
            <div key={n} className="bg-white border border-[#E5E5E5] rounded-2xl p-6 h-[460px] animate-pulse flex flex-col justify-between">
              <div className="h-[320px] bg-gray-100 rounded-xl" />
              <div className="h-6 bg-gray-200 rounded w-1/2 mt-4" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white border border-[#E5E5E5] rounded-2xl max-w-2xl mx-auto shadow-sm">
          <p className="text-lg font-bold text-[#111111] mb-2 uppercase">No Transformation Results Listed</p>
          <p className="text-sm text-[#666666] mb-6">Our recent transformations are being updated. Inquire on WhatsApp to see project portfolios.</p>
          <button
            onClick={() => openWhatsApp({ service: "Results Portfolio Inquiry" })}
            className="bg-[#ff3b30] hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors"
          >
            Inquire via WhatsApp
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          {results.map((comp, index) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="w-full"
            >
              <InteractiveResultsSlider comparison={comp} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Call to action banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
      >
        <div className="text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-black uppercase text-[#111111] tracking-tight">
            Want these exact results for your home or property?
          </h4>
          <p className="text-sm text-[#666666] mt-1 font-medium">
            Book your deep cleaning today and experience the Devil Cleanerz standard.
          </p>
        </div>
        <button
          onClick={() => openWhatsApp({ service: "Results Inquiry - Deep Cleaning" })}
          className="bg-[#ff3b30] text-white px-8 py-3.5 rounded-xl font-black uppercase text-xs sm:text-sm tracking-widest shadow-md hover:bg-[#ff3b30]/90 transition-colors shrink-0"
        >
          Get Same Results Now
        </button>
      </motion.div>
    </section>
  );
}
