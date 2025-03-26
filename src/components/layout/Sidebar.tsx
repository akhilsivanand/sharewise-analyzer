
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  LineChart, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  BookOpen,
  Users,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Stocks', icon: BarChart3, path: '/stocks' },
  { title: 'Trades', icon: History, path: '/trades' },
  { title: 'Analysis', icon: LineChart, path: '/analysis' },
  { title: 'Portfolio', icon: TrendingUp, path: '/portfolio' },
  { title: 'Orders', icon: BookOpen, path: '/orders' },
  { title: 'Users', icon: Users, path: '/users' },
  { title: 'Simulator', icon: DollarSign, path: '/simulator' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-sidebar fixed left-0 top-0 z-40 border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 bg-primary rounded-md"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">S</div>
            </div>
            <span className="font-semibold text-sidebar-foreground tracking-tight">StockWise</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                location.pathname === item.path ? "sidebar-item active" : "sidebar-item",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center space-x-3 rounded-md bg-sidebar-accent/50 px-3 py-2",
          collapsed && "justify-center px-1.5"
        )}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sidebar-primary text-white">
            U
          </div>
          {!collapsed && (
            <div className="flex-1 text-sm">
              <p className="font-medium text-sidebar-foreground">User</p>
              <p className="text-sidebar-foreground/70">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
