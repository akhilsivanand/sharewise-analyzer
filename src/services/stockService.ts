// Mock stock data service
interface Stock {
  id: string;
  symbol: string;
  company: string;
  quantity: number;
  current_price: number;
  ltp: number;
  change_amount: number;
  change_percent: number;
  volume: number;
  is_breakout: boolean;
}

interface HistoricalData {
  day: { high: number; low: number };
  week: { high: number; low: number };
  month: { high: number; low: number };
}

interface StockDetails extends Stock {
  historical: HistoricalData;
  support_levels: { S1: number; S2: number; S3: number };
  target_levels: { T1: number; T2: number; T3: number };
  fluctuations: {
    daily: string;
    weekly: string;
    monthly: string;
  };
}

interface Trade {
  id: string;
  date: string;
  instrument: string;
  quantity: number;
  trade_type: 'buy' | 'sell';
  price: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

const mockStocks: Stock[] = [
  {
    id: '1',
    symbol: 'AAPL',
    company: 'Apple Inc.',
    quantity: 100,
    current_price: 151.23,
    ltp: 151.23,
    change_amount: 1.23,
    change_percent: 0.82,
    volume: 65482300,
    is_breakout: false
  },
  {
    id: '2',
    symbol: 'GOOGL',
    company: 'Alphabet Inc.',
    quantity: 50,
    current_price: 132.45,
    ltp: 132.45,
    change_amount: 2.31,
    change_percent: 1.78,
    volume: 24536700,
    is_breakout: true
  },
  {
    id: '3',
    symbol: 'MSFT',
    company: 'Microsoft Corporation',
    quantity: 75,
    current_price: 290.73,
    ltp: 290.73,
    change_amount: 3.45,
    change_percent: 1.2,
    volume: 32568900,
    is_breakout: false
  },
  {
    id: '4',
    symbol: 'AMZN',
    company: 'Amazon.com Inc.',
    quantity: 30,
    current_price: 127.86,
    ltp: 127.86,
    change_amount: -0.93,
    change_percent: -0.72,
    volume: 45328900,
    is_breakout: false
  },
  {
    id: '5',
    symbol: 'TSLA',
    company: 'Tesla Inc.',
    quantity: -50,
    current_price: 680.12,
    ltp: 680.12,
    change_amount: -12.34,
    change_percent: -1.78,
    volume: 36589200,
    is_breakout: false
  },
  {
    id: '6',
    symbol: 'META',
    company: 'Meta Platforms Inc.',
    quantity: 60,
    current_price: 318.42,
    ltp: 318.42,
    change_amount: 4.62,
    change_percent: 1.47,
    volume: 29685400,
    is_breakout: true
  },
  {
    id: '7',
    symbol: 'NFLX',
    company: 'Netflix Inc.',
    quantity: 25,
    current_price: 419.87,
    ltp: 419.87,
    change_amount: -3.21,
    change_percent: -0.76,
    volume: 15874200,
    is_breakout: false
  },
  {
    id: '8',
    symbol: 'DIS',
    company: 'The Walt Disney Company',
    quantity: 45,
    current_price: 102.64,
    ltp: 102.64,
    change_amount: 1.54,
    change_percent: 1.52,
    volume: 19874500,
    is_breakout: false
  }
];

const mockStockDetails: Record<string, StockDetails> = {
  AAPL: {
    ...mockStocks[0],
    historical: {
      day: { high: 152.00, low: 149.00 },
      week: { high: 153.50, low: 147.50 },
      month: { high: 156.00, low: 145.00 }
    },
    support_levels: { S1: 150.00, S2: 148.50, S3: 147.00 },
    target_levels: { T1: 155.00, T2: 157.50, T3: 160.00 },
    fluctuations: {
      daily: "+1.2%",
      weekly: "-2.3%",
      monthly: "+5.0%"
    }
  },
  GOOGL: {
    ...mockStocks[1],
    historical: {
      day: { high: 133.50, low: 130.75 },
      week: { high: 135.20, low: 129.80 },
      month: { high: 138.10, low: 127.25 }
    },
    support_levels: { S1: 131.00, S2: 129.50, S3: 127.00 },
    target_levels: { T1: 135.00, T2: 138.00, T3: 140.00 },
    fluctuations: {
      daily: "+1.8%",
      weekly: "+3.2%",
      monthly: "+2.7%"
    }
  },
  MSFT: {
    ...mockStocks[2],
    historical: {
      day: { high: 292.00, low: 288.50 },
      week: { high: 295.75, low: 287.20 },
      month: { high: 298.00, low: 285.00 }
    },
    support_levels: { S1: 288.00, S2: 285.50, S3: 283.00 },
    target_levels: { T1: 295.00, T2: 298.00, T3: 300.00 },
    fluctuations: {
      daily: "+1.2%",
      weekly: "+2.1%",
      monthly: "+4.3%"
    }
  },
};

// Mock historical price data
const generateHistoricalPrices = (basePrice: number, days: number = 30) => {
  const prices = [];
  let currentPrice = basePrice;

  for (let i = days; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random price movement between -2% and +2%
    const change = currentPrice * (Math.random() * 0.04 - 0.02);
    currentPrice += change;
    
    prices.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2))
    });
  }

  return prices;
};

