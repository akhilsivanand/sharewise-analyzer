
import React from 'react';
import { User, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const UserActivity: React.FC = () => {
  return (
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
  );
};

export default UserActivity;
