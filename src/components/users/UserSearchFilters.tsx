
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRole: string | null;
  setSelectedRole: (role: string | null) => void;
}

const UserSearchFilters: React.FC<UserSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
      <div className="relative flex-1 md:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
        <Input
          type="search"
          placeholder="Search users..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex-1 md:flex-none justify-between">
            {selectedRole ? `Role: ${selectedRole}` : 'Filter by Role'}
            <span className="sr-only">Filter by role</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSelectedRole(null)}>
            All Roles
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedRole('admin')}>
            Admin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedRole('trader')}>
            Trader
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedRole('analyst')}>
            Analyst
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedRole('viewer')}>
            Viewer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserSearchFilters;
