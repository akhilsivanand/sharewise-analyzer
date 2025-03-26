
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RolePermissionsType } from '@/types/users';

interface RolePermissionsProps {
  rolePermissions: RolePermissionsType;
  setRolePermissions: React.Dispatch<React.SetStateAction<RolePermissionsType>>;
}

const RolePermissions: React.FC<RolePermissionsProps> = ({ rolePermissions, setRolePermissions }) => {
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [tempPermissions, setTempPermissions] = useState<RolePermissionsType>();
  const { toast } = useToast();

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
  );
};

export default RolePermissions;
