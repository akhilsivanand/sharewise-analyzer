
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  status: string;
  last_login: string;
}

export interface Permission {
  name: string;
  allowed: boolean;
}

export interface RolePermissionsType {
  [role: string]: Permission[];
}
