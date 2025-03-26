
import React, { useState, useEffect } from 'react';
import { Stock, stockService } from '@/services/stockService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, MoreHorizontal, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface SubGridProps {
  filter: 'buyable' | 'sellable';
}

const SubGrid: React.FC<SubGridProps> = ({ filter }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setIsLoading(true);
        const data = await stockService.getAllStocks();
        // For demo purposes, we'll simulate filters
        const filteredStocks = filter === 'buyable' 
          ? data.filter(stock => stock.change_percent < 0) // Buying opportunity on dips
          : data.filter(stock => stock.change_percent > 0); // Selling opportunity on rises
        
        setStocks(filteredStocks);
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStocks();
  }, [filter]);
  
  const handleView = (symbol: string) => {
    navigate(`/stocks/${symbol}`);
  };
  
  const handleTrade = async (symbol: string, actionType: 'buy' | 'sell') => {
    try {
      let result;
      if (actionType === 'buy') {
        result = await stockService.executeBuyOrder(symbol, 10); // For demo, always buy 10
      } else {
        result = await stockService.executeSellOrder(symbol, 10); // For demo, always sell 10
      }
      
      toast({
        title: result.status === 'success' ? 'Success' : 'Error',
        description: result.message,
        variant: result.status === 'success' ? 'default' : 'destructive'
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
    <div className="rounded-md border overflow-hidden glass-card w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : stocks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No stocks found
              </TableCell>
            </TableRow>
          ) : (
            stocks.map((stock) => {
              const isPositive = stock.change_percent >= 0;
              
              return (
                <TableRow key={stock.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded flex items-center justify-center bg-primary/10 text-primary font-semibold">
                        {stock.symbol.substring(0, 1)}
                      </div>
                      <div>
                        <div>{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground">{stock.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${stock.current_price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className={cn(
                      "flex items-center",
                      isPositive ? "text-success" : "text-destructive"
                    )}>
                      {isPositive ? (
                        <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
                      )}
                      <span>{isPositive ? "+" : ""}{stock.change_percent.toFixed(2)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{stock.volume.toLocaleString()}</TableCell>
                  <TableCell>
                    {stock.is_breakout ? (
                      <Badge variant="outline" className="bg-warning/15 text-warning border-warning/30">
                        Breakout
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        Normal
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(stock.symbol)}
                        className="h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleTrade(stock.symbol, 'buy')}>
                            Buy
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTrade(stock.symbol, 'sell')}>
                            Sell
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubGrid;
