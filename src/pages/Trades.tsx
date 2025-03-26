import React, { useState, useEffect } from 'react';
import { Trade, Stock, stockService } from '@/services/stockService';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import TradeForm from '@/components/forms/TradeForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, ArrowDownUp, ArrowUpDown, ChevronDown, Filter, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const Trades: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTradeFormOpen, setIsTradeFormOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [tradesData, stocksData] = await Promise.all([
          stockService.getAllTrades(),
          stockService.getAllStocks()
        ]);
        setTrades(tradesData);
        setStocks(stocksData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const getStockSymbolLetter = (symbol: string) => {
    return symbol.substring(0, 1);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/15 text-success border-success/30';
      case 'pending':
        return 'bg-warning/15 text-warning border-warning/30';
      case 'cancelled':
        return 'bg-destructive/15 text-destructive border-destructive/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const handleTradeSuccess = async () => {
    setIsTradeFormOpen(false);
    try {
      setIsLoading(true);
      const tradesData = await stockService.getAllTrades();
      setTrades(tradesData);
    } catch (error) {
      console.error('Failed to refresh trades:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar />
        
        <main className="px-6 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center animate-slide-down">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Trades</h1>
                <p className="text-muted-foreground mt-1">
                  Manage and track your trading activity
                </p>
              </div>
              
              <Dialog open={isTradeFormOpen} onOpenChange={setIsTradeFormOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New Trade
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>New Trade</DialogTitle>
                    <DialogDescription>
                      Enter the details to record a new trade
                    </DialogDescription>
                  </DialogHeader>
                  <TradeForm stocks={stocks} onSuccess={handleTradeSuccess} />
                </DialogContent>
              </Dialog>
            </div>
            
            <Card className="glass-card overflow-hidden border-border/40 animate-slide-up">
              <div className="flex justify-between items-center p-4 border-b border-border/40">
                <CardTitle className="text-lg">Trade History</CardTitle>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3.5 w-3.5 mr-2" />
                    Filter
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <ArrowUpDown className="h-3.5 w-3.5 mr-2" />
                        Sort
                        <ChevronDown className="h-3.5 w-3.5 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Date (newest first)</DropdownMenuItem>
                      <DropdownMenuItem>Date (oldest first)</DropdownMenuItem>
                      <DropdownMenuItem>Symbol (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem>Value (highest first)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex justify-center">
                            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : trades.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="text-muted-foreground">
                            No trade history found
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      trades.map((trade) => (
                        <TableRow key={trade.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium">{trade.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-7 h-7 rounded flex items-center justify-center bg-primary/10 text-primary font-semibold">
                                {getStockSymbolLetter(trade.instrument)}
                              </div>
                              <span>{trade.instrument}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn(
                              trade.trade_type === 'buy' 
                                ? "bg-success/15 text-success border-success/30" 
                                : "bg-destructive/15 text-destructive border-destructive/30"
                            )}>
                              {trade.trade_type === 'buy' ? 'Buy' : 'Sell'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{Math.abs(trade.quantity)}</TableCell>
                          <TableCell>${trade.price.toFixed(2)}</TableCell>
                          <TableCell className="font-medium">${trade.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(trade.status)}>
                              {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Trade Summary</CardTitle>
                  <CardDescription>Overview of your trading activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Trades</span>
                    <span className="font-medium">{trades.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buy Orders</span>
                    <span className="font-medium">{trades.filter(t => t.trade_type === 'buy').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sell Orders</span>
                    <span className="font-medium">{trades.filter(t => t.trade_type === 'sell').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Volume</span>
                    <span className="font-medium">
                      ${trades.reduce((sum, trade) => sum + trade.total, 0).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Most Traded</CardTitle>
                  <CardDescription>Your most frequently traded symbols</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/10 text-primary font-semibold">
                        A
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">AAPL</span>
                          <span className="text-muted-foreground">30%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/50 rounded-full mt-1.5">
                          <div className="h-full bg-primary rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/10 text-primary font-semibold">
                        T
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">TSLA</span>
                          <span className="text-muted-foreground">25%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/50 rounded-full mt-1.5">
                          <div className="h-full bg-primary rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/10 text-primary font-semibold">
                        M
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">MSFT</span>
                          <span className="text-muted-foreground">20%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/50 rounded-full mt-1.5">
                          <div className="h-full bg-primary rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Trade Performance</CardTitle>
                  <CardDescription>Outcome of your recent trades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-48">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="hsl(var(--muted))"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="hsl(var(--success))"
                          strokeWidth="10"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 * (1 - 0.65)}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">65%</span>
                        <span className="text-xs text-muted-foreground">Success Rate</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Profit Ratio</div>
                      <div className="font-medium text-success">2.3x</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Avg. Hold</div>
                      <div className="font-medium">14 days</div>
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

export default Trades;
