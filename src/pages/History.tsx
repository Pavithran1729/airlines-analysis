import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { generateSimulationHistory } from "@/lib/mockData";
import { Search, Eye, Edit, Trash2, Share2, Brain, Network } from "lucide-react";

export default function History() {
  const history = generateSimulationHistory();

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">History & Saved Scenarios</h1>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by airport, airline, date..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <Card key={item.id} className="p-6 hover:border-primary transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {item.type === 'prediction' ? <Brain className="h-6 w-6 text-primary" /> : <Network className="h-6 w-6 text-primary" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.scenario}</p>
                  <div className="flex gap-2 mt-2">
                    {item.airports.map(code => (
                      <Badge key={code} variant="outline">{code}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="text-muted-foreground">{item.date.toLocaleDateString()}</span>
                    <span>Flights: {item.flightsAffected}</span>
                    <span>Delay: {item.totalDelayMinutes} min</span>
                    <span className="text-destructive">${(item.costImpact / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost"><Share2 className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
