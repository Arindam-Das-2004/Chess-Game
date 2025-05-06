import React from 'react';
import { motion } from 'framer-motion';
import ChessBoard from './ChessBoard';

interface StaticHeroBannerProps {
  className?: string;
}

const StaticHeroBanner: React.FC<StaticHeroBannerProps> = ({
  className = ''
}) => {
  return (
    <div
      className={`relative w-full h-[50vh] md:h-[70vh] overflow-hidden ${className}`}
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

      {/* Static Chess Board Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-xl blur-xl opacity-50"></div>
          <div className="relative">
            <ChessBoard size="large" theme="blue" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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

export default StaticHeroBanner;
