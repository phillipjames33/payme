import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22V2" />
      <path d="M5 10.5c3.6-1 7.1-4.2 7.1-8.5" />
      <path d="M12 2c3.5 0 7 2.5 7 6.5" />
      <path d="M19 14c-3.6 1-7.1 4.2-7.1 8.5" />
      <path d="M12 22c-3.5 0-7-2.5-7-6.5" />
    </svg>
  );
}
