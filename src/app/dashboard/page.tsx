
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DEBTS, USERS } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PenSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ClientFormattedDate } from '@/components/client-date';

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentUser = USERS[0];
  const myDebts = DEBTS.filter((debt) => debt.lender.id === currentUser.id);

  if (!isClient) {
    return null;
  }

  return (
    <Tabs defaultValue="debts">
      <TabsList className="grid w-full grid-cols-3 max-w-lg">
        <TabsTrigger value="debts">My Debts</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="add-debt">Add New Debt</TabsTrigger>
      </TabsList>
      <TabsContent value="debts" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Posted Debts</CardTitle>
            <CardDescription>
              A list of debts you have posted on PayMe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Debtor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myDebts.map((debt) => (
                  <TableRow key={debt.id}>
                    <TableCell className="font-medium">
                      {debt.debtorName}
                    </TableCell>
                    <TableCell>${debt.debtAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <ClientFormattedDate dateString={debt.createdAt} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{debt.collectionStatus}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <PenSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="profile" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Edit My Profile</CardTitle>
            <CardDescription>
              Update your public information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={currentUser.displayName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={currentUser.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={currentUser.bio} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="services">Services (comma-separated)</Label>
              <Input
                id="services"
                defaultValue={currentUser.services.join(', ')}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="add-debt" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Post a New Debt</CardTitle>
            <CardDescription>
              Add a new debt to be featured on PayMe.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="debtorName">Debtor's Name</Label>
              <Input id="debtorName" placeholder="e.g., John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debtAmount">Amount Owed</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="debtAmount"
                  type="number"
                  placeholder="e.g., 50.00"
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="story">The Story</Label>
              <Textarea
                id="story"
                placeholder="Tell us what happened..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">This will be publicly visible on PayMe.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Post Debt</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
