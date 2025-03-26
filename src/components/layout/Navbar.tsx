
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur-sm z-50 transition-all duration-300">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-primary rounded-md animate-pulse-subtle"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary/70 rounded-md blur-[1px]"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">S</div>
          </div>
          <span className="font-semibold text-lg tracking-tight">StockWise</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/stocks" className={`nav-link ${isActive('/stocks') ? 'active' : ''}`}>
            Stocks
          </Link>
          <Link to="/trades" className={`nav-link ${isActive('/trades') ? 'active' : ''}`}>
            Trades
          </Link>
          <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'active' : ''}`}>
            Settings
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
          <Input
            type="search"
            placeholder="Search stocks..."
            className="w-full pl-9 bg-muted/50 focus:bg-background border-muted"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
