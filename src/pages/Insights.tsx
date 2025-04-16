
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart 
} from "recharts";
import { 
  ArrowRight, CircleAlert, TrendingUp, TrendingDown, 
  FileText, Zap, Wind, ThermometerSun, Droplet, TreePine 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for insights
const temperatureTrends = [
  { year: "1900", value: 0 },
  { year: "1920", value: 0.2 },
  { year: "1940", value: 0.3 },
  { year: "1960", value: 0.4 },
  { year: "1980", value: 0.7 },
  { year: "2000", value: 1.2 },
  { year: "2020", value: 1.8 },
  { year: "2040", value: 2.4, projection: true },
  { year: "2060", value: 3.1, projection: true },
  { year: "2080", value: 3.6, projection: true },
  { year: "2100", value: 4.2, projection: true },
];

const impactsByRegion = [
  { name: "North America", value: 32 },
  { name: "Asia", value: 38 },
  { name: "Europe", value: 20 },
  { name: "Africa", value: 5 },
  { name: "South America", value: 3 },
  { name: "Oceania", value: 2 },
];

const sectorEmissions = [
  { name: "Energy", value: 35 },
  { name: "Industry", value: 23 },
  { name: "Agriculture", value: 12 },
  { name: "Transport", value: 15 },
  { name: "Buildings", value: 8 },
  { name: "Other", value: 7 },
];

const actionImpact = [
  { name: "Renewable Energy", impact: 85 },
  { name: "Electric Vehicles", impact: 72 },
  { name: "Reforestation", impact: 65 },
  { name: "Sustainable Agriculture", impact: 58 },
  { name: "Building Efficiency", impact: 50 },
  { name: "Public Transit", impact: 45 },
  { name: "Diet Change", impact: 40 },
];

// Impact cards data
const insightCards = [
  {
    title: "Rising Sea Levels",
    description: "Global sea levels have risen by 8-9 inches since 1880, with the rate accelerating to 1.4 inches per decade.",
    icon: <Droplet className="h-8 w-8 text-blue-500" />,
    impact: "High",
    impactColor: "text-red-500"
  },
  {
    title: "Arctic Ice Loss",
    description: "The Arctic is losing 13.1% of its sea ice per decade, with complete summer ice loss projected by 2050.",
    icon: <ThermometerSun className="h-8 w-8 text-cyan-500" />,
    impact: "Severe",
    impactColor: "text-red-600"
  },
  {
    title: "Deforestation",
    description: "17% of the Amazon rainforest has been lost in the past 50 years, threatening biodiversity and increasing CO₂.",
    icon: <TreePine className="h-8 w-8 text-green-500" />,
    impact: "Critical",
    impactColor: "text-red-700"
  },
  {
    title: "Extreme Weather",
    description: "Severe weather events have increased by 35% since 1990, causing $1.7 trillion in damages globally.",
    icon: <Wind className="h-8 w-8 text-purple-500" />,
    impact: "High",
    impactColor: "text-red-500"
  }
];

// Research highlights
const researchItems = [
  {
    title: "New Carbon Capture Technologies Show Promise",
    source: "Nature Climate Change",
    date: "March 2025"
  },
  {
    title: "Climate Tipping Points May Be Triggered Earlier Than Expected",
    source: "Science",
    date: "February 2025"
  },
  {
    title: "Renewable Energy Costs Continue to Decline Rapidly",
    source: "Energy Policy",
    date: "January 2025"
  },
  {
    title: "Ocean Acidification Accelerating Faster Than Predicted",
    source: "Oceanography",
    date: "December 2024"
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Insights = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const { toast } = useToast();

  const handleShareClick = () => {
    toast({
      title: "Insights Shared",
      description: "Report has been shared to your contacts",
    });
  };

  const handleDownloadClick = () => {
    toast({
      title: "Downloading Report",
      description: "Your comprehensive climate report is being prepared",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Climate Insights & Analysis</h1>
            <p className="text-muted-foreground mt-1">
              In-depth analysis of planetary health trends and projections
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleShareClick}>
              Share Insights
            </Button>
            <Button onClick={handleDownloadClick}>
              Download Report
            </Button>
          </div>
        </div>

        {/* Key Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {insightCards.map((card, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{card.title}</span>
                  <span className={`text-sm ${card.impactColor}`}>{card.impact}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-2 bg-muted/50">
                    {card.icon}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Temperature Projection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-red-500" />
                Global Temperature Projections
              </CardTitle>
              <CardDescription>
                Historical and projected temperature rise (°C above pre-industrial levels)
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Button 
                  variant={selectedTimeframe === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedTimeframe("all")}
                >
                  All Time
                </Button>
                <Button 
                  variant={selectedTimeframe === "recent" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedTimeframe("recent")}
                >
                  Recent
                </Button>
                <Button 
                  variant={selectedTimeframe === "future" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedTimeframe("future")}
                >
                  Projections
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={temperatureTrends}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF4D4F" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF4D4F" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis 
                      label={{ value: '°C', angle: -90, position: 'insideLeft' }} 
                      domain={[0, 5]}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border p-2 rounded shadow-md">
                              <p className="font-bold">{`Year: ${label}`}</p>
                              <p className="text-red-500">{`Temperature: +${payload[0].value}°C`}</p>
                              {payload[0].payload.projection && (
                                <p className="text-xs text-muted-foreground">Projected</p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#FF4D4F" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Legend
                      payload={[
                        { value: 'Historical Data', type: 'line', color: '#FF4D4F' },
                        { value: 'Projected (Business as usual)', type: 'line', color: '#8884d8' }
                      ]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <CircleAlert className="h-5 w-5 text-red-500" />
                <p className="text-sm text-muted-foreground">
                  Current trajectory suggests warming of 3.2-5.4°C by 2100 without immediate action.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Climate Action Impact
              </CardTitle>
              <CardDescription>
                Potential impact of climate mitigation strategies (effectiveness score)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={actionImpact}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border p-2 rounded shadow-md">
                              <p className="font-bold">{label}</p>
                              <p className="text-green-500">{`Impact Score: ${payload[0].value}/100`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="impact" 
                      fill="#52C41A" 
                      radius={[0, 4, 4, 0]}
                      label={{ 
                        position: 'right', 
                        formatter: (value: number) => `${value}/100`,
                        fill: '#888',
                        fontSize: 12
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Climate Impact by Region
              </CardTitle>
              <CardDescription>
                Regional contribution to climate change (%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={impactsByRegion}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {impactsByRegion.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Contribution']}
                    />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-orange-500" />
                Emissions by Sector
              </CardTitle>
              <CardDescription>
                Global greenhouse gas emissions by economic sector (%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorEmissions}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sectorEmissions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Emissions']}
                    />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research and Updates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Latest Research Highlights
            </CardTitle>
            <CardDescription>
              Recent scientific findings and publications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {researchItems.map((item, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0">
                      View Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              View All Research Papers
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
