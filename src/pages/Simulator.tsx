
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ProfitSimulator from '@/components/simulator/ProfitSimulator';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { DollarSign, Calculator, TrendingUp, ArrowUpRight, Clock, BarChart3 } from 'lucide-react';

// Mock historical price data
const historicalData = [
  { date: '2024-01', price: 150.00 },
  { date: '2024-02', price: 155.50 },
  { date: '2024-03', price: 148.75 },
  { date: '2024-04', price: 160.25 },
  { date: '2024-05', price: 165.30 },
  { date: '2024-06', price: 172.45 },
  { date: '2024-07', price: 168.90 },
  { date: '2024-08', price: 175.20 },
  { date: '2024-09', price: 180.50 },
  { date: '2024-10', price: 185.75 },
  { date: '2024-11', price: 182.30 },
  { date: '2024-12', price: 190.25 },
  { date: '2025-01', price: 195.50 },
  { date: '2025-02', price: 200.75 },
  { date: '2025-03', price: 205.25 },
];

// Mock projected scenarios
const projectedScenarios = {
  bullish: historicalData.map(point => ({ 
    date: point.date, 
    price: point.price,
    projected: point.date > '2025-01' ? point.price * 1.2 : null
  })),
  neutral: historicalData.map(point => ({ 
    date: point.date, 
    price: point.price,
    projected: point.date > '2025-01' ? point.price * 1.05 : null
  })),
  bearish: historicalData.map(point => ({ 
    date: point.date, 
    price: point.price,
    projected: point.date > '2025-01' ? point.price * 0.85 : null
  })),
};

// Mock stock symbols
const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA'];

