
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Stock } from '@/services/stockService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProfitSimulatorProps {
  stocks: Stock[];
  className?: string;
}

const ProfitSimulator: React.FC<ProfitSimulatorProps> = ({ stocks, className }) => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(10);
  const [profit, setProfit] = useState<number>(0);
  const [profitPercent, setProfitPercent] = useState<number>(0);
  
  useEffect(() => {
    if (selectedStock) {
      setBuyPrice(selectedStock.current_price);
      setSellPrice(selectedStock.current_price * 1.05); // Default 5% higher
    }
  }, [selectedStock]);
  
  useEffect(() => {
    if (buyPrice && sellPrice && quantity) {
      const costBasis = buyPrice * quantity;
      const saleValue = sellPrice * quantity;
      const calculatedProfit = saleValue - costBasis;
      setProfit(calculatedProfit);
      setProfitPercent((calculatedProfit / costBasis) * 100);
    }
  }, [buyPrice, sellPrice, quantity]);

  const handleStockChange = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol) || null;
    setSelectedStock(stock);
  };
  
  const handleBuyPriceChange = (value: string) => {
    const price = parseFloat(value);
    if (!isNaN(price)) {
      setBuyPrice(price);
    }
  };
  
  const handleSellPriceChange = (value: string) => {
    const price = parseFloat(value);
    if (!isNaN(price)) {
      setSellPrice(price);
    }
  };
  
  const handleQuantityChange = (value: string) => {
    const qty = parseInt(value);
    if (!isNaN(qty) && qty > 0) {
      setQuantity(qty);
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader>
        <CardTitle>Profit Simulator</CardTitle>
        <CardDescription>
          Simulate potential profits or losses for your trades
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="stock">Select Stock</Label>
          <Select
            value={selectedStock?.symbol || ''}
            onValueChange={handleStockChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a stock" />
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
        
        {selectedStock && (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="quantity">Quantity</Label>
                  <span className="text-sm text-muted-foreground">{quantity} shares</span>
                </div>
                <Slider
                  id="quantity"
                  min={1}
                  max={100}
                  step={1}
                  value={[quantity]}
                  onValueChange={(values) => setQuantity(values[0])}
                  className="py-2"
                />
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  min={1}
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buy-price">Buy Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="buy-price"
                      type="number"
                      step="0.01"
                      value={buyPrice}
                      onChange={(e) => handleBuyPriceChange(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sell-price">Sell Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="sell-price"
                      type="number"
                      step="0.01"
                      value={sellPrice}
                      onChange={(e) => handleSellPriceChange(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="sell-price-slider">Sell Price Range</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(sellPrice)}
                  </span>
                </div>
                <Slider
                  id="sell-price-slider"
                  min={buyPrice * 0.5}
                  max={buyPrice * 1.5}
                  step={0.01}
                  value={[sellPrice]}
                  onValueChange={(values) => setSellPrice(values[0])}
                  className="py-2"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Investment</div>
                  <div className="text-xl font-semibold">
                    {formatCurrency(buyPrice * quantity)}
                  </div>
                </div>
                
                <div className="p-4 rounded-md bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Return</div>
                  <div className="text-xl font-semibold">
                    {formatCurrency(sellPrice * quantity)}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 rounded-md bg-muted/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Profit/Loss</div>
                    <div className={cn(
                      "text-2xl font-bold",
                      profit > 0 ? "text-success" : profit < 0 ? "text-destructive" : ""
                    )}>
                      {formatCurrency(profit)}
                    </div>
                  </div>
                  
                  <div className={cn(
                    "flex items-center text-xl font-semibold",
                    profit > 0 ? "text-success" : profit < 0 ? "text-destructive" : ""
                  )}>
                    {profit > 0 ? (
                      <TrendingUp className="h-5 w-5 mr-1.5" />
                    ) : profit < 0 ? (
                      <TrendingDown className="h-5 w-5 mr-1.5" />
                    ) : null}
                    {profitPercent > 0 ? "+" : ""}
                    {profitPercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitSimulator;
