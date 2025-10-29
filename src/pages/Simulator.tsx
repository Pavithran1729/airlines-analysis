import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SimulationCanvas } from "@/components/SimulationCanvas";
import { ScenarioControls } from "@/components/ScenarioControls";
import { SimulationStats } from "@/components/SimulationStats";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";

export default function Simulator() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"ready" | "running" | "paused" | "completed">("ready");
  const [speed, setSpeed] = useState("1");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [simulationData, setSimulationData] = useState({
    flightsAffected: 0,
    totalDelayMinutes: 0,
    airportsWithDelays: 0,
    economicImpact: 0,
    resilienceScore: 100,
  });
  const [disruptedAirports, setDisruptedAirports] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "running") {
      const speedMultiplier = parseFloat(speed);
      interval = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTime = prev + speedMultiplier;
          
          // Update simulation data progressively
          setSimulationData((data) => ({
            flightsAffected: Math.min(Math.floor(newTime * 5.7), 342),
            totalDelayMinutes: Math.min(Math.floor(newTime * 308), 18500),
            airportsWithDelays: Math.min(Math.floor(newTime / 15), 8),
            economicImpact: Math.min(Math.floor(newTime * 40833), 2450000),
            resilienceScore: Math.max(100 - Math.floor(newTime * 1.5), 15),
          }));

          // Add to chart data
          if (Math.floor(newTime) % 5 === 0) {
            setChartData((prev) => [
              ...prev,
              {
                time: Math.floor(newTime),
                JFK: 10 + Math.random() * 35,
                LGA: 8 + Math.random() * 30,
                EWR: 12 + Math.random() * 28,
                BOS: 6 + Math.random() * 25,
                PHL: 5 + Math.random() * 20,
              },
            ]);
          }

          // Complete at 60 seconds
          if (newTime >= 60) {
            setStatus("completed");
            setShowSummary(true);
            return 60;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, speed]);

  const handleRunSimulation = (config: any) => {
    setStatus("running");
    setTimeElapsed(0);
    setChartData([]);
    setDisruptedAirports(config.airports || ["JFK"]);
    toast.success("Simulation started");
  };

  const handlePlay = () => {
    if (status === "ready" || status === "paused") {
      setStatus("running");
    }
  };

  const handlePause = () => {
    if (status === "running") {
      setStatus("paused");
    }
  };

  const handleStop = () => {
    setStatus("ready");
    setTimeElapsed(0);
    setSimulationData({
      flightsAffected: 0,
      totalDelayMinutes: 0,
      airportsWithDelays: 0,
      economicImpact: 0,
      resilienceScore: 100,
    });
    setChartData([]);
    setDisruptedAirports([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-card border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">Network Simulator</h1>
            <Badge
              variant={
                status === "running"
                  ? "default"
                  : status === "completed"
                  ? "secondary"
                  : "outline"
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant={status === "running" ? "default" : "outline"}
                onClick={status === "running" ? handlePause : handlePlay}
                disabled={status === "completed"}
              >
                {status === "running" ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleStop}
                disabled={status === "ready"}
              >
                <Square className="h-4 w-4" />
              </Button>
            </div>

            <Select value={speed} onValueChange={setSpeed}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
                <SelectItem value="4">4x</SelectItem>
              </SelectContent>
            </Select>

            <div className="px-4 py-2 bg-muted rounded-md font-mono text-sm font-semibold">
              {formatTime(timeElapsed)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left: Canvas */}
        <div className="flex-1 p-6">
          <SimulationCanvas
            isSimulating={status === "running"}
            disruptedAirports={disruptedAirports}
          />
        </div>

        {/* Right: Controls */}
        <div className="w-96 border-l bg-muted/30">
          <ScenarioControls
            onRunSimulation={handleRunSimulation}
            isSimulating={status === "running" || status === "paused"}
          />
          <div className="p-4">
            <SimulationStats
              {...simulationData}
              isSimulating={status === "running"}
            />
          </div>
        </div>
      </div>

      {/* Bottom Chart */}
      {chartData.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" label={{ value: "Time (seconds)", position: "bottom" }} />
              <YAxis label={{ value: "Delay (minutes)", angle: -90, position: "left" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="JFK" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="LGA" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="EWR" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="BOS" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="PHL" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Summary Modal */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Simulation Complete</DialogTitle>
            <DialogDescription>Here's a summary of the simulation results</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Total Simulation Time</p>
                <p className="text-2xl font-bold">60 seconds</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Peak Delay Time</p>
                <p className="text-2xl font-bold">45 min</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Most Affected</p>
                <p className="text-2xl font-bold">JFK</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Flights Impacted</p>
                <p className="text-2xl font-bold">{simulationData.flightsAffected}</p>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">AI-Generated Insights</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Cascading delays affected Northeast corridor</li>
                <li>• Peak impact at 6 PM with 125 delayed departures</li>
                <li>• Recovery time: 4.5 hours</li>
              </ul>
            </Card>

            <div className="flex gap-2">
              <Button className="flex-1">View Detailed Report</Button>
              <Button variant="outline" className="flex-1" onClick={handleStop}>
                Run Again
              </Button>
              <Button variant="outline" onClick={() => setShowSummary(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
