
import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { stockService } from '@/services/stockService';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Change the import to get ReloadIcon from lucide-react instead
import { RefreshCw } from 'lucide-react';

interface PriceChartProps {
  symbol: string;
  title?: string;
  description?: string;
  className?: string;
  height?: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ 
  symbol, 
  title = 'Price History', 
  description,
  className,
  height = 300
}) => {
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [period, setPeriod] = useState<number>(30);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await stockService.getHistoricalPrices(symbol, period);
        setHistoricalData(data);
      } catch (error) {
        console.error('Failed to fetch historical prices:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [symbol, period]);
  
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };
  
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };
  
  const calculateDomain = () => {
    if (historicalData.length === 0) return [0, 0];
    const prices = historicalData.map(data => data.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <div className="flex space-x-2 mt-2">
          <Button 
            variant={period === 7 ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setPeriod(7)}
            className="text-xs h-7"
          >
            1W
          </Button>
          <Button 
            variant={period === 30 ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setPeriod(30)}
            className="text-xs h-7"
          >
            1M
          </Button>
          <Button 
            variant={period === 90 ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setPeriod(90)}
            className="text-xs h-7"
          >
            3M
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart
              data={historicalData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate} 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                domain={calculateDomain()} 
                tickFormatter={formatCurrency} 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                name={`${symbol} Price`}
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--background))' }}
                fill="url(#colorPrice)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceChart;
