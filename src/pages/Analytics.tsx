import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { generateDelayTrends, generateHourlyPattern, generateRoutePerformance, generateAirlinePerformance, networkMetrics, hubCentrality, vulnerabilityAnalysis, airports } from "@/lib/mockData";
import { Calendar, Download, TrendingUp, Plane, Clock, Target } from "lucide-react";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30");
  const delayTrends = generateDelayTrends(parseInt(dateRange));
  const hourlyPattern = generateHourlyPattern();
  const routes = generateRoutePerformance();
  const airlines = generateAirlinePerformance();

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <Badge variant="secondary">Historical Analysis Mode</Badge>
            </div>
            <p className="text-muted-foreground">Comprehensive delay analytics from Kaggle dataset</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Delay Trends</TabsTrigger>
          <TabsTrigger value="airports">Airport Analysis</TabsTrigger>
          <TabsTrigger value="airlines">Airline Performance</TabsTrigger>
          <TabsTrigger value="network">Network Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Delay Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 min</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-delay-low" /> +2.5% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Delayed Flights</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">22% of total flights</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Industry avg: 75%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cost of Delays</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.4M</div>
                <p className="text-xs text-muted-foreground">Estimated impact</p>
              </CardContent>
            </Card>
          </div>

          {/* Delay Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Delay Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { range: '0-15 min', count: 4200 },
                  { range: '15-30 min', count: 3800 },
                  { range: '30-60 min', count: 2900 },
                  { range: '60+ min', count: 1643 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Routes */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Most Delayed Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {routes.slice(0, 5).map((route, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{route.route}</span>
                      <span className="text-sm font-semibold text-delay-high">{route.avgDelay} min</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Best Performing Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {routes.slice(-5).reverse().map((route, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{route.route}</span>
                      <span className="text-sm font-semibold text-delay-none">{route.avgDelay} min</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs with placeholder content */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Delay Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={delayTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgDelay" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="onTimePercentage" stroke="hsl(var(--secondary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="airports">
          <Card>
            <CardHeader>
              <CardTitle>Airport Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {airports.slice(0, 10).map((airport) => (
                  <div key={airport.code} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted">
                    <div>
                      <p className="font-semibold">{airport.code}</p>
                      <p className="text-sm text-muted-foreground">{airport.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{airport.avgDelay} min</p>
                      <p className="text-xs text-muted-foreground">{(airport.trafficVolume / 1000).toFixed(0)}k flights</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="airlines">
          <Card>
            <CardHeader>
              <CardTitle>Airline Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {airlines.map((airline, i) => (
                  <div key={airline.code} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}</span>
                      <div>
                        <p className="font-semibold">{airline.name}</p>
                        <p className="text-sm text-muted-foreground">{airline.code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{airline.delayRate}% delay rate</p>
                      <p className="text-sm text-muted-foreground">{airline.avgDelay} min avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(networkMetrics).map(([key, value]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

