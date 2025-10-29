import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Network, BarChart3, MapPin, Zap, TrendingUp, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Network className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AirDelay</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
            <Link to="/auth">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              Powered by Advanced ML Models
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Predict, Simulate & Visualize{" "}
              <span className="text-gradient">U.S. Flight Delays</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Interactive ML-powered platform analyzing <span className="font-bold text-foreground">$33B+</span> in annual delay costs across the entire U.S. aviation network
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            {/* Animated Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold font-mono text-primary">15K+</div>
                <div className="text-sm text-muted-foreground">Daily Flights Analyzed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold font-mono text-secondary">350+</div>
                <div className="text-sm text-muted-foreground">Airports Tracked</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold font-mono text-accent">87%</div>
                <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Powerful Features for Aviation Analytics</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand, predict, and optimize flight operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">AI Delay Prediction</CardTitle>
                <CardDescription className="text-base">
                  Machine learning models predict flight delays with confidence intervals and detailed contributing factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                    <span>Real-time predictions powered by Gemini 1.5 Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                    <span>Historical pattern analysis across millions of flights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                    <span>Weather, congestion, and route performance factors</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Network Simulation</CardTitle>
                <CardDescription className="text-base">
                  Interactive what-if scenarios showing delay propagation across the entire U.S. aviation network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2" />
                    <span>Visualize cascading delays in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2" />
                    <span>Test disruption scenarios at major hubs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2" />
                    <span>Calculate network resilience scores</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Visual Analytics</CardTitle>
                <CardDescription className="text-base">
                  Real-time charts, maps, and network graphs with interactive exploration tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2" />
                    <span>Interactive U.S. map with live delay heatmaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2" />
                    <span>Network topology and hub vulnerability analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2" />
                    <span>Trend analysis and performance comparisons</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to powerful aviation insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: MapPin, title: "Input Flight Details", desc: "Select airports, airlines, dates, and conditions" },
              { icon: Brain, title: "AI Analysis", desc: "Machine learning analyzes historical patterns and current conditions" },
              { icon: Network, title: "Network Simulation", desc: "Simulate disruptions and visualize delay propagation" },
              { icon: TrendingUp, title: "Interactive Results", desc: "Explore predictions, impacts, and optimization opportunities" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Explore Air Traffic Delay Analytics
            </h2>
            <p className="text-xl opacity-90">
              An academic project analyzing U.S. flight delay patterns using historical Kaggle datasets and machine learning
            </p>
            <div className="flex justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/30">
        <div className="container text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Network className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AirDelay Simulator</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Final Year Academic Project - Air Traffic Delay & Network Resilience Analysis
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS | Data source: Kaggle Aviation Datasets
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