const Simulator: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [quantity, setQuantity] = useState(10);
  const [buyPrice, setBuyPrice] = useState(200);
  const [sellPrice, setSellPrice] = useState(220);
  const [scenarioType, setScenarioType] = useState('neutral');
  const [holdingPeriod, setHoldingPeriod] = useState(180); // in days
  
  // Handle quantity change from slider
  const handleQuantityChange = (value: number[]) => {
    setQuantity(value[0]);
  };
  
  // Calculate profit/loss
  const calculateProfit = () => {
    const investment = buyPrice * quantity;
    const returnValue = sellPrice * quantity;
    const profitValue = returnValue - investment;
    const profitPercent = (profitValue / investment) * 100;
    
    return {
      investment,
      returnValue,
      profitValue,
      profitPercent
    };
  };
  
  const profit = calculateProfit();
  
  // Prepare data for profit chart based on different sell prices
  const profitChartData = Array.from({ length: 11 }, (_, i) => {
    const priceFactor = 0.8 + (i * 0.04); // From -20% to +20% of buy price
    const potentialSellPrice = buyPrice * priceFactor;
    const potentialProfit = (potentialSellPrice - buyPrice) * quantity;
    const potentialProfitPercent = ((potentialSellPrice / buyPrice) - 1) * 100;
    
    return {
      priceFactor: `${(priceFactor * 100 - 100).toFixed(0)}%`,
      sellPrice: potentialSellPrice.toFixed(2),
      profit: potentialProfit,
      profitPercent: potentialProfitPercent
    };
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar />
        
        <main className="px-6 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center animate-slide-down">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Profit Simulator</h1>
                <p className="text-muted-foreground mt-1">
                  Simulate potential trading outcomes and scenarios
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
              <Card className="glass-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Trade Simulator</CardTitle>
                  <CardDescription>Estimate potential profit or loss from a trade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stock Symbol</label>
                        <Select value={selectedStock} onValueChange={setSelectedStock}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stock" />
                          </SelectTrigger>
                          <SelectContent>
                            {stockSymbols.map(symbol => (
                              <SelectItem key={symbol} value={symbol}>{symbol}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Buy Price ($)</label>
                        <Input 
                          type="number" 
                          value={buyPrice}
                          onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                          min={0}
                          step={0.01}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sell Price ($)</label>
                        <Input 
                          type="number" 
                          value={sellPrice}
                          onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                          min={0}
                          step={0.01}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Quantity: {quantity} shares</label>
                          <span className="text-sm text-muted-foreground">
                            Investment: ${(buyPrice * quantity).toFixed(2)}
                          </span>
                        </div>
                        <Slider
                          defaultValue={[quantity]}
                          max={100}
                          min={1}
                          step={1}
                          onValueChange={handleQuantityChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                      <Card className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Investment</span>
                          </div>
                          <div className="text-2xl font-bold mt-2">
                            ${profit.investment.toFixed(2)}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Calculator className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Return</span>
                          </div>
                          <div className="text-2xl font-bold mt-2">
                            ${profit.returnValue.toFixed(2)}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className={`${profit.profitValue >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className={`h-4 w-4 ${profit.profitValue >= 0 ? 'text-success' : 'text-destructive'}`} />
                            <span className="text-sm font-medium">Profit/Loss</span>
                          </div>
                          <div className={`text-2xl font-bold mt-2 ${profit.profitValue >= 0 ? 'text-success' : 'text-destructive'}`}>
                            ${profit.profitValue.toFixed(2)}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className={`${profit.profitValue >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <ArrowUpRight className={`h-4 w-4 ${profit.profitValue >= 0 ? 'text-success' : 'text-destructive'}`} />
                            <span className="text-sm font-medium">Return %</span>
                          </div>
                          <div className={`text-2xl font-bold mt-2 ${profit.profitValue >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {profit.profitPercent.toFixed(2)}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="h-64 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={profitChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="priceFactor" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: any) => [`$${value.toFixed(2)}`, 'Profit/Loss']}
                            labelFormatter={(value) => `Price change: ${value}`}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="profit" 
                            stroke="#8884d8" 
                            fill="#8884d8" 
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Market Scenarios</CardTitle>
                  <CardDescription>Project different market conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Select value={scenarioType} onValueChange={setScenarioType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bullish">Bullish (+20%)</SelectItem>
                        <SelectItem value="neutral">Neutral (+5%)</SelectItem>
                        <SelectItem value="bearish">Bearish (-15%)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Holding Period: {holdingPeriod} days</label>
                      </div>
                      <Slider
                        defaultValue={[holdingPeriod]}
                        max={365}
                        min={1}
                        step={1}
                        onValueChange={(value) => setHoldingPeriod(value[0])}
                      />
                    </div>
                    
                    <div className="h-48 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={projectedScenarios[scenarioType as keyof typeof projectedScenarios]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#82ca9d" 
                            dot={false}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="projected" 
                            stroke="#8884d8" 
                            strokeDasharray="5 5"
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Time Horizon</span>
                        </div>
                        <span className="text-sm font-medium">{holdingPeriod} days</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Projected Change</span>
                        </div>
                        <span className={`text-sm font-medium ${
                          scenarioType === 'bullish' ? 'text-success' : 
                          scenarioType === 'bearish' ? 'text-destructive' : ''
                        }`}>
                          {scenarioType === 'bullish' ? '+20%' : 
                           scenarioType === 'neutral' ? '+5%' : 
                           '-15%'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Expected Return</span>
                        </div>
                        <span className={`text-sm font-medium ${
                          scenarioType === 'bullish' ? 'text-success' : 
                          scenarioType === 'bearish' ? 'text-destructive' : ''
                        }`}>
                          {scenarioType === 'bullish' ? `+$${(buyPrice * 0.2 * quantity).toFixed(2)}` : 
                           scenarioType === 'neutral' ? `+$${(buyPrice * 0.05 * quantity).toFixed(2)}` : 
                           `-$${(buyPrice * 0.15 * quantity).toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="glass-card animate-slide-up">
              <CardHeader>
                <CardTitle>Advanced Profit Simulator</CardTitle>
                <CardDescription>Visualize potential outcomes with detailed parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfitSimulator />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                  <CardDescription>Evaluate potential risks of your simulated trade</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="risk" className="w-full">
                    <TabsList className="mb-4 w-full">
                      <TabsTrigger value="risk" className="flex-1">Risk Metrics</TabsTrigger>
                      <TabsTrigger value="downside" className="flex-1">Downside</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="risk">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Risk/Reward Ratio</span>
                            <span className="text-sm font-medium">1:2.5</span>
                          </div>
                          <div className="w-full h-2 bg-muted/50 rounded-full">
                            <div className="h-full bg-success rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Volatility (30-day)</span>
                            <span className="text-sm font-medium">18.5%</span>
                          </div>
                          <div className="w-full h-2 bg-muted/50 rounded-full">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Maximum Drawdown</span>
                            <span className="text-sm font-medium text-destructive">-15.2%</span>
                          </div>
                          <div className="w-full h-2 bg-muted/50 rounded-full">
                            <div className="h-full bg-destructive rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Win Probability</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <div className="w-full h-2 bg-muted/50 rounded-full">
                            <div className="h-full bg-success rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="downside">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">5% Price Drop</span>
                          <span className="text-sm font-medium text-destructive">
                            -${(buyPrice * 0.05 * quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">10% Price Drop</span>
                          <span className="text-sm font-medium text-destructive">
                            -${(buyPrice * 0.1 * quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">15% Price Drop</span>
                          <span className="text-sm font-medium text-destructive">
                            -${(buyPrice * 0.15 * quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">20% Price Drop</span>
                          <span className="text-sm font-medium text-destructive">
                            -${(buyPrice * 0.2 * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Profit Optimization</CardTitle>
                  <CardDescription>Find the optimal trading parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Optimal Entry Price</label>
                      <div className="relative mt-1">
                        <div className="flex items-center">
                          <Input 
                            className="pr-16" 
                            value={(buyPrice * 0.95).toFixed(2)} 
                            readOnly 
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <span className="text-sm text-success font-medium mr-3">-5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Optimal Exit Price</label>
                      <div className="relative mt-1">
                        <div className="flex items-center">
                          <Input 
                            className="pr-16" 
                            value={(buyPrice * 1.15).toFixed(2)} 
                            readOnly 
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <span className="text-sm text-success font-medium mr-3">+15%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Optimal Position Size</label>
                      <div className="relative mt-1">
                        <div className="flex items-center">
                          <Input 
                            className="pr-16" 
                            value={Math.round(quantity * 1.2)} 
                            readOnly 
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <span className="text-sm text-success font-medium mr-3">+20%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Recommended Stop Loss</label>
                      <div className="relative mt-1">
                        <div className="flex items-center">
                          <Input 
                            className="pr-16" 
                            value={(buyPrice * 0.93).toFixed(2)} 
                            readOnly 
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <span className="text-sm text-destructive font-medium mr-3">-7%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">Apply Optimal Parameters</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Simulator;
