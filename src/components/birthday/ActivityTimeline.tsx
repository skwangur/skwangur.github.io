import { motion } from 'framer-motion';
import { Clock, Coffee, Music, Cake, Star, Car, Utensils, Camera, Heart } from 'lucide-react';
import { useState } from 'react';

interface Activity {
  time: string;
  title: string;
  description: string;
  icon: 'clock' | 'coffee' | 'music' | 'cake' | 'star' | 'car' | 'utensils' | 'camera' | 'heart';
}

interface ActivityTimelineProps {
  activities: Activity[];
  delay?: number;
}

const iconMap = {
  clock: Clock,
  coffee: Coffee,
  music: Music,
  cake: Cake,
  star: Star,
  car: Car,
  utensils: Utensils,
  camera: Camera,
  heart: Heart,
};

export function ActivityTimeline({ activities, delay = 0.2 }: ActivityTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className="mb-6 sm:mb-8"
    >
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
        className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-charcoal/50 mb-6 sm:mb-8 text-center"
        style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}
      >
        Celebration Timeline
      </motion.p>

      <div className="space-y-4 sm:space-y-6">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.icon];
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + (index * 0.15),
                type: "spring",
                stiffness: 100
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative flex gap-4 sm:gap-6 cursor-pointer group"
            >
              {/* Timeline line */}
              {index !== activities.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.6, delay: delay + (index * 0.15) + 0.3 }}
                  className="absolute left-[22px] top-12 bottom-0 w-[2px] bg-gradient-to-b from-gold/40 to-rose/30"
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -6 : 0,
                  rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
                }}
                transition={{ duration: 0.4, type: "spring" }}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-rose/15 to-gold/10 border-2 border-gold/50 flex items-center justify-center flex-shrink-0 z-10 backdrop-blur-sm shadow-lg group-hover:shadow-xl group-hover:border-rose/60"
              >
                <motion.div
                  animate={{
                    rotate: isHovered ? 360 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-rose" />
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                animate={{
                  y: isHovered ? -6 : 0,
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="flex-1 bg-gradient-to-br from-cream/70 to-blush/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-gold/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(199,123,127,0.15)] transition-all duration-400 backdrop-blur-sm group-hover:border-rose/40"
              >
                <div className="flex items-baseline justify-between mb-1.5 sm:mb-2 gap-2">
                  <motion.h4
                    className="text-base sm:text-lg text-charcoal"
                    style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}
                    animate={{
                      color: isHovered ? '#C77B7F' : '#3D3935',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {activity.title}
                  </motion.h4>
                  <motion.span
                    className="text-xs sm:text-sm text-rose font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-rose/10 whitespace-nowrap"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {activity.time}
                  </motion.span>
                </div>
                <motion.p
                  className="text-xs sm:text-sm text-charcoal/70 leading-relaxed"
                  style={{ fontFamily: 'Newsreader, serif' }}
                  animate={{
                    x: isHovered ? 4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {activity.description}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
