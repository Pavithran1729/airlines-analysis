import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CountUp from "react-countup";
import { Plane, Clock, DollarSign, AlertTriangle } from "lucide-react";

interface SimulationStatsProps {
  flightsAffected: number;
  totalDelayMinutes: number;
  airportsWithDelays: number;
  economicImpact: number;
  resilienceScore: number;
  isSimulating: boolean;
}

export function SimulationStats({
  flightsAffected,
  totalDelayMinutes,
  airportsWithDelays,
  economicImpact,
  resilienceScore,
  isSimulating,
}: SimulationStatsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-delay-none";
    if (score >= 40) return "text-delay-medium";
    return "text-delay-high";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Live Simulation Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Flights Affected */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Flights Affected</span>
          </div>
          <span className="text-2xl font-bold">
            {isSimulating ? (
              <CountUp end={flightsAffected} duration={1} />
            ) : (
              flightsAffected
            )}
          </span>
        </div>

        {/* Total Delay Minutes */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Delay Minutes</span>
          </div>
          <span className="text-2xl font-bold text-delay-medium">
            {isSimulating ? (
              <CountUp end={totalDelayMinutes} duration={1} />
            ) : (
              totalDelayMinutes.toLocaleString()
            )}
          </span>
        </div>

        {/* Airports with Delays */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Airports with Delays</span>
          </div>
          <span className="text-2xl font-bold">
            {isSimulating ? (
              <CountUp end={airportsWithDelays} duration={1} />
            ) : (
              airportsWithDelays
            )}
          </span>
        </div>

        {/* Economic Impact */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Economic Impact</span>
          </div>
          <span className="text-2xl font-bold text-destructive">
            $
            {isSimulating ? (
              <CountUp end={economicImpact} duration={1} separator="," />
            ) : (
              economicImpact.toLocaleString()
            )}
          </span>
        </div>

        {/* Network Resilience Score */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Network Resilience Score</span>
            <span className={`text-3xl font-bold ${getScoreColor(resilienceScore)}`}>
              {resilienceScore}
            </span>
          </div>
          <Progress value={resilienceScore} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {resilienceScore >= 70
              ? "Network showing strong resilience"
              : resilienceScore >= 40
              ? "Moderate network strain detected"
              : "Critical network vulnerability"}
          </p>
        </div>

        {/* Affected Airports List */}
        <div className="pt-2 border-t">
          <p className="text-sm font-semibold mb-2">Most Affected Airports</p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {["JFK", "LGA", "EWR", "BOS", "PHL"].map((code, index) => (
              <div
                key={code}
                className="flex items-center justify-between text-sm py-1 px-2 rounded hover:bg-muted"
              >
                <span>{code}</span>
                <span className="text-muted-foreground">{45 - index * 8} min</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
