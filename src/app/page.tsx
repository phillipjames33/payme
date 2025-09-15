
import { PayMeGameCard } from '@/components/pay-me-game-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { USERS } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <PayMeGameCard />
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-primary">
              How to Play
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary font-bold">
                1
              </div>
              <p className="flex-1 text-muted-foreground">
                A public debt is displayed, but the amount is hidden.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary font-bold">
                2
              </div>
              <p className="flex-1 text-muted-foreground">
                Guess the amount owed. You only have one chance per debt!
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary font-bold">
                3
              </div>
              <p className="flex-1 text-muted-foreground">
                If your guess is close, the card glows green. If not, it glows
                red.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary font-bold">
                4
              </div>
              <p className="flex-1 text-muted-foreground">
                Climb the leaderboard by helping lenders resolve debts.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Featured Profiles</CardTitle>
            <CardDescription>Top earners on PayMe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {USERS.slice(0, 3).map((user) => (
              <Link
                href={`/${user.username}`}
                key={user.id}
                className="flex items-center gap-4 p-2 -m-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Avatar>
                  <AvatarImage src={user.profilePictureUrl} alt={user.displayName} data-ai-hint="person portrait" />
                  <AvatarFallback>
                    {user.displayName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.services[0]}
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
