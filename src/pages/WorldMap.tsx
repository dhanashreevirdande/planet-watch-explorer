import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Info, Globe, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Map from "@/components/Map";

// Define some regions with sample data
const regions = [
  { 
    id: "north-america", 
    name: "North America", 
    riskLevel: "Medium",
    temperature: "+1.6°C",
    co2: "420 ppm",
    forestCover: "-1.2% annually",
    oceanHealth: "pH 8.08"
  },
  { 
    id: "south-america", 
    name: "South America", 
    riskLevel: "High",
    temperature: "+1.4°C",
    co2: "415 ppm",
    forestCover: "-2.6% annually",
    oceanHealth: "pH 8.10"
  },
  { 
    id: "europe", 
    name: "Europe", 
    riskLevel: "Medium",
    temperature: "+1.9°C",
    co2: "430 ppm",
    forestCover: "+0.3% annually",
    oceanHealth: "pH 8.05"
  },
  { 
    id: "africa", 
    name: "Africa", 
    riskLevel: "Very High",
    temperature: "+1.7°C",
    co2: "412 ppm",
    forestCover: "-3.1% annually",
    oceanHealth: "pH 8.12"
  },
  { 
    id: "asia", 
    name: "Asia", 
    riskLevel: "High",
    temperature: "+1.8°C",
    co2: "435 ppm",
    forestCover: "-1.9% annually",
    oceanHealth: "pH 8.03"
  },
  { 
    id: "oceania", 
    name: "Oceania", 
    riskLevel: "Medium",
    temperature: "+1.5°C",
    co2: "418 ppm",
    forestCover: "-0.8% annually",
    oceanHealth: "pH 8.01"
  },
];

const WorldMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
    
    const region = regions.find(r => r.id === regionId);
    if (region) {
      toast({
        title: `${region.name} Selected`,
        description: `Risk Level: ${region.riskLevel}`,
      });
    }
  };

  const filteredRegions = regions.filter(region => 
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedRegionData = regions.find(region => region.id === selectedRegion);

  const getColorForRiskLevel = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-500 text-white";
      case "Medium": return "bg-yellow-500 text-white";
      case "High": return "bg-orange-500 text-white";
      case "Very High": return "bg-red-500 text-white";
      default: return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Interactive World Map</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Global Climate Impact Map
                </CardTitle>
                <CardDescription>
                  Explore global climate data through our interactive visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Map />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Region Details
                </CardTitle>
                <CardDescription>
                  {selectedRegionData 
                    ? `Climate data for ${selectedRegionData.name}` 
                    : "Select a region to view details"}
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search regions..."
                    className="w-full rounded-md border border-input pl-8 pr-4 py-2 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {selectedRegionData ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Risk Level:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getColorForRiskLevel(selectedRegionData.riskLevel)}`}>
                        {selectedRegionData.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Temperature:</span>
                      <span>{selectedRegionData.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">CO₂ Levels:</span>
                      <span>{selectedRegionData.co2}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Forest Cover:</span>
                      <span>{selectedRegionData.forestCover}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Ocean Health:</span>
                      <span>{selectedRegionData.oceanHealth}</span>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          This region requires immediate climate action to mitigate increasing risks.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                      {filteredRegions.length > 0 ? (
                        filteredRegions.map(region => (
                          <li key={region.id}>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-between"
                              onClick={() => handleRegionClick(region.id)}
                            >
                              <span>{region.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getColorForRiskLevel(region.riskLevel)}`}>
                                {region.riskLevel}
                              </span>
                            </Button>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-3 text-sm text-muted-foreground">
                          No regions found
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
