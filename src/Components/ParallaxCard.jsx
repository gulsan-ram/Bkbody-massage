// import React, { useState, useRef, useEffect, useMemo } from 'react';

// const ParallaxCard = ({ dataImage, header, content }) => {
//   const cardRef = useRef(null);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);
//   const mouseLeaveDelay = useRef(null);

//   // Initialize dimensions on mount
//   useEffect(() => {
//     if (cardRef.current) {
//       setDimensions({
//         width: cardRef.current.offsetWidth,
//         height: cardRef.current.offsetHeight,
//       });
//     }
//   }, []);

//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;
    
//     // Calculate mouse position relative to center of card
//     const rect = cardRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left - dimensions.width / 2;
//     const y = e.clientY - rect.top - dimensions.height / 2;
    
//     setMousePos({ x, y });
    
//     // Don't stop propagation - let parent components (like SpotlightCard) also receive the event
//   };

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//     if (mouseLeaveDelay.current) clearTimeout(mouseLeaveDelay.current);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     // Smooth reset to center after 1 second
//     mouseLeaveDelay.current = setTimeout(() => {
//       setMousePos({ x: 0, y: 0 });
//     }, 1000);
//   };

//   // Computed Values (equivalent to Vue computed)
//   const mousePX = mousePos.x / dimensions.width;
//   const mousePY = mousePos.y / dimensions.height;

//   const cardStyle = {
//     transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
//   };

//   const cardBgStyle = {
//     transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
//     backgroundImage: `url(${dataImage})`,
//   };

//   return (
//     <div
//       className="card-wrap m-0 cursor-pointer w-full h-full"
//       onMouseMove={handleMouseMove}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       ref={cardRef}
//       style={{ transform: 'perspective(1000px)', transformStyle: 'preserve-3d' }}
//     >
//       <div 
//         className="card relative w-full h-full overflow-hidden rounded-2xl transition-all"
//         style={{
//           transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
//           minHeight: '320px',
//           backgroundColor: 'rgba(255, 255, 255, 0.95)',
//           boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 30px 0, inset rgba(255, 255, 255, 0.8) 0 0 0 1px',
//           transition: '0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)'
//         }}
//       >
//         <div 
//           className="card-bg absolute pointer-events-none"
//           style={{
//             opacity: 0.3,
//             top: '-20px',
//             left: '-20px',
//             width: 'calc(100% + 40px)',
//             height: 'calc(100% + 40px)',
//             backgroundImage: `url(${dataImage})`,
//             backgroundRepeat: 'no-repeat',
//             backgroundPosition: 'center',
//             backgroundSize: 'cover',
//             transition: '0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)'
//           }}
//         />
//         <div className="card-info relative flex flex-col justify-center z-10 w-full h-full box-border"
//           style={{
//             color: '#333',
//             transition: '0.4s cubic-bezier(0.215, 0.61, 0.355, 1)'
//           }}
//         >
//           {header}
//           {content}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParallaxCard;

// // Add hover state styles
// if (typeof document !== 'undefined' && !document.getElementById('parallax-card-styles')) {
//   const style = document.createElement('style');
//   style.id = 'parallax-card-styles';
//   style.textContent = `
//     .card-wrap:hover .card {
//       box-shadow: 
//         rgba(119, 177, 3, 0.3) 0 30px 60px 0,
//         rgba(119, 177, 3, 0.1) 0 0 40px 5px,
//         inset rgba(255, 255, 255, 0.9) 0 0 0 1px !important;
//     }

//     .card-wrap:hover .card-bg {
//       opacity: 0.5;
//     }

//     .card-wrap:hover .card-info {
//       transform: scale(1.02);
//     }

//     .card-wrap:hover .card-info p {
//       opacity: 1;
//     }
//   `;
//   document.head.appendChild(style);
// }

import React, { useState, useRef, useEffect } from 'react';

const ParallaxCard = ({
  header,
  content,
  dataImage,
  tilt = 15,
  mobileTilt = 6,
  depth = 50,
  mobileDepth = 30,
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const mouseLeaveDelay = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      setDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: coarse)');
    const handleChange = (event) => setIsCoarsePointer(event.matches);
    setIsCoarsePointer(media.matches);
    if (media.addEventListener) {
      media.addEventListener('change', handleChange);
    } else {
      media.addListener(handleChange);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left - dimensions.width / 2,
      y: e.clientY - rect.top - dimensions.height / 2,
    });
  };

  const handleMouseEnter = () => {
    if (mouseLeaveDelay.current) clearTimeout(mouseLeaveDelay.current);
  };

  const handleMouseLeave = () => {
    mouseLeaveDelay.current = setTimeout(() => {
      setMousePos({ x: 0, y: 0 });
    }, 500);
  };

  const mousePX = mousePos.x / (dimensions.width || 1);
  const mousePY = mousePos.y / (dimensions.height || 1);
  const tiltAmount = isCoarsePointer ? mobileTilt : tilt;
  const depthAmount = isCoarsePointer ? mobileDepth : depth;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full rounded-2xl bg-white/95 transition-transform duration-200 ease-out py-10"
        style={{
          transform: `rotateY(${mousePX * tiltAmount}deg) rotateX(${mousePY * -tiltAmount}deg)`,
          transformStyle: 'preserve-3d',
          minHeight: '350px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
        }}
      >
        {/* Depth Content */}
        <div style={{ transform: `translateZ(${depthAmount}px)` }} className="h-full flex flex-col items-center">
          {header}
          {content}
        </div>
      </div>
    </div>
  );
};

export default ParallaxCard;