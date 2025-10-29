import { useEffect, useState } from "react";

const NetworkMap = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Major U.S. hub airports with approximate positions
  const airports = [
    { code: "ATL", x: 650, y: 420, size: 32, delays: 45, status: "high" },
    { code: "ORD", x: 520, y: 250, size: 28, delays: 38, status: "medium" },
    { code: "DFW", x: 460, y: 480, size: 26, delays: 22, status: "low" },
    { code: "DEN", x: 350, y: 320, size: 24, delays: 15, status: "low" },
    { code: "LAX", x: 180, y: 420, size: 28, delays: 31, status: "medium" },
    { code: "JFK", x: 780, y: 260, size: 30, delays: 52, status: "high" },
    { code: "SFO", x: 140, y: 340, size: 24, delays: 18, status: "low" },
    { code: "LAS", x: 200, y: 380, size: 20, delays: 12, status: "none" },
    { code: "SEA", x: 140, y: 180, size: 22, delays: 9, status: "none" },
    { code: "PHX", x: 240, y: 460, size: 22, delays: 14, status: "low" },
    { code: "MIA", x: 720, y: 560, size: 24, delays: 27, status: "medium" },
    { code: "BOS", x: 810, y: 240, size: 22, delays: 19, status: "low" },
  ];

  const connections = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 5 },
    { from: 1, to: 3 }, { from: 1, to: 5 }, { from: 2, to: 3 },
    { from: 2, to: 4 }, { from: 3, to: 4 }, { from: 3, to: 6 },
    { from: 4, to: 6 }, { from: 4, to: 7 }, { from: 5, to: 11 },
    { from: 6, to: 8 }, { from: 7, to: 9 }, { from: 0, to: 10 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "hsl(var(--delay-high))";
      case "medium": return "hsl(var(--delay-medium))";
      case "low": return "hsl(var(--delay-low))";
      default: return "hsl(var(--delay-none))";
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-muted/30 rounded-lg overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 900 600" className="absolute inset-0">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="900" height="600" fill="url(#grid)" />
        
        {/* Connections */}
        <g>
          {connections.map((conn, idx) => {
            const from = airports[conn.from];
            const to = airports[conn.to];
            const delayIntensity = Math.max(from.delays, to.delays);
            const strokeColor = delayIntensity > 40 ? "hsl(var(--delay-high))" : 
                               delayIntensity > 25 ? "hsl(var(--delay-medium))" : 
                               "hsl(var(--primary))";
            
            return (
              <line
                key={idx}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={strokeColor}
                strokeWidth="2"
                opacity="0.3"
                className="transition-all duration-300"
              />
            );
          })}
        </g>
        
        {/* Airport nodes */}
        <g>
          {airports.map((airport, idx) => (
            <g
              key={idx}
              onMouseEnter={() => setHoveredNode(airport.code)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer transition-all duration-300"
            >
              {/* Glow effect */}
              <circle
                cx={airport.x}
                cy={airport.y}
                r={airport.size / 2 + 4}
                fill={getStatusColor(airport.status)}
                opacity={hoveredNode === airport.code ? 0.3 : 0.1}
                className="animate-pulse-slow"
              />
              
              {/* Main circle */}
              <circle
                cx={airport.x}
                cy={airport.y}
                r={airport.size / 2}
                fill={getStatusColor(airport.status)}
                stroke="white"
                strokeWidth="2"
                opacity={hoveredNode === airport.code ? 1 : 0.9}
                className="transition-all duration-300"
                style={{
                  transform: hoveredNode === airport.code ? 'scale(1.2)' : 'scale(1)',
                  transformOrigin: `${airport.x}px ${airport.y}px`,
                }}
              />
              
              {/* Airport code */}
              <text
                x={airport.x}
                y={airport.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold font-mono fill-white pointer-events-none"
              >
                {airport.code}
              </text>
            </g>
          ))}
        </g>
      </svg>
      
      {/* Tooltip */}
      {hoveredNode && (
        <div className="absolute top-4 right-4 bg-card border rounded-lg p-4 shadow-lg">
          {airports.filter(a => a.code === hoveredNode).map(airport => (
            <div key={airport.code} className="space-y-2">
              <div className="text-lg font-bold font-mono">{airport.code}</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold capitalize">{airport.status}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Delays:</span>
                  <span className="font-mono font-semibold">{airport.delays}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Connections:</span>
                  <span className="font-mono font-semibold">
                    {connections.filter(c => c.from === airports.indexOf(airport) || c.to === airports.indexOf(airport)).length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border rounded-lg p-3 text-xs space-y-1">
        <div className="font-semibold mb-2">Delay Severity</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--delay-none))" }} />
          <span>No delays (0-10 min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--delay-low))" }} />
          <span>Low (10-25 min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--delay-medium))" }} />
          <span>Medium (25-45 min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--delay-high))" }} />
          <span>High (45+ min)</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkMap;
