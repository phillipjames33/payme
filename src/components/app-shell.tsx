
"use client";

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Swords,
  Trophy,
  User,
  CreditCard,
  Send,
} from 'lucide-react';
import { Logo } from './icons';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { USERS } from '@/lib/data';

function getPageTitle(pathname: string): string {
  if (pathname === '/') return 'The Game';
  if (pathname === '/leaderboard') return 'Leaderboard';
  if (pathname === '/dashboard') return 'My Dashboard';
  if (pathname === '/dashboard/collect') return 'AI Collections Agent';
  
  const username = pathname.substring(1);
  const user = USERS.find(u => u.username === username);
  if(user) {
    return `${user.displayName}'s Profile`;
  }

  return 'PayMe';
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentUser = USERS[0]; // Mock current user
  
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-6 text-primary" />
            <h1 className="font-headline text-lg font-bold text-primary">
              PayMe
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/${currentUser.username}`}
                tooltip={{ children: 'My Profile', side: 'right' }}
              >
                <Link href={`/${currentUser.username}`}>
                  <Avatar className="size-6">
                    <AvatarImage src={currentUser.profilePictureUrl} alt={currentUser.displayName} data-ai-hint="person portrait" />
                    <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <span>My Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div className='flex items-center gap-2'>
            <SidebarTrigger className="md:hidden" />
            {isClient && (
              <h2 className="font-headline text-xl font-semibold tracking-tight">
                {getPageTitle(pathname)}
              </h2>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.profilePictureUrl} alt={currentUser.displayName} data-ai-hint="person portrait" />
                  <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>

                  <p className="text-xs leading-none text-muted-foreground">
                    @{currentUser.username}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard" className='flex items-center w-full'>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/${currentUser.username}`} className='flex items-center w-full'>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

const navItems = [
    { href: '/', icon: <Swords />, label: 'The Game' },
    { href: '/leaderboard', icon: <Trophy />, label: 'Leaderboard' },
    {
      href: '/dashboard',
      icon: <LayoutDashboard />,
      label: 'Dashboard',
    },
    { href: '/dashboard/collect', icon: <Send />, label: 'AI Collector' },
  ];
