
import React, { useState, useEffect } from 'react';
import { Stock, stockService } from '@/services/stockService';
import StockCard from './StockCard';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReloadIcon } from '@radix-ui/react-icons';

const StockGrid: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setIsLoading(true);
        const data = await stockService.getAllStocks();
        setStocks(data);
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStocks();
  }, []);
  
  const handleStockSelect = (symbol: string) => {
    navigate(`/stocks/${symbol}`);
  };
  
  const longPositions = stocks.filter(stock => stock.quantity > 0);
  const shortPositions = stocks.filter(stock => stock.quantity < 0);
  const breakoutStocks = stocks.filter(stock => stock.is_breakout);
  
  const renderStockGrid = (stockList: Stock[]) => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <ReloadIcon className="h-6 w-6 animate-spin text-primary" />
        </div>
      );
    }
    
    if (stockList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-muted-foreground text-lg mb-2">No stocks found</div>
          <p className="text-sm text-muted-foreground">
            No matching stocks were found for the current filter.
          </p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
        {stockList.map((stock) => (
          <StockCard 
            key={stock.id} 
            stock={stock} 
            onSelect={handleStockSelect}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Stocks</TabsTrigger>
          <TabsTrigger value="long">Long Positions</TabsTrigger>
          <TabsTrigger value="short">Short Positions</TabsTrigger>
          <TabsTrigger value="breakout">Breakouts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {renderStockGrid(stocks)}
        </TabsContent>
        
        <TabsContent value="long" className="mt-0">
          {renderStockGrid(longPositions)}
        </TabsContent>
        
        <TabsContent value="short" className="mt-0">
          {renderStockGrid(shortPositions)}
        </TabsContent>
        
        <TabsContent value="breakout" className="mt-0">
          {renderStockGrid(breakoutStocks)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockGrid;
