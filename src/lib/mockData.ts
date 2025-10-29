// Comprehensive mock data for Air Traffic Simulator

export interface Airport {
  code: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  hubStatus: 'major' | 'regional' | 'small';
  trafficVolume: number;
  delayStatus: 'none' | 'low' | 'medium' | 'high';
  avgDelay: number;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  scheduledTime: Date;
  actualTime: Date;
  delay: number;
  status: 'on-time' | 'delayed' | 'cancelled';
  reason?: string;
}

export interface DelayEvent {
  id: string;
  timestamp: Date;
  airport: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: number;
  type: 'weather' | 'technical' | 'atc' | 'crew' | 'other';
  affectedFlights: number;
  costImpact: number;
}

export interface SimulationResult {
  id: string;
  title: string;
  type: 'prediction' | 'simulation';
  date: Date;
  scenario: string;
  flightsAffected: number;
  totalDelayMinutes: number;
  costImpact: number;
  airports: string[];
  status: 'completed' | 'saved' | 'shared';
  insights: string[];
}

// Major US Airports
export const airports: Airport[] = [
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', lat: 33.6407, lng: -84.4277, hubStatus: 'major', trafficVolume: 95000, delayStatus: 'low', avgDelay: 15 },
  { code: 'ORD', name: "O'Hare International", city: 'Chicago', lat: 41.9742, lng: -87.9073, hubStatus: 'major', trafficVolume: 83000, delayStatus: 'medium', avgDelay: 28 },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', lat: 33.9416, lng: -118.4085, hubStatus: 'major', trafficVolume: 88000, delayStatus: 'low', avgDelay: 18 },
  { code: 'DFW', name: 'Dallas/Fort Worth', city: 'Dallas', lat: 32.8998, lng: -97.0403, hubStatus: 'major', trafficVolume: 75000, delayStatus: 'none', avgDelay: 12 },
  { code: 'DEN', name: 'Denver International', city: 'Denver', lat: 39.8561, lng: -104.6737, hubStatus: 'major', trafficVolume: 69000, delayStatus: 'medium', avgDelay: 32 },
  { code: 'JFK', name: 'John F. Kennedy', city: 'New York', lat: 40.6413, lng: -73.7781, hubStatus: 'major', trafficVolume: 62000, delayStatus: 'high', avgDelay: 45 },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', lat: 37.6213, lng: -122.3790, hubStatus: 'major', trafficVolume: 58000, delayStatus: 'medium', avgDelay: 25 },
  { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', lat: 36.0840, lng: -115.1537, hubStatus: 'major', trafficVolume: 52000, delayStatus: 'low', avgDelay: 14 },
  { code: 'SEA', name: 'Seattle-Tacoma', city: 'Seattle', lat: 47.4502, lng: -122.3088, hubStatus: 'major', trafficVolume: 50000, delayStatus: 'none', avgDelay: 10 },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando', lat: 28.4312, lng: -81.3081, hubStatus: 'major', trafficVolume: 48000, delayStatus: 'low', avgDelay: 16 },
  { code: 'MIA', name: 'Miami International', city: 'Miami', lat: 25.7959, lng: -80.2870, hubStatus: 'major', trafficVolume: 46000, delayStatus: 'low', avgDelay: 19 },
  { code: 'PHX', name: 'Phoenix Sky Harbor', city: 'Phoenix', lat: 33.4352, lng: -112.0101, hubStatus: 'major', trafficVolume: 44000, delayStatus: 'none', avgDelay: 11 },
  { code: 'BOS', name: 'Boston Logan', city: 'Boston', lat: 42.3656, lng: -71.0096, hubStatus: 'regional', trafficVolume: 42000, delayStatus: 'medium', avgDelay: 30 },
  { code: 'EWR', name: 'Newark Liberty', city: 'Newark', lat: 40.6895, lng: -74.1745, hubStatus: 'regional', trafficVolume: 40000, delayStatus: 'high', avgDelay: 38 },
  { code: 'MSP', name: 'Minneapolis-St. Paul', city: 'Minneapolis', lat: 44.8848, lng: -93.2223, hubStatus: 'regional', trafficVolume: 38000, delayStatus: 'low', avgDelay: 17 },
  { code: 'DTW', name: 'Detroit Metro Wayne', city: 'Detroit', lat: 42.2162, lng: -83.3554, hubStatus: 'regional', trafficVolume: 36000, delayStatus: 'medium', avgDelay: 22 },
  { code: 'PHL', name: 'Philadelphia International', city: 'Philadelphia', lat: 39.8729, lng: -75.2437, hubStatus: 'regional', trafficVolume: 34000, delayStatus: 'low', avgDelay: 20 },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', lat: 40.7769, lng: -73.8740, hubStatus: 'regional', trafficVolume: 32000, delayStatus: 'high', avgDelay: 42 },
  { code: 'IAH', name: 'George Bush Houston', city: 'Houston', lat: 29.9902, lng: -95.3368, hubStatus: 'regional', trafficVolume: 30000, delayStatus: 'none', avgDelay: 13 },
  { code: 'CLT', name: 'Charlotte Douglas', city: 'Charlotte', lat: 35.2144, lng: -80.9473, hubStatus: 'regional', trafficVolume: 28000, delayStatus: 'low', avgDelay: 18 },
];

export const airlines = [
  { code: 'AA', name: 'American Airlines', logo: '🛫' },
  { code: 'DL', name: 'Delta Air Lines', logo: '✈️' },
  { code: 'UA', name: 'United Airlines', logo: '🛬' },
  { code: 'WN', name: 'Southwest Airlines', logo: '🛩️' },
  { code: 'B6', name: 'JetBlue Airways', logo: '🚁' },
  { code: 'AS', name: 'Alaska Airlines', logo: '🛫' },
  { code: 'NK', name: 'Spirit Airlines', logo: '✈️' },
  { code: 'F9', name: 'Frontier Airlines', logo: '🛬' },
];

// Generate realistic delay data
export const generateDelayTrends = (days: number = 30) => {
  const data = [];
  const baseDelay = 25;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      avgDelay: baseDelay + Math.random() * 20 - 10,
      totalDelays: Math.floor(800 + Math.random() * 400),
      onTimePercentage: 70 + Math.random() * 20,
      weather: Math.floor(Math.random() * 200),
      mechanical: Math.floor(Math.random() * 150),
      atc: Math.floor(Math.random() * 100),
      crew: Math.floor(Math.random() * 80),
      other: Math.floor(Math.random() * 120),
    });
  }
  
  return data;
};

