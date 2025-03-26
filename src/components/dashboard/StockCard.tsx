
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '@/services/stockService';

interface StockCardProps {
  stock: Stock;
  className?: string;
  onSelect?: (symbol: string) => void;
}

const StockCard: React.FC<StockCardProps> = ({ 
  stock, 
  className,
  onSelect
}) => {
  const isPositive = stock.change_percent >= 0;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden glass-card glass-card-hover cursor-pointer group",
        className
      )}
      onClick={() => onSelect && onSelect(stock.symbol)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/10 text-primary font-semibold">
              {stock.symbol.substring(0, 1)}
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{stock.symbol}</CardTitle>
              <CardDescription className="text-xs">{stock.company}</CardDescription>
            </div>
          </div>
          {stock.is_breakout && (
            <div className="bg-warning/15 text-warning rounded-full px-2 py-0.5 text-xs font-medium">
              Breakout
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              ${stock.current_price.toFixed(2)}
            </p>
            <div className="flex items-center mt-1">
              <div 
                className={cn(
                  "flex items-center text-sm",
                  isPositive ? "text-success" : "text-destructive"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 mr-1" />
                )}
                <span className="font-medium">{isPositive ? "+" : ""}{stock.change_percent.toFixed(2)}%</span>
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                {isPositive ? "+" : ""}{stock.change_amount.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Qty: {stock.quantity}</p>
            <p className="text-xs text-muted-foreground mt-1">Vol: {stock.volume.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
