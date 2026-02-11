import { motion } from 'framer-motion';

export function FloatingPetals() {
  const petals = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(357, 35%, ${62 + (index % 3) * 5}%), transparent)`,
            left: `${(index * 12.5) + 5}%`,
            top: `${-10}%`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(index) * 30, Math.sin(index + 2) * -30, 0],
            opacity: [0, 0.6, 0.4, 0],
            scale: [0.5, 1, 0.8, 0.3],
          }}
          transition={{
            duration: 15 + (index * 2),
            repeat: Infinity,
            delay: index * 1.5,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
