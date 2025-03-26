
import { User, RolePermissionsType } from '@/types/users';

// Mock user data
export const mockUsers: User[] = [
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
export const initialRolePermissions: RolePermissionsType = {
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
