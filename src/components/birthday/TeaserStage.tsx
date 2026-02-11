import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

interface TeaserStageProps {
  onContinue: () => void;
}

export function TeaserStage({ onContinue }: TeaserStageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-visible">
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(244, 228, 230, 0.6) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(244, 228, 230, 0.6) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 60%, rgba(244, 228, 230, 0.6) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(244, 228, 230, 0.6) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 -z-10"
      />

      {/* Floating stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className="absolute"
          style={{
            left: `${5 + i * 8}%`,
            top: `${10 + (i % 4) * 20}%`,
          }}
        >
          <Star className="w-4 h-4 text-gold/40" fill="currentColor" />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center relative z-10"
      >
        {/* Glowing heart */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 blur-3xl bg-rose/50 rounded-full"
            />
            <Heart className="w-24 h-24 text-rose fill-rose relative z-10 drop-shadow-2xl" />
          </div>
        </motion.div>

        {/* Main text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl mb-6 text-charcoal"
          style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}
        >
          But wait...
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl mb-12 text-charcoal/80 leading-relaxed"
          style={{ fontFamily: 'Newsreader, serif', fontWeight: 400 }}
        >
          I just want to ask you something... 💕
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl sm:text-2xl mb-12 text-charcoal/60 italic"
          style={{ fontFamily: 'Newsreader, serif' }}
        >
          Since Valentine's is coming up...
        </motion.p>

        {/* Tap to continue button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="relative group"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-rose/30 to-gold/30 rounded-full blur-xl"
          />

          <div className="relative bg-gradient-to-r from-rose to-rose/90 text-white px-12 py-6 rounded-full shadow-2xl border-2 border-white/50 flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <span className="text-xl font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Click to Continue
            </span>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <Heart className="w-6 h-6 fill-white" />
            </motion.div>
          </div>
        </motion.button>

        {/* Floating sparkles around button */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.cos(i * 60) * 20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute"
            style={{
              left: `calc(50% + ${Math.cos(i * 60) * 100}px)`,
              top: `calc(50% + ${Math.sin(i * 60) * 100}px)`,
            }}
          >
            <Sparkles className="w-4 h-4 text-gold" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
