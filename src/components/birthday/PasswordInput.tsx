import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Gift } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface PasswordInputProps {
  onCorrectPassword: () => void;
  correctPassword: string;
  delay?: number;
}

export function PasswordInput({ onCorrectPassword, correctPassword, delay = 0.3 }: PasswordInputProps) {
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      setIsUnlocking(true);
      setTimeout(() => onCorrectPassword(), 800);
    } else {
      setIsShaking(true);
      setPassword('');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay, type: "spring" }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div className="text-center mb-5 sm:mb-6">
          <motion.div
            animate={{
              rotate: isShaking ? [0, -10, 10, -10, 10, 0] : isUnlocking ? 360 : 0,
              scale: isUnlocking ? [1, 1.2, 0] : 1,
            }}
            transition={{ duration: isUnlocking ? 0.8 : 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-rose/20 to-gold/10 mb-5 sm:mb-6 border-2 border-gold/40 shadow-xl"
          >
            {isUnlocking ? (
              <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-rose" />
            ) : (
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-rose" />
            )}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="text-xs sm:text-sm text-charcoal/70 max-w-xs mx-auto mb-3 sm:mb-4 px-4" 
            style={{ fontFamily: 'Newsreader, serif' }}
          >
            Enter the secret password to unlock your surprise
          </motion.p>

          {/* Hidden Password Hint with Gift Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.button
              type="button"
              onClick={() => setShowPasswordHint(!showPasswordHint)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gold/10 hover:bg-gold/20 rounded-full border border-gold/30 transition-colors"
            >
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose" />
              <span className="text-[10px] sm:text-xs text-charcoal/70" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>
                Need a hint?
              </span>
            </motion.button>
          </motion.div>

          {/* Password Reveal */}
          <AnimatePresence>
            {showPasswordHint && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-br from-rose/10 to-gold/10 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gold/30 inline-block"
                >
                  <p className="text-[10px] sm:text-xs text-charcoal/60 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Password:
                  </p>
                  <p className="text-base sm:text-lg font-medium text-rose" style={{ fontFamily: 'Fraunces, serif' }}>
                    {correctPassword}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div
          animate={{
            x: isShaking ? [0, -10, 10, -10, 10, 0] : 0,
            scale: isShaking ? [1, 0.98, 1.02, 0.98, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Glow effect when focused */}
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-rose/20 rounded-xl blur-xl -z-10"
            />
          )}
          
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter password..."
            disabled={isUnlocking}
            className={`
              w-full px-4 sm:px-6 py-4 sm:py-6 text-center text-base sm:text-lg rounded-xl
              bg-white/90 backdrop-blur-sm border-2 transition-all duration-300
              ${isFocused 
                ? 'border-rose shadow-[0_0_0_4px_rgba(199,123,127,0.15),0_8px_32px_rgba(199,123,127,0.2)] outline-none' 
                : 'border-gold/30 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
              }
              ${isShaking ? 'border-red-400 bg-red-50' : ''}
              ${isUnlocking ? 'opacity-50' : ''}
            `}
            style={{ fontFamily: 'Newsreader, serif' }}
          />
        </motion.div>
        
        <motion.button
          type="submit"
          disabled={isUnlocking}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            opacity: isUnlocking ? 0.5 : 1,
          }}
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-rose to-rose/90 text-white rounded-xl font-medium shadow-[0_4px_24px_rgba(199,123,127,0.3)] hover:shadow-[0_8px_40px_rgba(199,123,127,0.5)] transition-all duration-400 relative overflow-hidden group"
          style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}
        >
          {/* Shine effect */}
          <motion.div
            animate={{
              x: [-200, 200],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          
          <span className="flex items-center justify-center gap-2 sm:gap-3 relative z-10 text-sm sm:text-base">
            <motion.div
              animate={{
                rotate: isUnlocking ? 360 : 0,
              }}
              transition={{ duration: 0.8 }}
            >
              <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            {isUnlocking ? 'Unlocking...' : 'Unlock Celebration'}
          </span>
        </motion.button>
      </form>
      
      {isShaking && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-xs sm:text-sm text-red-500 text-center mt-3 sm:mt-4 flex items-center justify-center gap-2"
          style={{ fontFamily: 'Newsreader, serif' }}
        >
          <span>✨</span>
          Oops! Try again...
          <span>✨</span>
        </motion.p>
      )}
    </motion.div>
  );
}
