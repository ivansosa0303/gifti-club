import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const GiftiIsotype: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-9 h-9',
  color = '#E06A55'
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle badge */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="6" />
      {/* Minimalist ribbon "G" with top gift loops */}
      <path
        d="M 50 28 C 42 16, 26 22, 34 34 C 42 42, 52 38, 52 38"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 50 28 C 58 16, 74 22, 66 34 C 58 42, 48 38, 48 38"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Monogram G body */}
      <path
        d="M 68 45 C 64 36, 52 34, 40 38 C 28 44, 24 60, 32 72 C 40 82, 58 84, 68 76 C 74 71, 74 62, 74 58 L 50 58"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const GiftiLogo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-[#0B1B3D]' : 'text-white';
  const accentColor = '#E06A55';
  const taglineColor = isDark ? 'text-[#6C757D]' : 'text-slate-300';

  return (
    <div className="flex items-center gap-2.5 select-none group cursor-pointer">
      <div className="relative transform group-hover:scale-105 transition-transform duration-300">
        <GiftiIsotype
          className={size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'}
          color={accentColor}
        />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#38FFD0] rounded-full ring-2 ring-white animate-pulse" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight">
          <span className={`font-extrabold ${textColor} ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
          } font-['Inter',sans-serif]`}>
            Gifti
          </span>
          <span className={`font-semibold ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'} text-[#E06A55] ml-0.5`}>
            Club
          </span>
        </div>
        {showTagline && (
          <span className={`text-[9px] uppercase tracking-[0.22em] font-bold ${taglineColor} -mt-0.5`}>
            Regalos que hablan
          </span>
        )}
      </div>
    </div>
  );
};
