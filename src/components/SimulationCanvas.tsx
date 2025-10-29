import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { airports } from "@/lib/mockData";
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SimulationCanvasProps {
  isSimulating: boolean;
  disruptedAirports: string[];
  onAirportClick?: (code: string) => void;
}

export function SimulationCanvas({ isSimulating, disruptedAirports, onAirportClick }: SimulationCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [hoveredAirport, setHoveredAirport] = useState<string | null>(null);
  const [delayIntensity, setDelayIntensity] = useState<Record<string, number>>({});
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simulation effect
  useEffect(() => {
    if (!isSimulating) {
      setDelayIntensity({});
      return;
    }

    const interval = setInterval(() => {
      const newIntensity: Record<string, number> = {};
      
      // Spread delays from disrupted airports
      disruptedAirports.forEach(airport => {
        newIntensity[airport] = 1;
        
        // Find connected airports (simplified - using distance)
        airports.forEach(other => {
          if (other.code === airport) return;
          
          const distance = Math.sqrt(
            Math.pow(airports.find(a => a.code === airport)!.lat - other.lat, 2) +
            Math.pow(airports.find(a => a.code === airport)!.lng - other.lng, 2)
          );
          
          if (distance < 15) {
            newIntensity[other.code] = Math.max(newIntensity[other.code] || 0, 0.7);
          } else if (distance < 30) {
            newIntensity[other.code] = Math.max(newIntensity[other.code] || 0, 0.4);
          }
        });
      });
      
      setDelayIntensity(newIntensity);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating, disruptedAirports]);

  const getAirportColor = (code: string) => {
    const intensity = delayIntensity[code] || 0;
    if (intensity >= 0.8) return "fill-delay-high stroke-delay-high";
    if (intensity >= 0.5) return "fill-delay-medium stroke-delay-medium";
    if (intensity >= 0.2) return "fill-delay-low stroke-delay-low";
    return "fill-delay-none stroke-delay-none";
  };

  const getNodeSize = (traffic: number) => {
    return Math.max(4, Math.min(12, traffic / 8000));
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className={`relative bg-card rounded-lg border overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'h-full'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: zoom > 1 && isDragging ? 'grabbing' : zoom > 1 ? 'grab' : 'default' }}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button size="icon" variant="secondary" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" onClick={handleReset} title="Reset view">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" onClick={toggleFullscreen} title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-card/90 backdrop-blur-sm border rounded-lg p-3 space-y-2">
        <p className="text-xs font-semibold">Delay Status</p>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-delay-none" />
            <span>None</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-delay-low" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-delay-medium" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-delay-high" />
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1200 600"
          className="w-full h-full transition-transform duration-200"
          style={{ 
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center'
          }}
        >
          {/* Routes (simplified) */}
          <g opacity="0.2">
            {airports.slice(0, 10).map((origin, i) =>
              airports.slice(0, 10).map((dest, j) => {
                if (i >= j) return null;
                return (
                  <line
                    key={`${origin.code}-${dest.code}`}
                    x1={(origin.lng + 130) * 5}
                    y1={(50 - origin.lat) * 10}
                    x2={(dest.lng + 130) * 5}
                    y2={(50 - dest.lat) * 10}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-muted-foreground"
                  />
                );
              })
            )}
          </g>

          {/* Airports */}
          {airports.map((airport) => {
            const x = (airport.lng + 130) * 5;
            const y = (50 - airport.lat) * 10;
            const size = getNodeSize(airport.trafficVolume);
            const intensity = delayIntensity[airport.code] || 0;

            return (
              <g
                key={airport.code}
                onMouseEnter={() => setHoveredAirport(airport.code)}
                onMouseLeave={() => setHoveredAirport(null)}
                onClick={() => onAirportClick?.(airport.code)}
                className="cursor-pointer"
              >
                {/* Pulse animation for disrupted airports */}
                {intensity > 0.5 && isSimulating && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={size}
                    className="fill-delay-high opacity-50"
                    animate={{
                      r: [size, size * 3, size],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                
                {/* Main node */}
                <circle
                  cx={x}
                  cy={y}
                  r={size}
                  className={cn(
                    getAirportColor(airport.code),
                    "transition-all duration-300 hover:stroke-primary hover:stroke-2"
                  )}
                  strokeWidth={hoveredAirport === airport.code ? 2 : 1}
                />
                
                {/* Label */}
                <text
                  x={x}
                  y={y - size - 4}
                  textAnchor="middle"
                  className="text-[8px] font-semibold fill-foreground pointer-events-none"
                >
                  {airport.code}
                </text>
                
                {/* Tooltip */}
                {hoveredAirport === airport.code && (
                  <g>
                    <rect
                      x={x + size + 5}
                      y={y - 20}
                      width="120"
                      height="40"
                      rx="4"
                      className="fill-popover stroke-border"
                      strokeWidth="1"
                    />
                    <text
                      x={x + size + 10}
                      y={y - 10}
                      className="text-[8px] font-semibold fill-foreground"
                    >
                      {airport.name}
                    </text>
                    <text
                      x={x + size + 10}
                      y={y}
                      className="text-[7px] fill-muted-foreground"
                    >
                      Avg Delay: {airport.avgDelay}min
                    </text>
                    <text
                      x={x + size + 10}
                      y={y + 8}
                      className="text-[7px] fill-muted-foreground"
                    >
                      Traffic: {(airport.trafficVolume / 1000).toFixed(0)}k
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
