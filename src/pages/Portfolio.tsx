
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Stock, stockService } from '@/services/stockService';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, RefreshCw, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const Portfolio: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setIsLoading(true);
        const data = await stockService.getAllStocks();
        setStocks(data.filter(stock => stock.quantity !== 0));
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStocks();
  }, []);
  
  const totalValue = stocks.reduce((sum, stock) => sum + (stock.current_price * Math.abs(stock.quantity)), 0);
  
  const pieData = stocks.map(stock => ({
    name: stock.symbol,
    value: stock.current_price * Math.abs(stock.quantity),
    isLong: stock.quantity > 0
  }));
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];
  
  const getTickerPerformanceColor = (change: number) => 
    change > 0 ? 'text-success' : change < 0 ? 'text-destructive' : 'text-muted-foreground';
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar />
        
        <main className="px-6 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center animate-slide-down">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage your investment portfolio
                </p>
              </div>
              
              <Button>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">${totalValue.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Long Positions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-success mr-2" />
                    <span className="text-2xl font-bold">
                      ${stocks
                        .filter(stock => stock.quantity > 0)
                        .reduce((sum, stock) => sum + (stock.current_price * stock.quantity), 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Short Positions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingDown className="h-5 w-5 text-destructive mr-2" />
                    <span className="text-2xl font-bold">
                      ${Math.abs(stocks
                        .filter(stock => stock.quantity < 0)
                        .reduce((sum, stock) => sum + (stock.current_price * stock.quantity), 0))
                        .toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-success mr-2" />
                    <span className="text-2xl font-bold">+12.8%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
              <Card className="glass-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Holdings</CardTitle>
                  <CardDescription>Your current stock positions</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : stocks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No stocks in your portfolio
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stocks.map((stock) => (
                          <TableRow key={stock.id}>
                            <TableCell className="font-medium">{stock.symbol}</TableCell>
                            <TableCell>
                              <Badge variant={stock.quantity > 0 ? "success" : "destructive"}>
                                {stock.quantity > 0 ? "Long" : "Short"}
                              </Badge>
                            </TableCell>
                            <TableCell>{Math.abs(stock.quantity)}</TableCell>
                            <TableCell>${stock.current_price.toFixed(2)}</TableCell>
                            <TableCell className="font-medium">
                              ${(stock.current_price * Math.abs(stock.quantity)).toFixed(2)}
                            </TableCell>
                            <TableCell className={getTickerPerformanceColor(stock.percent_change)}>
                              {stock.percent_change > 0 ? '+' : ''}{stock.percent_change}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Allocation</CardTitle>
                  <CardDescription>Portfolio distribution by asset</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : stocks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <PieChartIcon className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground">No allocation data</p>
                    </div>
                  ) : (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Performance History</CardTitle>
                  <CardDescription>Portfolio value over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Stocks', value: 70 },
                            { name: 'Bonds', value: 10 },
                            { name: 'Cash', value: 20 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#8884d8" />
                          <Cell fill="#82ca9d" />
                          <Cell fill="#ffc658" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                  <CardDescription>Risk metrics and volatility assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Alpha</span>
                        <span className="text-sm font-medium">1.2</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full">
                        <div className="h-full bg-success rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Beta</span>
                        <span className="text-sm font-medium">0.85</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full">
                        <div className="h-full bg-success rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                        <span className="text-sm font-medium">1.65</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full">
                        <div className="h-full bg-success rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Volatility</span>
                        <span className="text-sm font-medium">12.5%</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
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

export default Portfolio;
