import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';

interface LocationCardProps {
  venue: string;
  address: string;
  delay?: number;
}

export function LocationCard({ venue, address, delay = 0.1 }: LocationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay, type: "spring", stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gradient-to-br from-blush/50 to-cream/70 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-8 sm:mb-12 border border-gold/30 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(199,123,127,0.2)] transition-all duration-400 cursor-pointer backdrop-blur-sm group relative"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <motion.div 
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-rose/20 to-gold/10 flex items-center justify-center flex-shrink-0 border-2 border-gold/40 shadow-lg group-hover:border-rose/50"
        >
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-rose" />
        </motion.div>
        
        <div className="flex-1">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-charcoal/50 mb-1.5 sm:mb-2" 
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}
          >
            Location
          </motion.p>
          
          <motion.h3 
            animate={{
              x: isHovered ? 4 : 0,
              color: isHovered ? '#C77B7F' : '#3D3935',
            }}
            transition={{ duration: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2" 
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}
          >
            {venue}
          </motion.h3>
          
          <motion.p 
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-sm sm:text-base text-charcoal/70 mb-3 sm:mb-4" 
            style={{ fontFamily: 'Newsreader, serif' }}
          >
            {address}
          </motion.p>

          {/* Interactive button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.4 }}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-rose group-hover:text-rose font-medium"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Get Directions</span>
            <motion.span
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Decorative corner */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.5, duration: 0.5 }}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-xl"
      />
    </motion.div>
  );
}
