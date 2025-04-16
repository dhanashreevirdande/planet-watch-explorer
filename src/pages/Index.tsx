
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Earth, Droplet, Thermometer, Wind, TreePine } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

// Sample data for environmental metrics
const temperatureData = [
  { month: "Jan", value: 1.2 },
  { month: "Feb", value: 1.1 },
  { month: "Mar", value: 1.3 },
  { month: "Apr", value: 1.4 },
  { month: "May", value: 1.5 },
  { month: "Jun", value: 1.7 },
  { month: "Jul", value: 1.8 },
  { month: "Aug", value: 1.9 },
  { month: "Sep", value: 1.8 },
  { month: "Oct", value: 1.6 },
  { month: "Nov", value: 1.4 },
  { month: "Dec", value: 1.3 },
];

const co2Data = [
  { month: "Jan", value: 418 },
  { month: "Feb", value: 420 },
  { month: "Mar", value: 422 },
  { month: "Apr", value: 424 },
  { month: "May", value: 426 },
  { month: "Jun", value: 428 },
  { month: "Jul", value: 430 },
  { month: "Aug", value: 432 },
  { month: "Sep", value: 430 },
  { month: "Oct", value: 428 },
  { month: "Nov", value: 426 },
  { month: "Dec", value: 424 },
];

const forestCoverData = [
  { year: "2000", value: 4100 },
  { year: "2005", value: 3950 },
  { year: "2010", value: 3800 },
  { year: "2015", value: 3700 },
  { year: "2020", value: 3650 },
  { year: "2025", value: 3620 },
];

const oceanAcidityData = [
  { year: "2000", value: 8.2 },
  { year: "2005", value: 8.17 },
  { year: "2010", value: 8.14 },
  { year: "2015", value: 8.11 },
  { year: "2020", value: 8.08 },
  { year: "2025", value: 8.05 },
];

const Index = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const chartConfig = {
    temperature: {
      label: "Global Temperature",
      color: "#ff4d4f",
    },
    co2: {
      label: "CO2 Levels",
      color: "#722ed1",
    },
    forest: {
      label: "Forest Cover",
      color: "#52c41a",
    },
    ocean: {
      label: "Ocean Health",
      color: "#1890ff",
    },
  };

  const handleRefreshData = () => {
    toast({
      title: "Dashboard Updated",
      description: "Latest planetary health metrics loaded",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Planetary Health Dashboard
        </h1>
        <p className="text-muted-foreground mb-4">
          Monitoring key environmental indicators and planetary vital signs
        </p>
        <Button 
          onClick={handleRefreshData}
          className="mb-4"
        >
          Refresh Data
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="Global Temperature" 
          value="+1.8°C" 
          description="Above pre-industrial levels" 
          trend="rising"
          icon={<Thermometer className="h-5 w-5 text-red-500" />}
        />
        <MetricCard 
          title="CO2 Concentration" 
          value="430 ppm" 
          description="Atmospheric carbon dioxide" 
          trend="rising"
          icon={<Wind className="h-5 w-5 text-purple-500" />}
        />
        <MetricCard 
          title="Forest Cover" 
          value="3.62 bn ha" 
          description="Global forest area" 
          trend="falling"
          icon={<TreePine className="h-5 w-5 text-green-500" />}
        />
        <MetricCard 
          title="Ocean Health" 
          value="pH 8.05" 
          description="Average ocean acidity" 
          trend="falling"
          icon={<Droplet className="h-5 w-5 text-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              Global Temperature Anomaly
            </CardTitle>
            <CardDescription>Monthly temperature deviation from baseline (°C)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff4d4f"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-purple-500" />
              Atmospheric CO2 Levels
            </CardTitle>
            <CardDescription>Monthly measurements (parts per million)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={co2Data}>
                    <XAxis dataKey="month" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#722ed1"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-green-500" />
              Global Forest Cover
            </CardTitle>
            <CardDescription>Changes over time (billion hectares)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forestCoverData}>
                    <XAxis dataKey="year" />
                    <YAxis domain={[3500, 4200]} />
                    <Bar
                      dataKey="value"
                      fill="#52c41a"
                      radius={[4, 4, 0, 0]}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              Ocean pH Levels
            </CardTitle>
            <CardDescription>Increasing acidity trend (lower pH = more acidic)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={oceanAcidityData}>
                    <XAxis dataKey="year" />
                    <YAxis domain={[8.0, 8.25]} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1890ff"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 text-center text-muted-foreground">
        <p>Data sources: NASA, NOAA, Global Carbon Project, FAO</p>
        <p className="text-sm mt-2">
          <Earth className="inline-block mr-1 h-4 w-4" /> 
          Planetary Health Dashboard • Updated: April 2025
        </p>
      </footer>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend: 'rising' | 'falling' | 'stable';
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, description, trend, icon }: MetricCardProps) => {
  const trendColor = 
    trend === 'rising' ? 'text-red-500' : 
    trend === 'falling' ? 'text-blue-500' : 
    'text-gray-500';
  
  const trendIcon = 
    trend === 'rising' ? '↑' : 
    trend === 'falling' ? '↓' : 
    '→';

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            {icon}
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className={`${trendColor} text-xl font-bold`}>
            {trendIcon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
