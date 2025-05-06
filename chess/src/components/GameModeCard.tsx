
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface GameModeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path?: string;
  disabled?: boolean;
  onClick?: () => void;
  bgImage?: string;
  bgColor?: string;
}

const GameModeCard: React.FC<GameModeCardProps> = ({
  title,
  description,
  icon: Icon,
  path,
  disabled = false,
  onClick,
  bgImage,
  bgColor = 'from-primary/10 via-transparent to-secondary/10'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;

    if (path) {
      navigate(path);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={!disabled ? { y: -8, scale: 1.02 } : {}}
    >
      <Card
        className={cn(
          "relative overflow-hidden p-6",
          disabled ? "opacity-70 cursor-not-allowed" : "shadow-sm hover:shadow-lg"
        )}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-50`}></div>

        {/* Background image if provided */}
        {bgImage && (
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
        )}

        {/* Animated decoration */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className="mb-2 p-2 rounded-full w-12 h-12 bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              whileHover={{
                rotate: 360,
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
            >
              <Icon className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-lg font-bold mb-2 text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-sm text-foreground/80 mb-6 flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>

          <motion.div
            whileHover={!disabled ? { scale: 1.03 } : {}}
            whileTap={!disabled ? { scale: 0.97 } : {}}
          >
            <Button
              onClick={handleClick}
              disabled={disabled}
              variant="default"
              className="w-full relative overflow-hidden group"
            >
              <span className="relative z-10">Play Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>
          </motion.div>

          {disabled && (
            <motion.div
              className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                className="bg-background/90 px-3 py-1 rounded-md text-sm font-medium"
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Coming Soon
              </motion.span>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default GameModeCard;