// Hourly delay pattern
export const generateHourlyPattern = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [];
  
  days.forEach((day, dayIndex) => {
    for (let hour = 0; hour < 24; hour++) {
      let delay = 10;
      
      // Peak hours logic
      if (hour >= 6 && hour <= 9) delay += 20; // Morning rush
      if (hour >= 17 && hour <= 20) delay += 25; // Evening rush
      if (dayIndex === 4 || dayIndex === 6) delay += 10; // Weekend effect
      
      delay += Math.random() * 15;
      
      data.push({
        day,
        hour,
        delay: Math.floor(delay),
      });
    }
  });
  
  return data;
};

// Generate simulation history
export const generateSimulationHistory = (): SimulationResult[] => {
  return [
    {
      id: '1',
      title: 'JFK Weather Event Simulation',
      type: 'simulation',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      scenario: 'Severe Weather at Major Hub',
      flightsAffected: 342,
      totalDelayMinutes: 18500,
      costImpact: 2450000,
      airports: ['JFK', 'LGA', 'EWR', 'BOS'],
      status: 'completed',
      insights: [
        'Cascading delays affected Northeast corridor',
        'Peak impact at 6 PM with 125 delayed departures',
        'Recovery time: 4.5 hours'
      ]
    },
    {
      id: '2',
      title: 'LAX → ORD Delay Prediction',
      type: 'prediction',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      scenario: 'Route Prediction',
      flightsAffected: 1,
      totalDelayMinutes: 45,
      costImpact: 8500,
      airports: ['LAX', 'ORD'],
      status: 'completed',
      insights: ['High confidence: 87%', 'Weather factor: Moderate', 'Historical pattern match']
    },
    {
      id: '3',
      title: 'Holiday Rush - Multi-Hub',
      type: 'simulation',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      scenario: 'Holiday Rush Congestion',
      flightsAffected: 1250,
      totalDelayMinutes: 45000,
      costImpact: 6750000,
      airports: ['ATL', 'ORD', 'DFW', 'DEN', 'LAX'],
      status: 'saved',
      insights: [
        'Network congestion across all major hubs',
        'ATL experienced highest impact: 28% of all delays',
        'Recommended mitigation: Increase ground crew by 30%'
      ]
    },
    {
      id: '4',
      title: 'DEN → SFO Prediction',
      type: 'prediction',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      scenario: 'Route Prediction',
      flightsAffected: 1,
      totalDelayMinutes: 22,
      costImpact: 4200,
      airports: ['DEN', 'SFO'],
      status: 'completed',
      insights: ['Confidence: 92%', 'Primary factor: ATC delays', 'Best departure window: 2-4 PM']
    },
    {
      id: '5',
      title: 'Coast to Coast Cascade',
      type: 'simulation',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      scenario: 'Cascading Delays Coast to Coast',
      flightsAffected: 890,
      totalDelayMinutes: 38000,
      costImpact: 4900000,
      airports: ['JFK', 'ORD', 'DEN', 'SFO', 'LAX'],
      status: 'shared',
      insights: [
        'Cross-country ripple effect over 8 hours',
        'West coast airports recovered fastest',
        'Critical path: ORD → DEN connection'
      ]
    }
  ];
};

