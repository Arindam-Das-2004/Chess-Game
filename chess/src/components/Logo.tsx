
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const dimensions = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className={`${dimensions[size]} relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-chess-blue to-primary rounded-md transform rotate-3"></div>
      <div className="absolute inset-0 bg-card flex items-center justify-center rounded-md border shadow-sm">
        <span className="text-xl md:text-2xl font-bold text-primary">♞</span>
      </div>
    </div>
  );
};

export default Logo;
