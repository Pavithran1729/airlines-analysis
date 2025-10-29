import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { airports, presetScenarios } from "@/lib/mockData";
import { Cloud, CloudRain, Users, RefreshCw } from "lucide-react";

interface ScenarioControlsProps {
  onRunSimulation: (config: any) => void;
  isSimulating: boolean;
}

export function ScenarioControls({ onRunSimulation, isSimulating }: ScenarioControlsProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [customConfig, setCustomConfig] = useState({
    disruptionType: "weather",
    airports: [] as string[],
    severity: 50,
    duration: 120,
  });

  const handlePresetScenario = (scenarioId: string) => {
    const scenario = presetScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    const config = {
      type: "preset",
      scenarioId,
      airports: "defaultAirports" in scenario ? scenario.defaultAirports : [scenario.defaultAirport],
      severity: scenario.severity,
      duration: scenario.duration,
    };

    onRunSimulation(config);
  };

  const handleCustomSimulation = () => {
    onRunSimulation({
      type: "custom",
      ...customConfig,
    });
  };

  const scenarioIcons = {
    "weather-hub": <CloudRain className="h-8 w-8" />,
    "multi-airport": <Cloud className="h-8 w-8" />,
    "holiday-rush": <Users className="h-8 w-8" />,
    "cascading": <RefreshCw className="h-8 w-8" />,
  };

  return (
    <div className="space-y-4 h-full overflow-y-auto p-4">
      {/* Preset Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preset Scenarios</CardTitle>
          <CardDescription>Quick-start with pre-configured simulations</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {presetScenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handlePresetScenario(scenario.id)}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{scenario.icon}</div>
                  {scenarioIcons[scenario.id as keyof typeof scenarioIcons]}
                </div>
                <h4 className="font-semibold text-sm">{scenario.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {scenario.description}
                </p>
                <Button size="sm" className="w-full" disabled={isSimulating}>
                  Load Scenario
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Custom Scenario Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Custom Scenario</CardTitle>
          <CardDescription>Build your own simulation</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue="step1">
            <AccordionItem value="step1">
              <AccordionTrigger>Step 1: Disruption Type</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <Select
                  value={customConfig.disruptionType}
                  onValueChange={(value) =>
                    setCustomConfig({ ...customConfig, disruptionType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weather">Weather Event</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="closure">Airport Closure</SelectItem>
                    <SelectItem value="atc">ATC Delay</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step2">
              <AccordionTrigger>Step 2: Affected Airport(s)</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <Select
                  onValueChange={(value) =>
                    setCustomConfig({
                      ...customConfig,
                      airports: [value],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select airport" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.slice(0, 10).map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.code} - {airport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {customConfig.airports.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {customConfig.airports.map((code) => (
                      <span
                        key={code}
                        className="px-2 py-1 bg-primary text-primary-foreground rounded-md text-xs"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step3">
              <AccordionTrigger>Step 3: Severity</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mild (10-30min)</span>
                    <span>Severe (60+ min)</span>
                  </div>
                  <Slider
                    value={[customConfig.severity]}
                    onValueChange={([value]) =>
                      setCustomConfig({ ...customConfig, severity: value })
                    }
                    min={0}
                    max={100}
                    step={10}
                  />
                  <p className="text-sm text-center font-semibold">
                    {customConfig.severity < 33
                      ? "Mild"
                      : customConfig.severity < 66
                      ? "Moderate"
                      : "Severe"}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step4">
              <AccordionTrigger>Step 4: Duration</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Slider
                    value={[customConfig.duration]}
                    onValueChange={([value]) =>
                      setCustomConfig({ ...customConfig, duration: value })
                    }
                    min={30}
                    max={480}
                    step={30}
                  />
                  <p className="text-sm text-center font-semibold">
                    {customConfig.duration} minutes ({(customConfig.duration / 60).toFixed(1)} hours)
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            className="w-full mt-4"
            size="lg"
            onClick={handleCustomSimulation}
            disabled={isSimulating || customConfig.airports.length === 0}
          >
            Run Custom Simulation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
