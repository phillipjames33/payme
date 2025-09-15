
"use client";

import { format, formatDistanceToNow } from 'date-fns';

export function ClientFormattedDate({ dateString }: { dateString: string }) {
  if (!dateString) return <>...</>;
  return <>{format(new Date(dateString), 'MMMM d, yyyy')}</>;
}

export function ClientFormattedDistanceToNow({ dateString }: { dateString: string }) {
  if (!dateString) return <>...</>;
  return <>{formatDistanceToNow(new Date(dateString), { addSuffix: true })}</>;
}
