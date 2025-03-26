import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Lock,
  Bell,
  MonitorSmartphone,
  Sliders,
  Mail,
  HelpCircle,
  Database,
  BookOpen,
  UserPlus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your settings have been saved successfully.',
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar />
        
        <main className="px-6 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="animate-slide-down">
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground mt-1">
                Manage your account and application preferences
              </p>
            </div>
            
            <div className="animate-slide-up">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-5 h-auto bg-muted/50 p-1 rounded-lg w-full">
                  <TabsTrigger value="account" className="h-10">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="h-10">
                    <MonitorSmartphone className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="h-10">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="trading" className="h-10">
                    <Sliders className="h-4 w-4 mr-2" />
                    Trading
                  </TabsTrigger>
                  <TabsTrigger value="users" className="h-10">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Users
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Profile Information
                        </CardTitle>
                        <CardDescription>
                          Manage your personal information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="John Doe" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="johndoe" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select defaultValue="admin">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="trader">Trader</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button className="w-full" onClick={handleSave}>
                          Save Profile
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Lock className="h-5 w-5 mr-2" />
                          Security
                        </CardTitle>
                        <CardDescription>
                          Manage your password and security settings
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-muted-foreground">
                              Add an extra layer of security
                            </div>
                          </div>
                          <Switch id="two-factor" />
                        </div>
                        
                        <Button className="w-full" onClick={handleSave}>
                          Update Security
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="appearance">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MonitorSmartphone className="h-5 w-5 mr-2" />
                        Appearance Settings
                      </CardTitle>
                      <CardDescription>
                        Customize how the application looks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="font-medium">Theme</div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-full aspect-video bg-white border rounded-md shadow-sm p-2 flex items-end justify-center">
                              <div className="w-full h-2 bg-primary rounded-full"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="light-theme" name="theme" className="accent-primary" defaultChecked />
                              <label htmlFor="light-theme" className="text-sm font-medium">Light</label>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-full aspect-video bg-[#121212] border border-border rounded-md shadow-sm p-2 flex items-end justify-center">
                              <div className="w-full h-2 bg-primary rounded-full"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="dark-theme" name="theme" className="accent-primary" />
                              <label htmlFor="dark-theme" className="text-sm font-medium">Dark</label>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-full aspect-video bg-gradient-to-r from-white to-[#121212] border rounded-md shadow-sm p-2 flex items-end justify-center">
                              <div className="w-full h-2 bg-primary rounded-full"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="system-theme" name="theme" className="accent-primary" />
                              <label htmlFor="system-theme" className="text-sm font-medium">System</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="font-medium">Dashboard Layout</div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Compact Mode</div>
                              <div className="text-sm text-muted-foreground">
                                Use a more compact layout for the dashboard
                              </div>
                            </div>
                            <Switch id="compact-mode" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Show Profit/Loss</div>
                              <div className="text-sm text-muted-foreground">
                                Display profit/loss amounts on the dashboard
                              </div>
                            </div>
                            <Switch id="show-profit-loss" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Auto-refresh Data</div>
                              <div className="text-sm text-muted-foreground">
                                Automatically refresh data every minute
                              </div>
                            </div>
                            <Switch id="auto-refresh" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={handleSave}>
                        Save Appearance Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription>
                        Control how and when we notify you
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="font-medium">Email Notifications</div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Price Alerts</div>
                              <div className="text-sm text-muted-foreground">
                                Receive alerts when stocks hit target prices
                              </div>
                            </div>
                            <Switch id="price-alerts-email" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Trade Confirmations</div>
                              <div className="text-sm text-muted-foreground">
                                Notifications about completed trades
                              </div>
                            </div>
                            <Switch id="trade-confirmations-email" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Market News</div>
                              <div className="text-sm text-muted-foreground">
                                Market news relevant to your portfolio
                              </div>
                            </div>
                            <Switch id="market-news-email" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="font-medium">In-App Notifications</div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Price Movements</div>
                              <div className="text-sm text-muted-foreground">
                                Alert on significant price movements
                              </div>
                            </div>
                            <Switch id="price-movements-app" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Breakout Alerts</div>
                              <div className="text-sm text-muted-foreground">
                                Notify when stocks break resistance levels
                              </div>
                            </div>
                            <Switch id="breakout-alerts-app" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">System Updates</div>
                              <div className="text-sm text-muted-foreground">
                                Notifications about system and feature updates
                              </div>
                            </div>
                            <Switch id="system-updates-app" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={handleSave}>
                        Save Notification Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="trading">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Sliders className="h-5 w-5 mr-2" />
                        Trading Preferences
                      </CardTitle>
                      <CardDescription>
                        Configure your trading settings and defaults
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="font-medium">Default Trading Settings</div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="default-quantity">Default Quantity</Label>
                            <Input id="default-quantity" type="number" defaultValue="10" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="order-type">Default Order Type</Label>
                            <Select defaultValue="market">
                              <SelectTrigger>
                                <SelectValue placeholder="Select order type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="market">Market</SelectItem>
                                <SelectItem value="limit">Limit</SelectItem>
                                <SelectItem value="stop">Stop</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="font-medium">Risk Management</div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="max-position-size">Max Position Size (%)</Label>
                            <Input id="max-position-size" type="number" defaultValue="10" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="stop-loss">Default Stop Loss (%)</Label>
                            <Input id="stop-loss" type="number" defaultValue="5" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="take-profit">Default Take Profit (%)</Label>
                            <Input id="take-profit" type="number" defaultValue="10" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="daily-loss-limit">Daily Loss Limit ($)</Label>
                            <Input id="daily-loss-limit" type="number" defaultValue="1000" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="font-medium">Trading Features</div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Auto-Execute Orders</div>
                              <div className="text-sm text-muted-foreground">
                                Automatically execute orders when conditions are met
                              </div>
                            </div>
                            <Switch id="auto-execute" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Trade Confirmation</div>
                              <div className="text-sm text-muted-foreground">
                                Show confirmation dialog before executing trades
                              </div>
                            </div>
                            <Switch id="trade-confirmation" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Trailing Stop Loss</div>
                              <div className="text-sm text-muted-foreground">
                                Enable trailing stop loss for all trades
                              </div>
                            </div>
                            <Switch id="trailing-stop" />
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={handleSave}>
                        Save Trading Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="users">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <UserPlus className="h-5 w-5 mr-2" />
                        User Management
                      </CardTitle>
                      <CardDescription>
                        Manage users and permissions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Users (3)</div>
                          <Button size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add User
                          </Button>
                        </div>
                        
                        <div className="border rounded-md divide-y">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                JD
                              </div>
                              <div>
                                <div className="font-medium">John Doe</div>
                                <div className="text-sm text-muted-foreground">john.doe@example.com</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge>Admin</Badge>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                JS
                              </div>
                              <div>
                                <div className="font-medium">Jane Smith</div>
                                <div className="text-sm text-muted-foreground">jane.smith@example.com</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">Trader</Badge>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                RJ
                              </div>
                              <div>
                                <div className="font-medium">Robert Johnson</div>
                                <div className="text-sm text-muted-foreground">robert.j@example.com</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">Viewer</Badge>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-4">
                        <div className="font-medium">Roles & Permissions</div>
                        
                        <div className="border rounded-md divide-y">
                          <div className="p-4">
                            <div className="font-medium mb-2">Admin</div>
                            <div className="text-sm text-muted-foreground">
                              Full access to all features. Can manage users and system settings.
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="font-medium mb-2">Trader</div>
                            <div className="text-sm text-muted-foreground">
                              Can view all data and execute trades. Cannot manage users or system settings.
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="font-medium mb-2">Viewer</div>
                            <div className="text-sm text-muted-foreground">
                              Read-only access to data. Cannot execute trades or modify settings.
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
