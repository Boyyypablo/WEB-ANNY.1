
import { useState, useMemo } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { format, subDays, isWithinInterval, startOfDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SymptomEntry } from "@/types/symptoms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SymptomTrendsChartProps {
  entries: SymptomEntry[];
}

interface ChartEntry {
  date: string;
  [key: string]: string | number;
}

export function SymptomTrendsChart({ entries }: SymptomTrendsChartProps) {
  const [timeFrame, setTimeFrame] = useState<"7" | "30" | "90">("30");
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Create chart data, grouping by date and symptom type
  const chartData = useMemo(() => {
    if (!entries.length) return [];

    const cutoffDate = subDays(new Date(), parseInt(timeFrame));
    
    // Filter entries by selected time frame
    const filteredEntries = entries.filter(entry => {
      if (!entry.created_at) return false;
      const entryDate = parseISO(entry.created_at);
      return isWithinInterval(entryDate, {
        start: startOfDay(cutoffDate),
        end: new Date()
      });
    });

    // Group entries by date
    const groupedByDate = filteredEntries.reduce((acc, entry) => {
      if (!entry.created_at) return acc;
      
      const dateStr = format(parseISO(entry.created_at), 'yyyy-MM-dd');
      
      if (!acc[dateStr]) {
        acc[dateStr] = {
          date: format(parseISO(entry.created_at), 'dd/MM', { locale: ptBR }),
          dateObj: parseISO(entry.created_at)
        };
      }
      
      // Add intensity for each symptom type
      acc[dateStr][entry.symptom_type] = entry.intensity;
      
      return acc;
    }, {} as Record<string, any>);
    
    // Convert to array and sort by date
    return Object.values(groupedByDate)
      .sort((a, b) => a.dateObj - b.dateObj)
      .map(({ dateObj, ...rest }) => rest); // Remove the dateObj helper property
  }, [entries, timeFrame]);

  // Get unique symptom types for the chart legend
  const uniqueSymptomTypes = useMemo(() => {
    const types = new Set<string>();
    entries.forEach(entry => types.add(entry.symptom_type));
    return Array.from(types);
  }, [entries]);

  // Get colors for each symptom type
  const getSymptomColor = (index: number) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];
    return colors[index % colors.length];
  };

  // Average intensity per symptom type
  const avgIntensityBySymptom = useMemo(() => {
    const totals: Record<string, { count: number, sum: number }> = {};
    
    entries.forEach(entry => {
      if (!totals[entry.symptom_type]) {
        totals[entry.symptom_type] = { count: 0, sum: 0 };
      }
      
      totals[entry.symptom_type].count += 1;
      totals[entry.symptom_type].sum += entry.intensity;
    });
    
    return Object.entries(totals).map(([symptom, { count, sum }]) => ({
      symptom,
      average: Math.round((sum / count) * 10) / 10 // Round to 1 decimal place
    }));
  }, [entries]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle>Tendências de Sintomas</CardTitle>
          <div className="flex gap-2 items-center">
            <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as "7" | "30" | "90")}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <p>Nenhum registro encontrado para visualização</p>
          </div>
        ) : (
          <Tabs defaultValue="trends" className="space-y-4">
            <TabsList>
              <TabsTrigger value="trends">Tendências</TabsTrigger>
              <TabsTrigger value="comparison">Comparação</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trends" className="space-y-4">
              <div className="bg-card rounded-md border p-2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "line" ? (
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip content={(props) => (
                        <div className="rounded-md border bg-background p-2 shadow-md">
                          <div className="font-medium">{props.label}</div>
                          {props.payload?.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span>{entry.name}: {entry.value}</span>
                            </div>
                          ))}
                        </div>
                      )} />
                      <Legend />
                      {uniqueSymptomTypes.map((symptom, index) => (
                        <Line
                          key={symptom}
                          type="monotone"
                          dataKey={symptom}
                          stroke={getSymptomColor(index)}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  ) : (
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      {uniqueSymptomTypes.map((symptom, index) => (
                        <Bar
                          key={symptom}
                          dataKey={symptom}
                          fill={getSymptomColor(index)}
                        />
                      ))}
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-end">
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant={chartType === "line" ? "default" : "outline"}
                    onClick={() => setChartType("line")}
                    className={chartType === "line" ? "bg-muted" : ""}
                  >
                    Linha
                  </Button>
                  <Button
                    size="sm"
                    variant={chartType === "bar" ? "default" : "outline"}
                    onClick={() => setChartType("bar")}
                    className={chartType === "bar" ? "bg-muted" : ""}
                  >
                    Barra
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comparison" className="h-[300px]">
              <ChartContainer config={{}} className="h-full">
                <BarChart data={avgIntensityBySymptom}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symptom" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="average"
                    name="Intensidade Média"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
