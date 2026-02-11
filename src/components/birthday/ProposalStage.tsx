import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, PartyPopper } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProposalStageProps {
    recipientName?: string;
}

interface TapEffect {
    id: number;
    x: number;
    y: number;
}

export function ProposalStage({ recipientName = "My Love" }: ProposalStageProps) {
    const [answered, setAnswered] = useState(false);
    const [tapEffects, setTapEffects] = useState<TapEffect[]>([]);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [noAttempts, setNoAttempts] = useState(0);
    const [showAutoMessage, setShowAutoMessage] = useState(false);

    const handleTap = (e: React.MouseEvent) => {
        const newTap: TapEffect = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
        };
        setTapEffects(prev => [...prev, newTap]);

        // Remove after animation
        setTimeout(() => {
            setTapEffects(prev => prev.filter(tap => tap.id !== newTap.id));
        }, 1000);
    };

    const handleYes = () => {
        setAnswered(true);
    };

    const handleNoHover = () => {
        const newAttempts = noAttempts + 1;
        setNoAttempts(newAttempts);

        if (newAttempts >= 3) {
            // After 3 attempts, show auto message
            setShowAutoMessage(true);
        } else {
            // Move "No" button to random position
            const randomX = Math.random() * 200 - 100;
            const randomY = Math.random() * 200 - 100;
            setNoButtonPosition({ x: randomX, y: randomY });
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 relative overflow-visible cursor-pointer"
            onClick={handleTap}
        >
            {/* Animated gradient background */}
            <motion.div
                animate={{
                    background: [
                        'linear-gradient(135deg, #FDF2F4 0%, #F4E4E6 50%, #FFF5F7 100%)',
                        'linear-gradient(225deg, #FFF5F7 0%, #FDF2F4 50%, #F4E4E6 100%)',
                        'linear-gradient(315deg, #F4E4E6 0%, #FFF5F7 50%, #FDF2F4 100%)',
                        'linear-gradient(135deg, #FDF2F4 0%, #F4E4E6 50%, #FFF5F7 100%)',
                    ],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute inset-0 -z-10"
            />

            {/* Floating hearts background */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`bg-heart-${i}`}
                    animate={{
                        y: ['100vh', '-20vh'],
                        x: [0, Math.sin(i) * 50, 0],
                        rotate: [0, 360],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: 8 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'linear',
                    }}
                    className="absolute"
                    style={{
                        left: `${5 + i * 4.5}%`,
                    }}
                >
                    <Heart className="w-6 h-6 text-rose/40 fill-rose/20" />
                </motion.div>
            ))}

            {/* Tap effect hearts */}
            <AnimatePresence>
                {tapEffects.map(tap => (
                    <motion.div
                        key={tap.id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            scale: [0, 1.5, 2],
                            opacity: [1, 0.8, 0],
                            y: [0, -100],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute pointer-events-none z-50"
                        style={{
                            left: tap.x,
                            top: tap.y,
                        }}
                    >
                        <Heart className="w-8 h-8 text-rose fill-rose" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Main content */}
            <AnimatePresence mode="wait">
                {!answered ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-center relative z-10 max-w-4xl"
                    >
                        {/* Giant animated heart */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                            className="mb-12 flex justify-center"
                        >
                            <div className="relative">
                                {/* Pulsing glow rings */}
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: [1, 2, 3],
                                            opacity: [0.6, 0.3, 0],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: i * 1,
                                        }}
                                        className="absolute inset-0 blur-2xl bg-rose/40 rounded-full"
                                    />
                                ))}
                                <Heart className="w-32 h-32 sm:w-40 sm:h-40 text-rose fill-rose relative z-10 drop-shadow-2xl" />

                                {/* Orbiting sparkles */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={`orbit-${i}`}
                                        animate={{
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'linear',
                                            delay: i * 0.5,
                                        }}
                                        className="absolute"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            transformOrigin: `0 ${80 + i * 10}px`,
                                        }}
                                    >
                                        <Sparkles className="w-5 h-5 text-gold" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Question text */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="px-4"
                        >
                            <h1
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-rose via-rose to-gold bg-clip-text text-transparent leading-relaxed pb-2"
                                style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, WebkitBoxDecorationBreak: 'clone' }}
                            >
                                Will you be my
                            </h1>
                            <motion.h2
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-12 text-rose leading-relaxed pb-2 pr-4"
                                style={{ fontFamily: 'Fraunces, serif', fontWeight: 800 }}
                            >
                                Valentine? 💕
                            </motion.h2>
                        </motion.div>

                        {/* Conditional rendering based on attempts */}
                        {showAutoMessage ? (
                            /* Auto message after 3 No attempts */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="mt-16 text-center"
                            >
                                <motion.h2
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="text-4xl sm:text-5xl md:text-6xl text-rose mb-8"
                                    style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}
                                >
                                    You will always be my Valentine 💕
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xl sm:text-2xl text-charcoal/70 mb-4"
                                    style={{ fontFamily: 'Newsreader, serif' }}
                                >
                                    No need to answer... 😊
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-lg sm:text-xl text-charcoal/60"
                                    style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}
                                >
                                    Just screenshot this! 📸
                                </motion.p>
                            </motion.div>
                        ) : (
                            /* Buttons */
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16"
                            >
                                {/* Yes button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleYes();
                                    }}
                                    className="relative group"
                                >
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.5, 0.8, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                        className="absolute inset-0 bg-rose/40 rounded-full blur-xl"
                                    />
                                    <div className="relative bg-gradient-to-r from-rose to-rose/90 text-white px-16 py-6 rounded-full shadow-2xl border-4 border-white/70 text-2xl sm:text-3xl font-bold overflow-visible"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                        <span className="inline-block">Yes! 💖</span>
                                    </div>
                                </motion.button>

                                {/* No button (runs away) */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onMouseEnter={handleNoHover}
                                    onClick={(e) => e.stopPropagation()}
                                    animate={{
                                        x: noButtonPosition.x,
                                        y: noButtonPosition.y,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 px-12 py-5 rounded-full shadow-lg border-2 border-gray-400/50 text-xl sm:text-2xl font-semibold"
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                >
                                    No 😢
                                </motion.button>
                            </motion.div>
                        )}


                        {/* Hint text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-12 text-charcoal/50 italic text-lg"
                            style={{ fontFamily: 'Newsreader, serif' }}
                        >
                            (Tap anywhere to spread some love ✨)
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="celebration"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="text-center relative z-10"
                    >
                        {/* Confetti explosion */}
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={`confetti-${i}`}
                                initial={{
                                    x: 0,
                                    y: 0,
                                    scale: 0,
                                    opacity: 1,
                                }}
                                animate={{
                                    x: Math.cos(i * 7.2) * (200 + Math.random() * 300),
                                    y: Math.sin(i * 7.2) * (200 + Math.random() * 300) - 100,
                                    scale: [0, 1, 0.5],
                                    opacity: [1, 1, 0],
                                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                                }}
                                transition={{
                                    duration: 2 + Math.random(),
                                    ease: 'easeOut',
                                }}
                                className="absolute left-1/2 top-1/2"
                            >
                                {i % 3 === 0 ? (
                                    <Heart className="w-6 h-6 text-rose fill-rose" />
                                ) : i % 3 === 1 ? (
                                    <Star className="w-5 h-5 text-gold fill-gold" />
                                ) : (
                                    <Sparkles className="w-5 h-5 text-rose" />
                                )}
                            </motion.div>
                        ))}

                        {/* Success message */}
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5,
                            }}
                        >
                            <PartyPopper className="w-32 h-32 text-gold mx-auto mb-8" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl sm:text-7xl md:text-8xl mb-6 bg-gradient-to-r from-rose via-gold to-rose bg-clip-text text-transparent"
                            style={{ fontFamily: 'Fraunces, serif', fontWeight: 800 }}
                        >
                            Yay! 🎉
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-3xl sm:text-4xl text-charcoal/80 mb-8"
                            style={{ fontFamily: 'Newsreader, serif' }}
                        >
                            I'm the luckiest person in the world! ❤️
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="bg-gradient-to-br from-blush/60 to-cream/80 rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto border-2 border-gold/40 shadow-2xl"
                        >
                            <p className="text-xl sm:text-2xl text-charcoal/80 leading-relaxed"
                                style={{ fontFamily: 'Newsreader, serif' }}
                            >
                                Happy Valentine's Day, {recipientName}! 💕<br />
                                You've made this the most special day ever.
                            </p>
                        </motion.div>

                        {/* Continuous floating hearts */}
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={`float-${i}`}
                                animate={{
                                    y: [0, -1000],
                                    x: [0, Math.sin(i) * 100],
                                    opacity: [0, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: 'linear',
                                }}
                                className="absolute"
                                style={{
                                    left: `${10 + i * 9}%`,
                                    bottom: -50,
                                }}
                            >
                                <Heart className="w-8 h-8 text-rose fill-rose" />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
