import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

function App() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const [heartSize, setHeartSize] = useState(65);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          setMousePos({ x, y });
          setIsHovering(true);
        } else {
          setIsHovering(false);
          setMousePos({ x: -1000, y: -1000 });
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          setMousePos({ x, y });
          setIsHovering(true);
        }
      }
    };

    const handleTouchEnd = () => {
      setIsHovering(false);
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] text-pink-300 opacity-40 animate-float-1">
          <Heart size={20} fill="currentColor" />
        </div>
        <div className="absolute top-[25%] right-[20%] text-purple-300 opacity-40 animate-float-2">
          <Heart size={16} fill="currentColor" />
        </div>
        <div className="absolute bottom-[30%] left-[10%] text-blue-300 opacity-40 animate-float-3">
          <Heart size={18} fill="currentColor" />
        </div>
        <div className="absolute top-[60%] right-[15%] text-pink-300 opacity-40 animate-float-1">
          <Heart size={22} fill="currentColor" />
        </div>
        <div className="absolute bottom-[15%] left-[25%] text-purple-300 opacity-40 animate-float-2">
          <Heart size={14} fill="currentColor" />
        </div>
        <div className="absolute top-[40%] left-[5%] text-blue-300 opacity-40 animate-float-3">
          <Heart size={16} fill="currentColor" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-8 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-pink-400 mb-4 leading-relaxed">
            Derrière chaque grand Pokémon…
            <br />
            se cache un pokemon encore plus mignon
            <span className="inline-block ml-2 text-pink-300">💖</span>
          </h1>
          <p className="hidden md:block text-pink-300 text-sm font-medium">
            Passe ta souris sur Ronflex 💗
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full max-w-md md:max-w-lg aspect-square rounded-3xl shadow-2xl overflow-hidden"
          style={{ cursor: isHovering ? 'none' : 'default' }}
        >
          <svg width="0" height="0" className="absolute">
            <defs>
              <mask id="revealMask">
                <rect width="100%" height="100%" fill="white" />
                <g transform={`translate(${mousePos.x}, ${mousePos.y})`}>
                  <path
                    d={`M 0,${-heartSize} C ${-heartSize * 0.77},${-heartSize * 1.77} ${-heartSize * 1.54},${-heartSize * 1.54} ${-heartSize * 1.54},${-heartSize * 0.54} C ${-heartSize * 1.54},${heartSize * 0.31} ${-heartSize * 0.69},${heartSize * 1.31} 0,${heartSize * 2.08} C ${heartSize * 0.69},${heartSize * 1.31} ${heartSize * 1.54},${heartSize * 0.31} ${heartSize * 1.54},${-heartSize * 0.54} C ${heartSize * 1.54},${-heartSize * 1.54} ${heartSize * 0.77},${-heartSize * 1.77} 0,${-heartSize} Z`}
                    fill="black"
                  />
                </g>
              </mask>
            </defs>
          </svg>

          <img
            src="https://i.etsystatic.com/25398767/r/il/2c9671/3292998242/il_794xN.3292998242_n94b.jpg"
            alt="Ronflex"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 1 }}
          />

          <img
            src="https://i.pinimg.com/736x/45/40/cb/4540cb263ddfe2882a25a1596a81c1d5.jpg"
            alt="Mimikyu"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              zIndex: 2,
              mask: 'url(#revealMask)',
              WebkitMask: 'url(#revealMask)',
            }}
          />
        </div>

        <div className="mt-12 w-full max-w-md md:max-w-lg">
          <div className="flex items-center gap-4">
            <span className="text-pink-400 text-sm font-medium">Taille:</span>
            <input
              type="range"
              min="30"
              max="150"
              value={heartSize}
              onChange={(e) => setHeartSize(Number(e.target.value))}
              className="flex-1 h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-400"
            />
            <span className="text-pink-300 text-sm w-8">
              {heartSize}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
