import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTransformBannerProps {
  className?: string;
}

const AnimatedTransformBanner: React.FC<AnimatedTransformBannerProps> = ({
  className = ''
}) => {
  return (
    <div
      className={`relative w-full h-[45vh] md:h-[55vh] overflow-hidden ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/80 to-background"></div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-primary/10"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-secondary/10"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          style={{ top: '60%', right: '15%' }}
        />
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-primary/5"
          animate={{
            x: [0, 40, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
          style={{ bottom: '20%', left: '20%' }}
        />
      </div>

      {/* Animated Chess Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-5xl mx-auto px-4">
          {/* Chess Board Background */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-gray-800/20 to-gray-900/10 rounded-lg -z-10 opacity-30"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [0.95, 1, 0.98, 0.95]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          {/* Chess Pieces Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-4 mt-28 md:mt-36">
            {/* King */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xl md:text-3xl">♔</span>
              </motion.div>
              <motion.p
                className="mt-1 font-medium text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Strategy
              </motion.p>
            </motion.div>

            {/* Queen */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 bg-secondary/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xl md:text-3xl">♕</span>
              </motion.div>
              <motion.p
                className="mt-1 font-medium text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Power
              </motion.p>
            </motion.div>

            {/* Knight */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xl md:text-3xl">♘</span>
              </motion.div>
              <motion.p
                className="mt-1 font-medium text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Tactics
              </motion.p>
            </motion.div>

            {/* Rook */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 bg-secondary/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xl md:text-3xl">♖</span>
              </motion.div>
              <motion.p
                className="mt-1 font-medium text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Defense
              </motion.p>
            </motion.div>

            {/* Bishop */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xl md:text-3xl">♗</span>
              </motion.div>
              <motion.p
                className="mt-1 font-medium text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Vision
              </motion.p>
            </motion.div>

            {/* Pawn */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 bg-secondary/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xl md:text-3xl">♙</span>
              </motion.div>
              <motion.p
                className="mt-1 font-medium text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Progress
              </motion.p>
            </motion.div>
          </div>

          {/* Animated Tagline */}
          <motion.div
            className="text-center mt-2 md:mt-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <p className="mt-2 text-base md:text-lg text-foreground font-medium">Master the game. Master your mind.</p>

            {/* Chess Quote */}
            <motion.div
              className="mt-4 px-6 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-lg shadow-sm max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-sm md:text-base italic text-foreground font-medium">
                "Chess is life in miniature. Chess is a struggle, chess is battles."
              </p>
              <p className="text-xs md:text-sm text-muted-foreground text-right mt-1">— Garry Kasparov</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 mx-auto flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedTransformBanner;
