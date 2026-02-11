import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Gift, Star, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { TeaserStage } from './TeaserStage';
import { ProposalStage } from './ProposalStage';

interface UnlockedContentProps {
  recipientName: string;
  personalMessage: string;
  photoGallery?: string[];
  audioUrl?: string;
}

export function UnlockedContent({ recipientName, personalMessage, audioUrl }: UnlockedContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState<'birthday' | 'teaser' | 'proposal'>('birthday');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const messageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const galleryY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Auto-play audio when component mounts
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Audio autoplay prevented:', error);
      });
    }
  }, [audioUrl]);

  // Background photos - using your uploaded photos from /BG folder
  const photos = [
    '/BG/bg-1.jpg.jpeg',
    '/BG/bg-2.jpg.jpeg',
    '/BG/bg-3.jpg.jpg',
    '/BG/bg-4.jpg.jpeg',
    '/BG/bg-5.jpg.jpeg',
    '/BG/bg-6.jpg.jpeg',
    '/BG/bg-7.jpg.jpeg',
    '/BG/bg-8.jpg.jpeg',
    '/BG/bg-9.jpg.jpeg',
    '/BG/bg-10.jpg.jpeg',
  ];

  // Custom captions for gallery photos - EDIT THESE to personalize!
  const galleryCaptions = [
    'First Date 💕',
    'Meeting Your Parents',
    'First Movie Date 🎬',
    'Meeting My Mom',
    'Before You Start Working',
    'My Birthday ❤️',
  ];

  // Collage layout: random positions, sizes, and rotations for organic feel
  const collagePositions = [
    { left: '5%', top: '10%', width: '200px', height: '250px', rotate: -8 },
    { left: '25%', top: '5%', width: '180px', height: '180px', rotate: 5 },
    { left: '45%', top: '15%', width: '220px', height: '180px', rotate: -3 },
    { left: '70%', top: '8%', width: '190px', height: '240px', rotate: 7 },
    { left: '10%', top: '45%', width: '210px', height: '190px', rotate: 4 },
    { left: '35%', top: '50%', width: '180px', height: '230px', rotate: -6 },
    { left: '60%', top: '55%', width: '200px', height: '200px', rotate: 3 },
    { left: '15%', top: '80%', width: '190px', height: '180px', rotate: -5 },
    { left: '45%', top: '85%', width: '220px', height: '200px', rotate: 8 },
    { left: '75%', top: '82%', width: '180px', height: '220px', rotate: -4 },
  ];

  // Render different stages
  if (stage === 'teaser') {
    return <TeaserStage onContinue={() => setStage('proposal')} />;
  }

  if (stage === 'proposal') {
    return <ProposalStage recipientName={recipientName} />;
  }

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Photo Collage Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* Scattered photo collage */}
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0.35, 0.45, 0.35], // Increased opacity for more visibility
              scale: 1,
              rotate: collagePositions[index].rotate
            }}
            transition={{
              opacity: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.3,
              },
              scale: {
                duration: 0.6,
                delay: index * 0.1
              },
              rotate: {
                duration: 0.6,
                delay: index * 0.1
              }
            }}
            className="absolute rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            style={{
              left: collagePositions[index].left,
              top: collagePositions[index].top,
              width: collagePositions[index].width,
              height: collagePositions[index].height,
            }}
          >
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {/* Gradient overlay for readability - lighter for more photo visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream/75 via-blush/70 to-cream/80 backdrop-blur-[1px]" />
      </div>

      {/* Audio Element */}
      {audioUrl && (
        <audio ref={audioRef} loop>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16"
      >
        {/* Celebration Header with parallax */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20 relative"
        >
          {/* Animated sparkles background */}
          <div className="absolute inset-0 -z-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 15}%`,
                }}
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gold/40" fill="currentColor" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-rose via-rose/80 to-gold/60 mb-6 sm:mb-8 shadow-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-rose mb-4 sm:mb-6"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}
          >
            {['Happy', 'Birthday!'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                className="inline-block mx-2 sm:mx-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-2xl sm:text-3xl text-charcoal/80"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
          >
            {recipientName}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.2, delay: 1 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto mt-6 sm:mt-8"
          />
        </motion.div>

        {/* Personal Message with parallax */}
        <motion.div
          style={{ y: messageY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-br from-blush/60 to-cream/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 mb-12 sm:mb-16 border-2 border-gold/40 shadow-[0_12px_50px_rgba(199,123,127,0.2)] relative overflow-hidden max-w-4xl mx-auto"
        >
          {/* Animated background gradient */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(244, 228, 230, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(244, 228, 230, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(244, 228, 230, 0.4) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 -z-10"
          />

          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-gold/50 rounded-tr-3xl" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-gold/50 rounded-bl-3xl" />

          <motion.div
            className="flex items-center justify-center mb-6 sm:mb-8"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-rose fill-rose drop-shadow-lg" />
          </motion.div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoal/90 leading-relaxed text-center whitespace-pre-line" style={{ fontFamily: 'Newsreader, serif' }}>
            {personalMessage}
          </p>
        </motion.div>

        {/* Photo Gallery with parallax and hover effects */}
        <motion.div
          style={{ y: galleryY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-2xl sm:text-3xl md:text-4xl text-center text-charcoal mb-8 sm:mb-12"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}
          >
            Beautiful Memories
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  delay: 1.3 + index * 0.1,
                  duration: 0.6,
                  type: "spring"
                }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotateZ: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3 }
                }}
                className="aspect-square rounded-3xl bg-gradient-to-br from-blush/40 to-cream/60 border-2 border-gold/30 shadow-[0_6px_30px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden group relative"
              >
                <motion.img
                  src={`/Gallery/gallery-${index}.jpg.${index === 1 || index === 4 ? 'jpg' : 'jpeg'}`}
                  alt={`Memory ${index}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: index === 4 ? 'center 30%' : 'center' }}
                  whileHover={{ scale: 1.1 }}
                />

                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-rose/60 to-transparent flex items-end justify-center p-4"
                >
                  <p className="text-white text-sm font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {galleryCaptions[index - 1]}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NEXT BUTTON - removed 'More surprises' section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStage('teaser')}
            className="relative group"
          >
            {/* Pulsing glow */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-gradient-to-r from-rose/40 via-gold/40 to-rose/40 rounded-full blur-2xl"
            />

            <div className="relative bg-gradient-to-r from-rose via-rose/90 to-gold text-white px-16 py-6 rounded-full shadow-2xl border-4 border-white/70 flex items-center gap-4">
              <span className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Next
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.button>

          {/* Hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="mt-6 text-charcoal/50 italic text-lg"
            style={{ fontFamily: 'Newsreader, serif' }}
          >
            There's something special waiting for you... 💝
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-24 text-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-charcoal/30"
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>
              Scroll to explore
            </p>
            <div className="w-1 h-16 bg-gradient-to-b from-rose/40 to-transparent mx-auto rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