const mockTrades: Trade[] = [
  {
    id: '1',
    date: '2023-03-15',
    instrument: 'AAPL',
    quantity: 20,
    trade_type: 'buy',
    price: 147.50,
    total: 2950.00,
    status: 'completed'
  },
  {
    id: '2',
    date: '2023-03-20',
    instrument: 'GOOGL',
    quantity: 10,
    trade_type: 'buy',
    price: 128.75,
    total: 1287.50,
    status: 'completed'
  },
  {
    id: '3',
    date: '2023-03-27',
    instrument: 'TSLA',
    quantity: 15,
    trade_type: 'sell',
    price: 675.50,
    total: 10132.50,
    status: 'completed'
  },
  {
    id: '4', 
    date: '2023-04-02',
    instrument: 'MSFT',
    quantity: 5,
    trade_type: 'buy',
    price: 287.30,
    total: 1436.50,
    status: 'pending'
  },
  {
    id: '5',
    date: '2023-04-05',
    instrument: 'AAPL',
    quantity: 10,
    trade_type: 'sell',
    price: 151.20,
    total: 1512.00,
    status: 'completed'
  }
];

// Simulate API response delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const stockService = {
  getAllStocks: async (): Promise<Stock[]> => {
    await delay(500);
    return [...mockStocks];
  },
  
  getStockBySymbol: async (symbol: string): Promise<StockDetails | undefined> => {
    await delay(500);
    return mockStockDetails[symbol] || undefined;
  },
  
  getHistoricalPrices: async (symbol: string, days: number = 30): Promise<any[]> => {
    await delay(800);
    const stock = mockStocks.find(s => s.symbol === symbol);
    if (!stock) return [];
    
    return generateHistoricalPrices(stock.current_price, days);
  },
  
  getAllTrades: async (): Promise<Trade[]> => {
    await delay(600);
    return [...mockTrades];
  },
  
  addTrade: async (trade: Omit<Trade, 'id' | 'total' | 'status'>): Promise<Trade> => {
    await delay(800);
    
    const newTrade: Trade = {
      id: `${mockTrades.length + 1}`,
      total: trade.price * trade.quantity,
      status: 'completed',
      ...trade
    };
    
    mockTrades.push(newTrade);
    return newTrade;
  },
  
  executeBuyOrder: async (symbol: string, quantity: number): Promise<{ status: string; message: string }> => {
    await delay(1000);
    return {
      status: 'success',
      message: `Buy order placed for ${quantity} shares of ${symbol}`
    };
  },
  
  executeSellOrder: async (symbol: string, quantity: number): Promise<{ status: string; message: string }> => {
    await delay(1000);
    return {
      status: 'success',
      message: `Sell order placed for ${quantity} shares of ${symbol}`
    };
  }
};

export type { Stock, StockDetails, Trade, HistoricalData };
