import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface DateDisplayProps {
  date: string;
  dayOfWeek: string;
}

export function DateDisplay({ date, dayOfWeek }: DateDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="text-center mb-8 sm:mb-12"
    >
      <div className="inline-block relative">
        {/* Animated decorative elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-rose/10 to-gold/10 rounded-full blur-2xl -z-10"
        />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="flex items-center justify-center mb-4 sm:mb-6"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose/20 to-gold/20 flex items-center justify-center border-2 border-gold/40 shadow-lg">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-rose" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm uppercase text-charcoal/60 mb-3 sm:mb-4"
          style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}
        >
          Save the Date
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-rose mb-2 relative"
          style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
        >
          {date.split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
              className="inline-block mx-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-charcoal/70"
          style={{ fontFamily: 'Newsreader, serif' }}
        >
          {dayOfWeek}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.9 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-4 sm:mt-6"
        />
      </div>
    </motion.div>
  );
}
