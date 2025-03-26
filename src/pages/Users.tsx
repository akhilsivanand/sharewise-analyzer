
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import UserTable from '@/components/users/UserTable';
import UserSearchFilters from '@/components/users/UserSearchFilters';
import RolePermissions from '@/components/users/RolePermissions';
import UserActivity from '@/components/users/UserActivity';
import NewUserDialog from '@/components/users/NewUserDialog';
import { mockUsers, initialRolePermissions } from '@/data/mockUsers';
import { RolePermissionsType } from '@/types/users';

const Users: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [rolePermissions, setRolePermissions] = useState<RolePermissionsType>(initialRolePermissions);
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    
    return matchesSearch && matchesRole;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar />
        
        <main className="px-6 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center animate-slide-down">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground mt-1">
                  Manage users and permissions
                </p>
              </div>
              
              <NewUserDialog />
            </div>
            
            <Card className="glass-card overflow-hidden border-border/40 animate-slide-up">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-border/40 gap-4">
                <CardTitle className="text-lg">User Management</CardTitle>
                
                <UserSearchFilters 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />
              </div>
              
              <UserTable users={filteredUsers} />
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
              <RolePermissions 
                rolePermissions={rolePermissions}
                setRolePermissions={setRolePermissions}
              />
              
              <UserActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
