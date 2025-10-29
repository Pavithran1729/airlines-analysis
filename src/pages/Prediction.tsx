import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, TrendingUp, Brain, AlertTriangle, CheckCircle2, Clock, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Prediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      toast.success("Prediction completed successfully!");
    }, 2000);
  };

  const predictionResult = {
    delay: 35,
    confidence: 87,
    risk: "Moderate",
    arrival: "3:45 PM",
    factors: [
      { name: "Weather Impact", value: 40 },
      { name: "Airport Congestion", value: 30 },
      { name: "Historical Performance", value: 20 },
      { name: "Time of Day", value: 10 },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Network className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AirDelay</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Flight Delay Prediction</h1>
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Powered by fine-tuned Gemini 1.5 Pro model
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Input Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Flight Details</CardTitle>
                <CardDescription>Enter flight information for delay prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePredict} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origin Airport</Label>
                      <Select defaultValue="jfk">
                        <SelectTrigger id="origin">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jfk">JFK - John F. Kennedy</SelectItem>
                          <SelectItem value="lax">LAX - Los Angeles</SelectItem>
                          <SelectItem value="ord">ORD - Chicago O'Hare</SelectItem>
                          <SelectItem value="atl">ATL - Atlanta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination Airport</Label>
                      <Select defaultValue="lax">
                        <SelectTrigger id="destination">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lax">LAX - Los Angeles</SelectItem>
                          <SelectItem value="sfo">SFO - San Francisco</SelectItem>
                          <SelectItem value="mia">MIA - Miami</SelectItem>
                          <SelectItem value="dfw">DFW - Dallas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="airline">Airline</Label>
                      <Select defaultValue="aa">
                        <SelectTrigger id="airline">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aa">American Airlines</SelectItem>
                          <SelectItem value="dl">Delta Air Lines</SelectItem>
                          <SelectItem value="ua">United Airlines</SelectItem>
                          <SelectItem value="wn">Southwest Airlines</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="flight">Flight Number</Label>
                      <Input id="flight" placeholder="AA123" defaultValue="AA123" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="datetime">Scheduled Departure</Label>
                      <Input id="datetime" type="datetime-local" defaultValue="2025-01-15T14:30" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-semibold text-sm">Contextual Factors</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weather-origin">Weather at Origin</Label>
                      <Select defaultValue="rain">
                        <SelectTrigger id="weather-origin">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clear">Clear</SelectItem>
                          <SelectItem value="rain">Rain</SelectItem>
                          <SelectItem value="snow">Snow</SelectItem>
                          <SelectItem value="storm">Storm</SelectItem>
                          <SelectItem value="fog">Fog</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weather-dest">Weather at Destination</Label>
                      <Select defaultValue="clear">
                        <SelectTrigger id="weather-dest">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clear">Clear</SelectItem>
                          <SelectItem value="rain">Rain</SelectItem>
                          <SelectItem value="snow">Snow</SelectItem>
                          <SelectItem value="storm">Storm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1 gap-2" disabled={isLoading}>
                      {isLoading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4" />
                          Predict Delay
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowResults(false)}>
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              {!showResults ? (
                <Card className="h-full flex items-center justify-center min-h-[500px]">
                  <CardContent className="text-center space-y-4">
                    <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="h-12 w-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Ready to Predict</h3>
                      <p className="text-muted-foreground max-w-md">
                        Enter flight details and click Predict to see AI-powered delay predictions
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Main Prediction Card */}
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Prediction Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent">
                          <div className="text-4xl font-bold font-mono text-accent">{predictionResult.delay} min</div>
                          <div className="text-sm text-muted-foreground mt-1">Predicted Delay</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary">
                          <div className="text-4xl font-bold font-mono text-primary">{predictionResult.confidence}%</div>
                          <div className="text-sm text-muted-foreground mt-1">Confidence Level</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary">
                          <div className="text-xl font-bold text-secondary">{predictionResult.risk}</div>
                          <div className="text-sm text-muted-foreground mt-1">Risk Level</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Estimated arrival:</span>
                        <span className="font-semibold">{predictionResult.arrival} (35 min late)</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contributing Factors */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contributing Factors</CardTitle>
                      <CardDescription>Feature importance analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {predictionResult.factors.map((factor, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{factor.name}</span>
                            <span className="font-mono font-semibold">{factor.value}%</span>
                          </div>
                          <Progress value={factor.value} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Similar Flights */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Similar Flights Analysis</CardTitle>
                      <CardDescription>Based on 1,247 historical flights with similar conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <span className="text-sm">Average delay for similar flights</span>
                          <span className="font-mono font-semibold">32 minutes</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <span className="text-sm">Your prediction percentile</span>
                          <span className="font-mono font-semibold">72nd</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-delay-none" />
                          <span>This prediction is within normal range for this route and conditions</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prediction;
