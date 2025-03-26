import React, { useState, useEffect } from 'react';
import { Stock, stockService } from '@/services/stockService';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import StockGrid from '@/components/dashboard/StockGrid';
import SubGrid from '@/components/dashboard/SubGrid';
import PriceChart from '@/components/charts/PriceChart';
import ProfitSimulator from '@/components/simulator/ProfitSimulator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import { TrendingUp, DollarSign, BarChart3, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<string>('AAPL');
  
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setIsLoading(true);
        const data = await stockService.getAllStocks();
        setStocks(data);
        
        if (data.length > 0) {
          setSelectedStock(data[0].symbol);
        }
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStocks();
  }, []);
  
  const portfolioValue = stocks.reduce((total, stock) => {
    return total + (stock.quantity * stock.current_price);
  }, 0);
  
  const dayChange = stocks.reduce((total, stock) => {
    return total + (stock.quantity * stock.change_amount);
  }, 0);
  
  const dayChangePercent = (dayChange / (portfolioValue - dayChange)) * 100;
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar />
        
        <main className="px-6 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="animate-slide-down">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Monitor your portfolio and market trends
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">Portfolio Value</div>
                  <div className="bg-primary/10 text-primary rounded-full p-2">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold">${portfolioValue.toFixed(2)}</div>
                  <div className={`text-sm mt-1 flex items-center ${dayChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {dayChange >= 0 ? "+" : ""}{dayChange.toFixed(2)} ({dayChangePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">Active Positions</div>
                  <div className="bg-info/10 text-info rounded-full p-2">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold">{stocks.length}</div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center">
                    <span>{stocks.filter(s => s.quantity > 0).length} long · {stocks.filter(s => s.quantity < 0).length} short</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">Breakout Alerts</div>
                  <div className="bg-warning/10 text-warning rounded-full p-2">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold">{stocks.filter(s => s.is_breakout).length}</div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center">
                    <span>Stocks breaking resistance</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">Recent Trades</div>
                  <div className="bg-success/10 text-success rounded-full p-2">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center">
                    <span>Trades in last 7 days</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
              <div className="lg:col-span-2">
                <div className="glass-card rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-border/40">
                    <h2 className="font-semibold text-lg">Market Overview</h2>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center py-24">
                      <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <PriceChart 
                      symbol={selectedStock} 
                      title={`${selectedStock} Price History`}
                      description="Historical price data with trend analysis"
                      height={350}
                    />
                  )}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                {isLoading ? (
                  <div className="glass-card rounded-lg flex justify-center items-center" style={{ height: '456px' }}>
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ProfitSimulator stocks={stocks} />
                )}
              </div>
            </div>
            
            <div className="space-y-4 animate-slide-up">
              <h2 className="font-semibold text-lg">Stock Positions</h2>
              <StockGrid />
            </div>
            
            <div className="space-y-4 animate-slide-up">
              <h2 className="font-semibold text-lg">Trading Opportunities</h2>
              <Tabs defaultValue="buy">
                <TabsList className="mb-4">
                  <TabsTrigger value="buy">Buy Opportunities</TabsTrigger>
                  <TabsTrigger value="sell">Sell Signals</TabsTrigger>
                </TabsList>
                
                <TabsContent value="buy" className="mt-0">
                  <SubGrid filter="buyable" />
                </TabsContent>
                
                <TabsContent value="sell" className="mt-0">
                  <SubGrid filter="sellable" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
