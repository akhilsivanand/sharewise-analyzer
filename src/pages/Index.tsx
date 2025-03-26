
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, LineChart, TrendingUp, ShieldCheck } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically redirect to dashboard after a brief pause
    // This is just to showcase the landing page momentarily
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full py-4 px-6 flex items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur-sm z-50">
        <div className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-primary rounded-md animate-pulse-subtle"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary/70 rounded-md blur-[1px]"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">S</div>
          </div>
          <span className="font-semibold text-lg tracking-tight">StockWise</span>
        </div>
        
        <Button onClick={() => navigate('/')}>
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-slide-down">
            Welcome to StockWise
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-down" style={{ animationDelay: '100ms' }}>
            Advanced Stock Management
            <span className="text-primary"> Made Simple</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mt-4 animate-slide-down" style={{ animationDelay: '200ms' }}>
            Track your investments, analyze market trends, and execute trades—all in one elegant, intuitive platform.
          </p>
          
          <div className="pt-4 animate-slide-down" style={{ animationDelay: '300ms' }}>
            <Button size="lg" onClick={() => navigate('/')} className="rounded-full px-8">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16 w-full animate-slide-up">
          <div className="glass-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-primary/10 text-primary rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Portfolio Tracking</h3>
            <p className="text-muted-foreground">Monitor your investments and holdings in real-time</p>
          </div>
          
          <div className="glass-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-primary/10 text-primary rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
            <p className="text-muted-foreground">Advanced analytics and insights for informed decisions</p>
          </div>
          
          <div className="glass-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-primary/10 text-primary rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Trade Execution</h3>
            <p className="text-muted-foreground">Seamlessly execute trades with just a few clicks</p>
          </div>
          
          <div className="glass-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-primary/10 text-primary rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
            <p className="text-muted-foreground">Set stop-loss and take-profit levels for your trades</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
