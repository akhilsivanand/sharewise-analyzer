
import React, { useState } from 'react';
import { Stock, stockService } from '@/services/stockService';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface TradeFormProps {
  stocks: Stock[];
  onSuccess?: () => void;
}

const TradeForm: React.FC<TradeFormProps> = ({ stocks, onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  
  const selectedStock = stocks.find(stock => stock.symbol === symbol);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !symbol || !quantity || !price) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const trade = {
        date: format(date, 'yyyy-MM-dd'),
        instrument: symbol,
        quantity: tradeType === 'buy' ? parseInt(quantity) : -parseInt(quantity),
        trade_type: tradeType,
        price: parseFloat(price)
      };
      
      await stockService.addTrade(trade);
      
      toast({
        title: 'Trade Submitted',
        description: `Successfully ${tradeType === 'buy' ? 'bought' : 'sold'} ${quantity} shares of ${symbol}`,
      });
      
      // Reset form
      setDate(new Date());
      setTradeType('buy');
      setSymbol('');
      setQuantity('');
      setPrice('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit trade',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="glass-card w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>New Trade</CardTitle>
        <CardDescription>Enter details to record a new trade</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-type">Trade Type</Label>
            <Select 
              value={tradeType} 
              onValueChange={(value) => setTradeType(value as 'buy' | 'sell')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a trade type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Select 
              value={symbol} 
              onValueChange={setSymbol}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a stock" />
              </SelectTrigger>
              <SelectContent>
                {stocks.map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          
          {symbol && quantity && price && (
            <div className="pt-2">
              <div className="bg-muted/50 rounded-md p-3 text-sm">
                <div className="font-medium mb-1">Trade Summary</div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Action:</span>
                  <span className={tradeType === 'buy' ? 'text-success' : 'text-destructive'}>
                    {tradeType === 'buy' ? 'Buy' : 'Sell'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Value:</span>
                  <span className="font-medium">
                    ${(parseFloat(price) * parseInt(quantity || '0')).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full"></div>
                Processing...
              </>
            ) : (
              'Submit Trade'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradeForm;
