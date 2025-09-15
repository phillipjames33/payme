
import { USERS } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Car,
  Scissors,
  Home,
  Music,
  UtensilsCrossed,
  Gem,
  Users,
  Mic,
  Guitar,
  Star,
  Flame,
  MapPin,
  Zap,
  Award,
  Icon,
} from 'lucide-react';
import * as React from 'react';

type PageProps = {
  params: { username: string };
};

const iconMap: { [key: string]: React.ElementType } = {
  Car,
  Scissors,
  Home,
  Music,
  UtensilsCrossed,
  Gem,
  Users,
  Mic,
  Guitar,
  Star,
  Flame,
  MapPin,
  Zap,
  Award,
};

function AchievementIcon({ name, ...props }: { name: string } & React.ComponentProps<Icon>) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}


export default function UserProfilePage({ params }: PageProps) {
  const user = USERS.find((u) => u.username === params.username);

  if (!user) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-8">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-primary/50">
              <AvatarImage src={user.profilePictureUrl} alt={user.displayName} data-ai-hint="person portrait" />
              <AvatarFallback className='text-3xl'>
                {user.displayName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <h1 className="font-headline text-2xl font-bold">{user.displayName}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-4 text-sm">{user.bio}</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
                {user.achievements.map((ach) => (
                    <div key={ach.title} className="flex flex-col items-center text-center gap-2">
                        <div className="p-3 rounded-full bg-secondary">
                           <AchievementIcon name={ach.icon} className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-xs font-medium">{ach.title}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Services & Payments</CardTitle>
            <CardDescription>
              Book a service or send a payment directly to {user.displayName}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {user.services.map((service) => (
                <Badge key={service} variant="secondary" className="text-sm px-3 py-1">
                  {service}
                </Badge>
              ))}
            </div>
            <Separator className="my-6" />
            <div className="space-y-4">
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="w-full font-bold text-lg" variant="default">Pay {user.displayName}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle className="font-headline">Send payment to {user.displayName}</DialogTitle>
                        <DialogDescription>
                            Enter the amount and a note for your payment. This is a direct transaction.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                            Amount
                            </Label>
                            <div className="relative col-span-3">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input id="amount" type="number" placeholder="50.00" className="pl-7" />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="note" className="text-right">
                            Note
                            </Label>
                            <Input id="note" placeholder="For haircut, etc." className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit" size="lg">Send Payment</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
