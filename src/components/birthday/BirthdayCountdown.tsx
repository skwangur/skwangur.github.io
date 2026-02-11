import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BirthdayCountdownProps {
  targetDate: Date;
  delay?: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function BirthdayCountdown({ targetDate, delay = 0.15 }: BirthdayCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsBirthday(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (isBirthday) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay }}
        className="mb-8 sm:mb-12"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-gradient-to-br from-rose/20 to-gold/20 rounded-2xl p-6 sm:p-8 border-2 border-gold/40 shadow-xl text-center"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-rose" style={{ fontFamily: 'Fraunces, serif' }}>
            🎉 It's Your Birthday! 🎉
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className="mb-8 sm:mb-12"
    >
      <div className="text-center mb-4 sm:mb-6">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-rose/15 to-gold/10 mb-2 sm:mb-3"
        >
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-rose" />
        </motion.div>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-charcoal/50" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>
          Counting Down To
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: delay + (index * 0.1), type: "spring" }}
            className="bg-gradient-to-br from-cream/80 to-blush/40 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gold/30 shadow-lg hover:shadow-xl transition-shadow"
          >
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-rose mb-0.5 sm:mb-1"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            <p className="text-[10px] sm:text-xs uppercase tracking-wide text-charcoal/60" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>
              {unit.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
