import { useEffect, useRef, useMemo } from 'react';

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const fullHex = h.length === 3 ? h.split('').map(s => s + s).join('') : h.padEnd(6, '0');
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  return { r, g, b };
};

const SpotlightCard = ({ 
  children, 
  className = '', 
  spotlightColor = "#77B103", // Your primary green
  alpha = 0.15,
  radius = 350 
}) => {
  const divRef = useRef(null);
  const { r, g, b } = useMemo(() => hexToRgb(spotlightColor), [spotlightColor]);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const updatePosition = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
      el.style.setProperty('--opacity', '1');
    };

    const handleMouseMove = (e) => updatePosition(e.clientX, e.clientY);
    const handleLeave = () => el.style.setProperty('--opacity', '0');

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div 
      ref={divRef} 
      className={`relative rounded-2xl  overflow-hidden ${className}`}
      style={{
        '--mouse-x': '-100%',
        '--mouse-y': '-100%',
        '--opacity': '0',
      }}
    >
      {/* 1. The Border Highlight Layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: 'var(--opacity)',
          background: `radial-gradient(${radius / 1.5}px circle at var(--mouse-x) var(--mouse-y), rgba(${r}, ${g}, ${b}, 0.8), transparent 80%)`,
        }}
      />

      {/* 2. The Internal Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
        style={{
          opacity: 'var(--opacity)',
          background: `radial-gradient(${radius}px circle at var(--mouse-x) var(--mouse-y), rgba(${r}, ${g}, ${b}, ${alpha}), transparent 80%)`,
        }}
      />
      
      {/* 3. The Inner Background (Masks the center of the border glow) */}
      <div className="relative z-20 h-full w-full rounded-[15px]  ">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;