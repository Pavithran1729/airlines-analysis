import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Network, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  Search, 
  Bell,
  User,
  Plane,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Link } from "react-router-dom";
import NetworkMap from "@/components/NetworkMap";
import DelayChart from "@/components/DelayChart";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const kpiData = [
    {
      title: "Flights on Oct 15, 2023",
      value: "15,234",
      change: "+12.5% from avg",
      trend: "up",
      icon: Plane,
      color: "text-primary"
    },
    {
      title: "Delays Recorded",
      value: "432 (2.8%)",
      change: "-8.2% vs. yesterday",
      trend: "down",
      icon: AlertTriangle,
      color: "text-accent"
    },
    {
      title: "Network Health",
      value: "87%",
      change: "+3.1%",
      trend: "up",
      icon: Activity,
      color: "text-delay-none"
    },
    {
      title: "Most Affected",
      value: "JFK",
      change: "23 delays",
      trend: "neutral",
      icon: MapPin,
      color: "text-destructive"
    }
  ];

  const recentDelays = [
    { airport: "JFK", airline: "AA", delay: 45, reason: "Weather", time: "10:23 AM" },
    { airport: "ORD", airline: "UA", delay: 32, reason: "ATC", time: "10:18 AM" },
    { airport: "ATL", airline: "DL", delay: 28, reason: "Crew", time: "10:15 AM" },
    { airport: "LAX", airline: "WN", delay: 55, reason: "Mechanical", time: "10:12 AM" },
    { airport: "DFW", airline: "AA", delay: 19, reason: "Weather", time: "10:08 AM" },
  ];

  const alerts = [
    { type: "warning", message: "Severe weather detected at JFK - 15% delay increase expected", time: "2 min ago" },
    { type: "info", message: "Network optimization suggestion: Consider alternative routes through ATL", time: "15 min ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Network className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AirDelay</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-primary">Dashboard</Link>
              <Link to="/prediction" className="text-sm font-medium hover:text-primary transition-colors">Prediction</Link>
              <Link to="/simulator" className="text-sm font-medium hover:text-primary transition-colors">Simulator</Link>
              <Link to="/analytics" className="text-sm font-medium hover:text-primary transition-colors">Analytics</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search airports, airlines..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono">{kpi.value}</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  {kpi.trend === "up" && <ArrowUpRight className="h-4 w-4 text-delay-none" />}
                  {kpi.trend === "down" && <ArrowDownRight className="h-4 w-4 text-delay-none" />}
                  <span className={kpi.trend === "neutral" ? "text-muted-foreground" : "text-delay-none"}>
                    {kpi.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Network Map & Control Panel */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Network Overview</CardTitle>
                <CardDescription>Historical delay data from Kaggle dataset (Oct 15, 2023)</CardDescription>
              </CardHeader>
              <CardContent>
                <NetworkMap />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Run simulations and predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/prediction">
                <Button className="w-full justify-start gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Predict Flight Delay
                </Button>
              </Link>
              <Link to="/simulator">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Network className="h-4 w-4" />
                  Run Network Simulation
                </Button>
              </Link>
              
              <div className="pt-4 border-t space-y-3">
                <h4 className="text-sm font-semibold">Network Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Airports</span>
                    <span className="font-mono font-semibold">352</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Routes</span>
                    <span className="font-mono font-semibold">8,431</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Delay</span>
                    <span className="font-mono font-semibold">28 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Density</span>
                    <span className="font-mono font-semibold">0.73</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-2">
                <h4 className="text-sm font-semibold">Critical Hubs</h4>
                <div className="space-y-2">
                  {["ATL", "ORD", "DFW", "DEN", "LAX"].map((hub, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="font-mono font-semibold">{hub}</span>
                      <span className="text-muted-foreground">{Math.floor(Math.random() * 50 + 10)} delays</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Delay Events</CardTitle>
              <CardDescription>Historical delays from dataset (Oct 15, 2023)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDelays.map((delay, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-l-4" 
                    style={{ borderLeftColor: delay.delay > 45 ? 'hsl(var(--delay-high))' : delay.delay > 30 ? 'hsl(var(--delay-medium))' : 'hsl(var(--delay-low))' }}>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="font-mono font-bold text-sm">{delay.airport}</div>
                        <div className="text-xs text-muted-foreground">{delay.airline}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{delay.delay} min delay</div>
                        <div className="text-xs text-muted-foreground">{delay.reason}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {delay.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border ${alert.type === 'warning' ? 'bg-accent/10 border-accent' : 'bg-primary/10 border-primary'}`}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${alert.type === 'warning' ? 'text-accent' : 'text-primary'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delay Trends</CardTitle>
                <CardDescription>Historical pattern analysis from Kaggle dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <DelayChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
