import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight } from 'lucide-react';

interface SliderProps {
  beforeImage: string;
  afterImage: string;
  label: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, label }: SliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
        ref={containerRef}
        className="h-[250px] lg:h-[300px] relative rounded-xl overflow-hidden glass group cursor-ew-resize select-none"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
    >
      {/* Before Image (Background) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${beforeImage})` }}
      />

      {/* After Image (Foreground, clipped) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 0 0 ${sliderPosition}%)`
        }}
      />

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 slider-line flex items-center justify-center z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-10 h-10 bg-red-600 rounded-full border-4 border-black flex items-center justify-center">
          <ArrowLeftRight className="w-4 h-4 text-white pointer-events-none" />
        </div>
      </div>

      {/* Before Label */}
      <div className="absolute top-6 left-6 px-4 py-1 bg-black/80 text-[10px] font-bold uppercase tracking-widest text-white rounded">
        {label} Before
      </div>

      {/* After Label */}
      <div className="absolute top-6 right-6 px-4 py-1 bg-red-600 text-[10px] font-bold uppercase tracking-widest text-white rounded">
        {label} After
      </div>
    </div>
  );
}
