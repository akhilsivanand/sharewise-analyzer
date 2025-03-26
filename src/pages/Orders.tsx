
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Filter, ChevronDown, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for orders
const mockOrders = [
  { 
    id: 1, 
    symbol: 'AAPL', 
    quantity: 10, 
    price: 185.50, 
    type: 'buy', 
    status: 'open',
    created_at: '2025-03-24 09:30:45',
    trigger_condition: 'market',
    expiration: '2025-03-31'
  },
  { 
    id: 2, 
    symbol: 'MSFT', 
    quantity: 5, 
    price: 420.75, 
    type: 'buy', 
    status: 'executed',
    created_at: '2025-03-23 10:15:22',
    trigger_condition: 'limit',
    expiration: '2025-03-30'
  },
  { 
    id: 3, 
    symbol: 'TSLA', 
    quantity: 8, 
    price: 175.25, 
    type: 'sell', 
    status: 'open',
    created_at: '2025-03-25 14:45:10',
    trigger_condition: 'stop',
    expiration: '2025-04-01'
  },
  { 
    id: 4, 
    symbol: 'GOOGL', 
    quantity: 3, 
    price: 178.90, 
    type: 'buy', 
    status: 'cancelled',
    created_at: '2025-03-22 11:20:35',
    trigger_condition: 'market',
    expiration: '2025-03-29'
  },
  { 
    id: 5, 
    symbol: 'AMZN', 
    quantity: 12, 
    price: 182.30, 
    type: 'sell', 
    status: 'executed',
    created_at: '2025-03-21 15:50:05',
    trigger_condition: 'limit',
    expiration: '2025-03-28'
  },
];

// Mock data for support and target levels
const mockLevels = {
  'AAPL': {
    support_levels: { S1: 180.50, S2: 175.25, S3: 170.00 },
    target_levels: { T1: 190.75, T2: 195.50, T3: 200.25 }
  },
  'MSFT': {
    support_levels: { S1: 410.00, S2: 400.50, S3: 390.25 },
    target_levels: { T1: 430.75, T2: 440.25, T3: 450.50 }
  },
  'TSLA': {
    support_levels: { S1: 170.25, S2: 165.50, S3: 160.00 },
    target_levels: { T1: 180.75, T2: 185.50, T3: 190.25 }
  }
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [isLoading, setIsLoading] = useState(false);
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open':
        return "bg-blue-100 text-blue-800 border-blue-300";
      case 'executed':
        return "bg-green-100 text-green-800 border-green-300";
      case 'cancelled':
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  const getOrderTypeColor = (type: string) => {
    return type === 'buy' 
      ? "bg-success/15 text-success border-success/30" 
      : "bg-destructive/15 text-destructive border-destructive/30";
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
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your stock orders and trading plans
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Order</DialogTitle>
                      <DialogDescription>
                        Set up a new stock order with your parameters
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-center text-muted-foreground">
                        Order form would go here
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="levels">Support & Resistance</TabsTrigger>
                <TabsTrigger value="templates">Order Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="mt-0">
                <Card className="glass-card overflow-hidden border-border/40 animate-slide-up">
                  <div className="flex justify-between items-center p-4 border-b border-border/40">
                    <CardTitle className="text-lg">Order Management</CardTitle>
                    
                    <div className="flex items-center space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            Status
                            <ChevronDown className="h-3.5 w-3.5 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>All</DropdownMenuItem>
                          <DropdownMenuItem>Open</DropdownMenuItem>
                          <DropdownMenuItem>Executed</DropdownMenuItem>
                          <DropdownMenuItem>Cancelled</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            Type
                            <ChevronDown className="h-3.5 w-3.5 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>All</DropdownMenuItem>
                          <DropdownMenuItem>Buy</DropdownMenuItem>
                          <DropdownMenuItem>Sell</DropdownMenuItem>
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
                          <TableHead>Condition</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Expiration</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-8">
                              <div className="flex justify-center">
                                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : orders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-8">
                              <div className="text-muted-foreground">
                                No orders found
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          orders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="text-sm">{order.created_at}</TableCell>
                              <TableCell className="font-medium">{order.symbol}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getOrderTypeColor(order.type)}>
                                  {order.type === 'buy' ? 'Buy' : 'Sell'}
                                </Badge>
                              </TableCell>
                              <TableCell>{order.quantity}</TableCell>
                              <TableCell>${order.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {order.trigger_condition}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`capitalize ${getStatusBadgeColor(order.status)}`}>
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm">{order.expiration}</TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                                    Cancel
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="levels" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(mockLevels).map(([symbol, levels]) => (
                    <Card key={symbol} className="glass-card">
                      <CardHeader>
                        <CardTitle>{symbol}</CardTitle>
                        <CardDescription>Support and resistance levels</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Support Levels</h3>
                            <div className="space-y-2">
                              {Object.entries(levels.support_levels).map(([level, value]) => (
                                <div key={level} className="flex justify-between">
                                  <span className="text-sm font-medium">{level}:</span>
                                  <span className="text-sm">${value.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Target Levels</h3>
                            <div className="space-y-2">
                              {Object.entries(levels.target_levels).map(([level, value]) => (
                                <div key={level} className="flex justify-between">
                                  <span className="text-sm font-medium">{level}:</span>
                                  <span className="text-sm">${value.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <Button variant="outline" size="sm" className="w-full">
                              Create Order Based on Levels
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="templates" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="glass-card border-dashed border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle>Create New Template</CardTitle>
                      <CardDescription>Save your common order patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Plus className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <Button variant="outline">Create Template</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Swing Trade</CardTitle>
                      <CardDescription>Medium-term momentum trade</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Order Type:</span>
                            <span className="text-sm font-medium">Buy</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Condition:</span>
                            <span className="text-sm font-medium">Limit</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Stop Loss:</span>
                            <span className="text-sm font-medium">-5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Take Profit:</span>
                            <span className="text-sm font-medium">+15%</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Breakout Trade</CardTitle>
                      <CardDescription>Resistance breakout strategy</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Order Type:</span>
                            <span className="text-sm font-medium">Buy</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Condition:</span>
                            <span className="text-sm font-medium">Stop</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Stop Loss:</span>
                            <span className="text-sm font-medium">-3%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Take Profit:</span>
                            <span className="text-sm font-medium">+9%</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