// Route performance data
export const generateRoutePerformance = () => {
  const routes = [
    { route: 'JFK → LAX', avgDelay: 42, flights: 1250, onTime: 65 },
    { route: 'ORD → SFO', avgDelay: 35, flights: 980, onTime: 72 },
    { route: 'ATL → DEN', avgDelay: 28, flights: 1100, onTime: 78 },
    { route: 'LAX → JFK', avgDelay: 38, flights: 1200, onTime: 68 },
    { route: 'DFW → ORD', avgDelay: 25, flights: 950, onTime: 80 },
    { route: 'BOS → LAX', avgDelay: 32, flights: 780, onTime: 75 },
    { route: 'MIA → ORD', avgDelay: 30, flights: 850, onTime: 76 },
    { route: 'SEA → JFK', avgDelay: 45, flights: 650, onTime: 62 },
    { route: 'PHX → ATL', avgDelay: 18, flights: 720, onTime: 85 },
    { route: 'LAS → DEN', avgDelay: 15, flights: 890, onTime: 88 },
  ];
  
  return routes.sort((a, b) => b.avgDelay - a.avgDelay);
};

// Airline performance data
export const generateAirlinePerformance = () => {
  return airlines.map((airline, index) => ({
    ...airline,
    rank: index + 1,
    totalFlights: Math.floor(15000 + Math.random() * 10000),
    delayRate: (15 + Math.random() * 20).toFixed(1),
    avgDelay: Math.floor(20 + Math.random() * 25),
    onTimeScore: Math.floor(65 + Math.random() * 25),
  }));
};

// Network topology metrics
export const networkMetrics = {
  totalNodes: 352,
  totalEdges: 8431,
  networkDensity: 0.73,
  avgPathLength: 2.4,
  clusteringCoefficient: 0.68,
  diameter: 6,
};

// Hub centrality scores
export const hubCentrality = [
  { airport: 'ATL', centrality: 0.95, criticalTo: 18, stars: 5 },
  { airport: 'ORD', centrality: 0.92, criticalTo: 16, stars: 5 },
  { airport: 'DFW', centrality: 0.88, criticalTo: 14, stars: 5 },
  { airport: 'DEN', centrality: 0.85, criticalTo: 13, stars: 4 },
  { airport: 'LAX', centrality: 0.82, criticalTo: 12, stars: 4 },
  { airport: 'JFK', centrality: 0.78, criticalTo: 11, stars: 4 },
  { airport: 'SFO', centrality: 0.75, criticalTo: 10, stars: 4 },
  { airport: 'IAH', centrality: 0.70, criticalTo: 9, stars: 3 },
  { airport: 'PHX', centrality: 0.68, criticalTo: 8, stars: 3 },
  { airport: 'CLT', centrality: 0.65, criticalTo: 7, stars: 3 },
];

// Vulnerability analysis
export const vulnerabilityAnalysis = [
  { airport: 'ATL', impactPercentage: 18, severity: 'high' },
  { airport: 'ORD', impactPercentage: 16, severity: 'high' },
  { airport: 'DFW', impactPercentage: 14, severity: 'high' },
  { airport: 'DEN', impactPercentage: 12, severity: 'medium' },
  { airport: 'LAX', impactPercentage: 11, severity: 'medium' },
  { airport: 'JFK', impactPercentage: 10, severity: 'medium' },
  { airport: 'SFO', impactPercentage: 9, severity: 'medium' },
  { airport: 'IAH', impactPercentage: 7, severity: 'low' },
];

export const delayReasons = [
  { reason: 'Weather', percentage: 35, color: '#3B82F6' },
  { reason: 'Mechanical', percentage: 25, color: '#6B7280' },
  { reason: 'ATC', percentage: 20, color: '#8B5CF6' },
  { reason: 'Crew', percentage: 12, color: '#F59E0B' },
  { reason: 'Other', percentage: 8, color: '#EC4899' },
];

// Preset scenarios
export const presetScenarios = [
  {
    id: 'weather-hub',
    title: 'Severe Weather at Major Hub',
    description: 'Simulate extreme weather disrupting a major airport',
    icon: '⛈️',
    defaultAirport: 'JFK',
    severity: 'severe',
    duration: 180,
  },
  {
    id: 'multi-airport',
    title: 'Multi-Airport Disruption',
    description: 'Regional weather affecting multiple airports',
    icon: '🌪️',
    defaultAirports: ['JFK', 'LGA', 'EWR'],
    severity: 'moderate',
    duration: 240,
  },
  {
    id: 'holiday-rush',
    title: 'Holiday Rush Congestion',
    description: 'High traffic volume during peak travel',
    icon: '✈️',
    severity: 'mild',
    duration: 360,
  },
  {
    id: 'cascading',
    title: 'Cascading Delays Coast to Coast',
    description: 'Delays propagating across the network',
    icon: '🔄',
    severity: 'severe',
    duration: 480,
  },
];
