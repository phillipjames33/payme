
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DEBTS, User } from '@/lib/data';
import { Crown, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { ClientFormattedDistanceToNow } from '@/components/client-date';

type LeaderboardEntry = {
  rank: number;
  lender: User;
  debtorName: string;
  debtAmount: number;
  id: string;
  createdAt: string;
  score: number;
};

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const data = DEBTS.map((debt) => {
        const debtAgeInDays = (new Date().getTime() - new Date(debt.createdAt).getTime()) / (1000 * 3600 * 24);
        return {
          ...debt,
          score: debt.debtAmount + debtAgeInDays * 10,
      }})
        .sort((a, b) => b.score - a.score)
        .map((debt, index) => ({
          ...debt,
          rank: index + 1,
        }));
      setLeaderboardData(data);
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }
  
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-amber-400 text-amber-900';
    if (rank === 2) return 'bg-slate-300 text-slate-800';
    if (rank === 3) return 'bg-orange-400 text-orange-900';
    return 'bg-secondary';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Trophy className="text-primary" />
            Top Outstanding Debts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">Rank</TableHead>
              <TableHead>Owed To</TableHead>
              <TableHead>Owed By</TableHead>
              <TableHead>Debt Age</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow key={entry.id} className="font-medium">
                <TableCell className="text-center">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-lg font-bold ${getRankColor(entry.rank)}`}>
                        {entry.rank === 1 ? <Crown className="w-6 h-6" /> : entry.rank}
                    </div>
                </TableCell>
                <TableCell>
                  <Link href={`/${entry.lender.username}`} className="flex items-center gap-3 group">
                    <Avatar>
                      <AvatarImage src={entry.lender.profilePictureUrl} alt={entry.lender.displayName} data-ai-hint="person portrait" />
                      <AvatarFallback>
                        {entry.lender.displayName.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">{entry.lender.displayName}</p>
                        <p className="text-xs text-muted-foreground">@{entry.lender.username}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                    <p className='font-semibold'>{entry.debtorName}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <ClientFormattedDistanceToNow dateString={entry.createdAt} />
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="destructive" className="text-base">
                    $ {entry.debtAmount.toFixed(2)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
