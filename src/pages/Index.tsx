import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AIAssistant from '@/components/AIAssistant';
import AnamorphicNavigation from '@/components/AnamorphicNavigation';

type Module = 'about' | 'projects' | 'skills' | null;

const Index = () => {
  const [activeModule, setActiveModule] = useState<Module>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  };

  const projects = [
    { title: 'Neural Navigator', tech: ['AI', 'Python', 'TensorFlow'], status: 'Active' },
    { title: 'Quantum Sync', tech: ['React', 'WebGL', 'TypeScript'], status: 'Beta' },
    { title: 'Stellar API', tech: ['Node.js', 'PostgreSQL', 'GraphQL'], status: 'Live' },
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'Three.js', 'TypeScript', 'Tailwind'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'WebSockets'] },
    { category: 'Tools', items: ['Git', 'Docker', 'Figma', 'Blender'] },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] relative overflow-hidden font-mono"
      onMouseMove={handleMouseMove}
    >
      <AIAssistant />
      <AnamorphicNavigation onModuleSelect={setActiveModule} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(-50%, 0) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 border-2 border-primary/30 rounded-lg animate-rotate-slow" />
          <div
            className="absolute inset-8 border-2 border-secondary/30 rounded-lg animate-rotate-slow"
            style={{ animationDirection: 'reverse', animationDuration: '15s' }}
          />
          <div className="absolute inset-16 border-2 border-accent/30 rounded-lg animate-pulse-glow" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/50 text-sm px-4 py-1 font-orbitron">
              NEXUS STATION ONLINE
            </Badge>
          </div>
          <h1 className="text-6xl font-bold mb-4 font-orbitron bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            NEXUS
          </h1>
          <p className="text-muted-foreground text-lg">
            Interactive Space Station • Portfolio Interface v2.0
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card
            className={`glass p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:glow-blue ${
              activeModule === 'about' ? 'glow-blue scale-105' : ''
            }`}
            onClick={() => setActiveModule(activeModule === 'about' ? null : 'about')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="User" className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron">ABOUT</h3>
                <p className="text-xs text-muted-foreground">Module A-1</p>
              </div>
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                activeModule === 'about' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-4 border-t border-primary/20 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Full-stack developer specializing in interactive web experiences.
                </p>
                <p className="text-sm text-muted-foreground">
                  Creating futuristic interfaces at the intersection of design and technology.
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline" className="text-xs">5+ Years</Badge>
                  <Badge variant="outline" className="text-xs">Remote</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className={`glass p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:glow-purple ${
              activeModule === 'projects' ? 'glow-purple scale-105' : ''
            }`}
            onClick={() => setActiveModule(activeModule === 'projects' ? null : 'projects')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Icon name="Boxes" className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron">PROJECTS</h3>
                <p className="text-xs text-muted-foreground">Module P-7</p>
              </div>
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                activeModule === 'projects' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-4 border-t border-secondary/20 space-y-3">
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-200 hover:translate-x-1"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-sm">{project.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          project.status === 'Live'
                            ? 'border-green-500 text-green-500'
                            : project.status === 'Active'
                            ? 'border-primary text-primary'
                            : 'border-secondary text-secondary'
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card
            className={`glass p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:glow-pink ${
              activeModule === 'skills' ? 'glow-pink scale-105' : ''
            }`}
            onClick={() => setActiveModule(activeModule === 'skills' ? null : 'skills')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Icon name="Cpu" className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-orbitron">SKILLS</h3>
                <p className="text-xs text-muted-foreground">Module S-3</p>
              </div>
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                activeModule === 'skills' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-4 border-t border-accent/20 space-y-3">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs font-bold text-muted-foreground mb-2">
                      {skill.category}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <footer className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon name="Github" size={20} />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
            >
              <Icon name="Linkedin" size={20} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Icon name="Mail" size={20} />
              <span className="text-sm">Contact</span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;