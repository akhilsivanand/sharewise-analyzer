import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Stock, StockDetails, stockService } from '@/services/stockService';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import PriceChart from '@/components/charts/PriceChart';
import StockGrid from '@/components/dashboard/StockGrid';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  DollarSign,
  Info,
  LineChart,
  BarChart3,
  History,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Stocks: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const stocksData = await stockService.getAllStocks();
        setStocks(stocksData);
        
        if (symbol) {
          const details = await stockService.getStockBySymbol(symbol);
          setStockDetails(details || null);
        }
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [symbol]);
  
  const handleTrade = async (action: 'buy' | 'sell') => {
    if (!stockDetails) return;
    
    try {
      const result = action === 'buy' 
        ? await stockService.executeBuyOrder(stockDetails.symbol, 10)
        : await stockService.executeSellOrder(stockDetails.symbol, 10);
      
      toast({
        title: result.status === 'success' ? 'Success' : 'Error',
        description: result.message,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to execute trade',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar />
        
        <main className="px-6 py-6 max-w-7xl mx-auto">
          {symbol && stockDetails ? (
            <div className="flex flex-col space-y-6 animate-slide-down">
              <div className="flex items-center space-x-2">
                <Link to="/stocks" className="text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">{stockDetails.symbol}</h1>
                <span className="text-xl text-muted-foreground">{stockDetails.company}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 glass-card">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">
                          ${stockDetails.current_price.toFixed(2)}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <div className={cn(
                            "flex items-center mr-2",
                            stockDetails.change_percent >= 0 ? "text-success" : "text-destructive"
                          )}>
                            {stockDetails.change_percent >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span>
                              {stockDetails.change_percent >= 0 ? "+" : ""}
                              {stockDetails.change_percent.toFixed(2)}%
                            </span>
                          </div>
                          <span className="text-muted-foreground">
                            {stockDetails.change_amount >= 0 ? "+" : ""}
                            {stockDetails.change_amount.toFixed(2)} today
                          </span>
                        </CardDescription>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTrade('buy')}
                          className="bg-success/10 border-success/30 text-success hover:bg-success/20"
                        >
                          Buy
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTrade('sell')}
                          className="bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
                        >
                          Sell
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <PriceChart symbol={stockDetails.symbol} height={350} />
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Position Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Position</span>
                        <span className="font-medium">
                          {stockDetails.quantity > 0 ? 'Long' : stockDetails.quantity < 0 ? 'Short' : 'None'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity</span>
                        <span className="font-medium">{Math.abs(stockDetails.quantity)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Market Value</span>
                        <span className="font-medium">
                          ${(Math.abs(stockDetails.quantity) * stockDetails.current_price).toFixed(2)}
                        </span>
                      </div>
                      
                      <Separator />
                      
                      <div className="pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Profit/Loss</span>
                          <span className="font-medium text-success">+$1,247.50</span>
                        </div>
                        <div className="text-xs text-muted-foreground text-right mt-1">
                          +8.23% since purchase
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Key Levels</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Support Levels</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <div className="text-xs text-muted-foreground">S1</div>
                            <div className="font-medium">${stockDetails.support_levels.S1.toFixed(2)}</div>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <div className="text-xs text-muted-foreground">S2</div>
                            <div className="font-medium">${stockDetails.support_levels.S2.toFixed(2)}</div>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <div className="text-xs text-muted-foreground">S3</div>
                            <div className="font-medium">${stockDetails.support_levels.S3.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Target Levels</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <div className="text-xs text-muted-foreground">T1</div>
                            <div className="font-medium">${stockDetails.target_levels.T1.toFixed(2)}</div>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <div className="text-xs text-muted-foreground">T2</div>
                            <div className="font-medium">${stockDetails.target_levels.T2.toFixed(2)}</div>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <div className="text-xs text-muted-foreground">T3</div>
                            <div className="font-medium">${stockDetails.target_levels.T3.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Range</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <div className="text-xs text-muted-foreground">Day Range</div>
                            <div className="font-medium">
                              ${stockDetails.historical.day.low.toFixed(2)} - ${stockDetails.historical.day.high.toFixed(2)}
                            </div>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center">
                            <div className="text-xs text-muted-foreground">52W Range</div>
                            <div className="font-medium">
                              ${stockDetails.historical.month.low.toFixed(2)} - ${stockDetails.historical.month.high.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="glass-card rounded-lg overflow-hidden animate-slide-up">
                <Tabs defaultValue="overview">
                  <div className="border-b border-border/40">
                    <TabsList className="h-12 rounded-none bg-transparent border-b">
                      <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                        <Info className="h-4 w-4 mr-2" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="financials" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Financials
                      </TabsTrigger>
                      <TabsTrigger value="analysis" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                        <LineChart className="h-4 w-4 mr-2" />
                        Analysis
                      </TabsTrigger>
                      <TabsTrigger value="history" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                        <History className="h-4 w-4 mr-2" />
                        Trade History
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="overview" className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Company Profile</h3>
                        <p className="text-muted-foreground">
                          {stockDetails.company} is a leading technology company that designs, manufactures, and markets consumer electronics, software, and online services.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Market Cap</div>
                            <div className="font-medium">$2.45T</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">P/E Ratio</div>
                            <div className="font-medium">24.8</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Dividend Yield</div>
                            <div className="font-medium">0.65%</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Beta</div>
                            <div className="font-medium">1.2</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Price Fluctuations</h3>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-3 bg-muted/50 rounded-md">
                            <div className="text-sm text-muted-foreground">Daily</div>
                            <div className={cn(
                              "text-lg font-medium",
                              stockDetails.fluctuations.daily.startsWith('+') ? "text-success" : "text-destructive"
                            )}>
                              {stockDetails.fluctuations.daily}
                            </div>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-md">
                            <div className="text-sm text-muted-foreground">Weekly</div>
                            <div className={cn(
                              "text-lg font-medium",
                              stockDetails.fluctuations.weekly.startsWith('+') ? "text-success" : "text-destructive"
                            )}>
                              {stockDetails.fluctuations.weekly}
                            </div>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-md">
                            <div className="text-sm text-muted-foreground">Monthly</div>
                            <div className={cn(
                              "text-lg font-medium",
                              stockDetails.fluctuations.monthly.startsWith('+') ? "text-success" : "text-destructive"
                            )}>
                              {stockDetails.fluctuations.monthly}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="text-sm text-muted-foreground mb-2">Volume Analysis</div>
                          <div className="h-12 bg-muted/30 rounded-md overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center px-4">
                              <div className="w-full bg-muted/70 h-0.5 rounded-full">
                                <div className="bg-primary h-0.5 rounded-full" style={{ width: '65%' }}></div>
                                <div className="absolute top-1/2 left-[65%] -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                              </div>
                            </div>
                            <div className="absolute bottom-1 left-4 text-xs text-muted-foreground">Low</div>
                            <div className="absolute bottom-1 right-4 text-xs text-muted-foreground">High</div>
                            <div className="absolute top-1 left-[65%] text-xs text-primary font-medium">Current</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="financials" className="p-6">
                    <div className="text-center py-12 text-muted-foreground">
                      <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <h3 className="text-lg font-medium mb-2">Financial data coming soon</h3>
                      <p>We're working on gathering comprehensive financial data for {stockDetails.symbol}.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analysis" className="p-6">
                    <div className="text-center py-12 text-muted-foreground">
                      <LineChart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <h3 className="text-lg font-medium mb-2">Technical analysis coming soon</h3>
                      <p>We're working on providing detailed technical analysis for {stockDetails.symbol}.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="p-6">
                    <div className="text-center py-12 text-muted-foreground">
                      <History className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <h3 className="text-lg font-medium mb-2">Trade history coming soon</h3>
                      <p>We're working on collecting your trade history for {stockDetails.symbol}.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : !symbol ? (
            <div className="animate-slide-down">
              <h1 className="text-3xl font-bold tracking-tight">Stocks</h1>
              <p className="text-muted-foreground mt-1">
                Manage your stock holdings and monitor performance
              </p>
              
              <div className="mt-6 space-y-4">
                <StockGrid />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h2 className="text-xl font-medium">Loading stock data...</h2>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Stocks;
