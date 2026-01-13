import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

interface AnamorphicNavigationProps {
  onModuleSelect: (module: 'about' | 'projects' | 'skills') => void;
}

const AnamorphicNavigation = ({ onModuleSelect }: AnamorphicNavigationProps) => {
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [warpIntensity, setWarpIntensity] = useState(0);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isSpacePressed) {
        e.preventDefault();
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpacePressed(false);
        setIsDragging(false);
        setDragPosition({ x: 0, y: 0 });
        setWarpIntensity(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isSpacePressed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSpacePressed) {
      setIsDragging(true);
      setDragPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isSpacePressed) {
      const deltaX = e.clientX - dragPosition.x;
      const deltaY = e.clientY - dragPosition.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      setWarpIntensity(Math.min(distance / 10, 50));
      setDragPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleModuleClick = (module: 'about' | 'projects' | 'skills') => {
    if (isSpacePressed && warpIntensity > 20) {
      onModuleSelect(module);
      setWarpIntensity(0);
      setIsDragging(false);
    }
  };

  const modules = [
    { id: 'about', name: 'ABOUT', color: 'primary', icon: '👤', position: { x: 20, y: 40 } },
    { id: 'projects', name: 'PROJECTS', color: 'secondary', icon: '📦', position: { x: 50, y: 30 } },
    { id: 'skills', name: 'SKILLS', color: 'accent', icon: '⚡', position: { x: 80, y: 45 } },
  ];

  return (
    <>
      {isSpacePressed && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm"
            style={{
              opacity: warpIntensity / 50,
              transition: 'opacity 0.1s ease-out',
            }}
          />
          
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-8">
            {[...Array(64)].map((_, i) => (
              <div
                key={i}
                className="border border-primary/20 rounded-lg transition-all duration-200"
                style={{
                  transform: `
                    scale(${1 + warpIntensity / 100})
                    rotateX(${warpIntensity * (Math.random() - 0.5)}deg)
                    rotateY(${warpIntensity * (Math.random() - 0.5)}deg)
                  `,
                  opacity: 0.3 + warpIntensity / 100,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 z-50 pointer-events-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{ pointerEvents: isSpacePressed ? 'auto' : 'none' }}
      >
        {isSpacePressed && (
          <>
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary/80 text-primary-foreground font-orbitron animate-pulse">
                {warpIntensity < 20
                  ? 'Тяните курсором для искажения пространства...'
                  : 'Кликните на модуль для активации!'}
              </Badge>
            </div>

            {modules.map((module) => (
              <div
                key={module.id}
                className={`absolute transition-all duration-300 pointer-events-auto cursor-pointer ${
                  hoveredModule === module.id ? 'scale-110' : ''
                }`}
                style={{
                  left: `${module.position.x}%`,
                  top: `${module.position.y}%`,
                  transform: `
                    translate(-50%, -50%)
                    perspective(1000px)
                    rotateX(${warpIntensity * 2}deg)
                    rotateY(${warpIntensity * 3}deg)
                    scale(${1 + warpIntensity / 50})
                  `,
                  filter: `hue-rotate(${warpIntensity * 2}deg)`,
                }}
                onClick={() => handleModuleClick(module.id as 'about' | 'projects' | 'skills')}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <div
                  className={`glass p-6 rounded-2xl min-w-[200px] ${
                    warpIntensity > 20 ? 'glow-blue' : ''
                  }`}
                  style={{
                    backdropFilter: `blur(${8 + warpIntensity / 5}px)`,
                  }}
                >
                  <div className="text-center space-y-2">
                    <div
                      className="text-4xl animate-float"
                      style={{ animationDelay: `${module.position.x / 100}s` }}
                    >
                      {module.icon}
                    </div>
                    <h3 className="font-orbitron font-bold text-lg">{module.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      {warpIntensity < 20 ? 'Недостаточно искажения' : 'Готов к активации'}
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -inset-4 rounded-3xl opacity-0 transition-opacity duration-300"
                  style={{
                    opacity: warpIntensity > 20 ? 0.5 : 0,
                    background: `radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent)`,
                    filter: 'blur(20px)',
                  }}
                />
              </div>
            ))}
          </>
        )}
      </div>

      {!isSpacePressed && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 animate-fade-in">
          <Badge
            variant="outline"
            className="bg-background/80 backdrop-blur-sm border-primary/50 text-sm px-6 py-2 font-mono"
          >
            Нажмите <kbd className="px-2 py-1 mx-1 bg-primary/20 rounded text-primary font-bold">SPACE</kbd> для навигации через анаморфозы
          </Badge>
        </div>
      )}
    </>
  );
};

export default AnamorphicNavigation;
