import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash, UserPlus, Check, X, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

// Mock user data
const mockUsers = [
  { 
    id: 1, 
    username: 'admin_user', 
    name: 'Admin User',
    email: 'admin@stockwise.com', 
    role: 'admin', 
    status: 'active',
    last_login: '2025-03-26 10:15:22' 
  },
  { 
    id: 2, 
    username: 'trader_jane', 
    name: 'Jane Smith',
    email: 'jane@stockwise.com', 
    role: 'trader', 
    status: 'active',
    last_login: '2025-03-25 16:30:45' 
  },
  { 
    id: 3, 
    username: 'analyst_bob', 
    name: 'Bob Johnson',
    email: 'bob@stockwise.com', 
    role: 'analyst', 
    status: 'inactive',
    last_login: '2025-03-20 09:45:10' 
  },
  { 
    id: 4, 
    username: 'viewer_alex', 
    name: 'Alex Wong',
    email: 'alex@stockwise.com', 
    role: 'viewer', 
    status: 'active',
    last_login: '2025-03-22 14:20:35' 
  },
  { 
    id: 5, 
    username: 'trader_sam', 
    name: 'Sam Taylor',
    email: 'sam@stockwise.com', 
    role: 'trader', 
    status: 'active',
    last_login: '2025-03-24 11:05:30' 
  },
];

// Role permissions
const initialRolePermissions = {
  admin: [
    { name: 'View Dashboard', allowed: true },
    { name: 'Manage Trades', allowed: true },
    { name: 'Edit Settings', allowed: true },
    { name: 'Manage Users', allowed: true },
    { name: 'API Access', allowed: true },
  ],
  trader: [
    { name: 'View Dashboard', allowed: true },
    { name: 'Manage Trades', allowed: true },
    { name: 'Edit Settings', allowed: false },
    { name: 'Manage Users', allowed: false },
    { name: 'API Access', allowed: true },
  ],
  analyst: [
    { name: 'View Dashboard', allowed: true },
    { name: 'Manage Trades', allowed: false },
    { name: 'Edit Settings', allowed: false },
    { name: 'Manage Users', allowed: false },
    { name: 'API Access', allowed: true },
  ],
  viewer: [
    { name: 'View Dashboard', allowed: true },
    { name: 'Manage Trades', allowed: false },
    { name: 'Edit Settings', allowed: false },
    { name: 'Manage Users', allowed: false },
    { name: 'API Access', allowed: false },
  ],
};

const Users: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [rolePermissions, setRolePermissions] = useState(initialRolePermissions);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [tempPermissions, setTempPermissions] = useState<typeof initialRolePermissions>();
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    
    return matchesSearch && matchesRole;
  });
  
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return "bg-primary/15 text-primary border-primary/30";
      case 'trader':
        return "bg-success/15 text-success border-success/30";
      case 'analyst':
        return "bg-blue-100 text-blue-800 border-blue-300";
      case 'viewer':
        return "bg-muted text-muted-foreground border-muted-foreground/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  const getStatusBadgeColor = (status: string) => {
    return status === 'active' 
      ? "bg-success/15 text-success border-success/30" 
      : "bg-destructive/15 text-destructive border-destructive/30";
  };
  
  const handleEditPermissions = () => {
    setTempPermissions(JSON.parse(JSON.stringify(rolePermissions)));
    setIsPermissionDialogOpen(true);
  };

  const handleTogglePermission = (role: string, permissionIndex: number) => {
    if (!tempPermissions) return;
    
    setTempPermissions(prev => {
      if (!prev) return prev;
      const newPermissions = JSON.parse(JSON.stringify(prev));
      newPermissions[role][permissionIndex].allowed = !newPermissions[role][permissionIndex].allowed;
      return newPermissions;
    });
  };

  const handleSavePermissions = () => {
    setRolePermissions(tempPermissions!);
    setIsPermissionDialogOpen(false);
    
    toast({
      title: "Permissions Updated",
      description: "Role permissions have been successfully updated.",
    });
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
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground mt-1">
                  Manage users and permissions
                </p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account and assign permissions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-center text-muted-foreground">
                      User form would go here
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card className="glass-card overflow-hidden border-border/40 animate-slide-up">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-border/40 gap-4">
                <CardTitle className="text-lg">User Management</CardTitle>
                
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
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="text-muted-foreground">
                            No users found matching your search
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">@{user.username}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                              {user.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{user.last_login}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <span className="sr-only">More</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="lucide lucide-more-horizontal"
                                    >
                                      <circle cx="12" cy="12" r="1" />
                                      <circle cx="19" cy="12" r="1" />
                                      <circle cx="5" cy="12" r="1" />
                                    </svg>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    {user.status === 'active' ? 'Deactivate' : 'Activate'} Account
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Role Management</CardTitle>
                  <CardDescription>View and edit role permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(rolePermissions).map(([role, permissions]) => (
                      <div key={role} className="space-y-2">
                        <h3 className="text-sm font-medium capitalize">{role}</h3>
                        <div className="space-y-1">
                          {permissions.map((permission, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span>{permission.name}</span>
                              {permission.allowed ? (
                                <Check className="h-4 w-4 text-success" />
                              ) : (
                                <X className="h-4 w-4 text-destructive" />
                              )}
                            </div>
                          ))}
                        </div>
                        {role !== 'viewer' && <div className="border-t my-2" />}
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full mt-2" onClick={handleEditPermissions}>
                      Edit Permissions
                    </Button>

                    <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
                      <DialogContent className="max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Role Permissions</DialogTitle>
                          <DialogDescription>
                            Customize access permissions for each role
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 py-4">
                          {tempPermissions && Object.entries(tempPermissions).map(([role, permissions]) => (
                            <div key={role} className="space-y-3 border rounded-md p-4">
                              <h3 className="text-base font-medium capitalize">{role}</h3>
                              <div className="space-y-2">
                                {permissions.map((permission, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm">{permission.name}</span>
                                    <Switch 
                                      checked={permission.allowed}
                                      onCheckedChange={() => handleTogglePermission(role, index)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSavePermissions}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Recent activity and login history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center py-2 border-b">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Jane Smith logged in</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center py-2 border-b">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Admin User changed settings</span>
                          <span className="text-xs text-muted-foreground">5 hours ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center py-2 border-b">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Sam Taylor executed a trade</span>
                          <span className="text-xs text-muted-foreground">8 hours ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center py-2 border-b">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Alex Wong viewed reports</span>
                          <span className="text-xs text-muted-foreground">Yesterday</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center py-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Plus className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">New user account created</span>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
