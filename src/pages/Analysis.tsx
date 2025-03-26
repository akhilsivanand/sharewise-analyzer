
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const data = [
  { name: 'Jan', AAPL: 150, MSFT: 250, TSLA: 700 },
  { name: 'Feb', AAPL: 160, MSFT: 260, TSLA: 750 },
  { name: 'Mar', AAPL: 155, MSFT: 265, TSLA: 720 },
  { name: 'Apr', AAPL: 170, MSFT: 275, TSLA: 690 },
  { name: 'May', AAPL: 180, MSFT: 280, TSLA: 710 },
  { name: 'Jun', AAPL: 190, MSFT: 290, TSLA: 740 },
];

const Analysis: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar />
        
        <main className="px-6 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center animate-slide-down">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Market Analysis</h1>
                <p className="text-muted-foreground mt-1">
                  Advanced analytics and technical indicators for your stocks
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="price" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="price">Price Analysis</TabsTrigger>
                <TabsTrigger value="volume">Volume Analysis</TabsTrigger>
                <TabsTrigger value="correlation">Correlation</TabsTrigger>
                <TabsTrigger value="indicators">Technical Indicators</TabsTrigger>
              </TabsList>
              
              <TabsContent value="price" className="mt-0 space-y-6">
                <Card className="glass-card overflow-hidden border-border/40 animate-slide-up">
                  <CardHeader>
                    <CardTitle>Price Comparison</CardTitle>
                    <CardDescription>Compare price movements across multiple stocks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="AAPL" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="MSFT" stroke="#82ca9d" />
                          <Line type="monotone" dataKey="TSLA" stroke="#ff7300" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Support & Resistance</CardTitle>
                      <CardDescription>Key price levels based on historical data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">AAPL</span>
                          <div className="space-y-2">
                            <div className="flex justify-between gap-4">
                              <span className="text-sm text-muted-foreground">R3:</span>
                              <span className="text-sm font-medium">$195.50</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-sm text-muted-foreground">R2:</span>
                              <span className="text-sm font-medium">$191.25</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-sm text-muted-foreground">R1:</span>
                              <span className="text-sm font-medium">$188.75</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-sm text-green-500">Current:</span>
                              <span className="text-sm font-medium text-green-500">$183.50</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-sm text-muted-foreground">S1:</span>
                              <span className="text-sm font-medium">$180.25</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-sm text-muted-foreground">S2:</span>
                              <span className="text-sm font-medium">$176.50</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-sm text-muted-foreground">S3:</span>
                              <span className="text-sm font-medium">$172.75</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Price Momentum</CardTitle>
                      <CardDescription>Momentum indicators and strength</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">RSI (14)</span>
                            <span className="text-sm font-medium">65.8</span>
                          </div>
                          <div className="w-full h-2 bg-muted/50 rounded-full">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '65.8%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">MACD</span>
                            <span className="text-sm font-medium text-green-500">Bullish</span>
                          </div>
                          <div className="w-full h-2 bg-muted/50 rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Stochastic</span>
                            <span className="text-sm font-medium text-amber-500">Neutral</span>
                          </div>
                          <div className="w-full h-2 bg-muted/50 rounded-full">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="volume" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Volume Analysis</CardTitle>
                    <CardDescription>Trading volume patterns and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="AAPL" stroke="#8884d8" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="correlation" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Correlation Matrix</CardTitle>
                    <CardDescription>How stocks move in relation to each other</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border p-2"></th>
                            <th className="border p-2">AAPL</th>
                            <th className="border p-2">MSFT</th>
                            <th className="border p-2">TSLA</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2 font-medium">AAPL</td>
                            <td className="border p-2 bg-green-100">1.00</td>
                            <td className="border p-2 bg-green-50">0.75</td>
                            <td className="border p-2 bg-yellow-50">0.45</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">MSFT</td>
                            <td className="border p-2 bg-green-50">0.75</td>
                            <td className="border p-2 bg-green-100">1.00</td>
                            <td className="border p-2 bg-yellow-50">0.48</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">TSLA</td>
                            <td className="border p-2 bg-yellow-50">0.45</td>
                            <td className="border p-2 bg-yellow-50">0.48</td>
                            <td className="border p-2 bg-green-100">1.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="indicators" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Technical Indicators</CardTitle>
                    <CardDescription>Advanced technical analysis tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Moving Averages</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">MA (20)</span>
                              <span className="text-sm font-medium">$182.45</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">MA (50)</span>
                              <span className="text-sm font-medium">$178.20</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">MA (200)</span>
                              <span className="text-sm font-medium">$165.75</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Oscillators</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">RSI</span>
                              <span className="text-sm font-medium">65.8</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">CCI</span>
                              <span className="text-sm font-medium">120.5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Williams %R</span>
                              <span className="text-sm font-medium">-25.3</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Trend Indicators</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">ADX</span>
                              <span className="text-sm font-medium">28.5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Ichimoku</span>
                              <span className="text-sm font-medium text-green-500">Bullish</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Parabolic SAR</span>
                              <span className="text-sm font-medium text-green-500">Bullish</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analysis;
