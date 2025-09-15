
// Types
export type User = {
  id: string; // Kept for keying in React components
  username: string;
  email: string;
  createdAt: string; // Using string for mock data, can be Date object in a real DB
  displayName: string;
  bio: string;
  profilePictureUrl: string;
  contactNumber?: string;
  paymentMethodsAccepted?: string[];
  // From old schema for UI compatibility
  services: string[]; 
  achievements: { icon: string; title: string }[];
};

export type ServicePage = {
  id: string;
  user: User;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  servicesOffered?: string[];
  hourlyRate?: number;
  availability?: string;
  imageUrls?: string[];
};

export type PaymentTransaction = {
  id: string;
  sender: User;
  receiver: User;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  description?: string;
  servicePage?: ServicePage;
};

export type DebtPosting = {
  id: string;
  lender: User;
  debtorName: string;
  debtAmount: number; // For game logic, will be hidden from public view
  approximateAmountRange: string;
  isPublic: boolean;
  createdAt: string;
  dueDate: string;
  description: string; // This will be the 'story'
  initialDebtDate?: string;
  collectionStatus: 'unpaid' | 'paid' | 'in_collection';
};

export type CollectionAttempt = {
  id: string;
  debtPosting: DebtPosting;
  method: 'email' | 'text' | 'call';
  messageContent: string;
  attemptDate: string;
  status: 'sent' | 'failed' | 'responded';
  debtorContact: string;
  response?: string;
};


// Data
export const USERS: User[] = [
  {
    id: 'user_1',
    username: 'barberj',
    displayName: 'John the Barber',
    email: 'john.the.barber@example.com',
    createdAt: '2023-01-15T09:30:00Z',
    profilePictureUrl: 'https://picsum.photos/id/237/200/200',
    bio: 'Providing the freshest cuts in downtown. From classic styles to modern trends, I ensure you leave my chair looking your best. Cash, card, and now PayMe accepted!',
    services: ['Haircuts', 'Beard Trims', 'Styling'],
    achievements: [
      { icon: 'Scissors', title: 'Master Barber' },
      { icon: 'Gem', title: 'Top 1% Earner' },
      { icon: 'Users', title: '100+ Clients' },
    ],
    paymentMethodsAccepted: ['Cash', 'Card', 'PayMe'],
  },
  {
    id: 'user_2',
    username: 'musicianmax',
    displayName: 'Max Riff',
    email: 'max.riff@example.com',
    createdAt: '2023-02-20T14:00:00Z',
    profilePictureUrl: 'https://picsum.photos/id/1084/200/200',
    bio: 'Guitarist and vocalist available for events, session work, and lessons. Let me bring the sound to your next project or party. Check out my latest tracks!',
    services: ['Live Gigs', 'Guitar Lessons', 'Studio Session'],
    achievements: [
      { icon: 'Mic', title: 'Vocal Virtuoso' },
      { icon: 'Guitar', title: 'Guitar God' },
      { icon: 'Star', title: 'Fan Favorite' },
    ],
  },
  {
    id: 'user_3',
    username: 'tacomaria',
    displayName: 'Maria\'s Tacos',
    email: 'maria.tacos@example.com',
    createdAt: '2023-03-05T11:45:00Z',
    profilePictureUrl: 'https://picsum.photos/id/488/200/200',
    bio: 'The best street tacos this side of the city. Authentic recipes, fresh ingredients, and a whole lot of flavor. Find my truck at the city square every weekday!',
    services: ['Taco Catering', 'Food Truck Service', 'Event Pop-up'],
    achievements: [
      { icon: 'UtensilsCrossed', title: 'Top Chef' },
      { icon: 'Flame', title: 'Spicy Specialist' },
      { icon: 'MapPin', title: 'Local Legend' },
    ],
  },
  {
    id: 'user_4',
    username: 'uber-dave',
    displayName: 'Dave\'s Drive',
    email: 'dave.drive@example.com',
    createdAt: '2023-04-10T18:00:00Z',
    profilePictureUrl: 'https://picsum.photos/id/431/200/200',
    bio: 'Your friendly neighborhood Uber driver. 5-star rating with over 2,000 trips. Clean car, good music, and always on time. Pay for your rides directly here.',
    services: ['City Rides', 'Airport Transfers', 'Scheduled Pickups'],
    achievements: [
      { icon: 'Car', title: 'Pro Driver' },
      { icon: 'Zap', title: 'Quick Responder' },
      { icon: 'Award', title: '5-Star Rated' },
    ],
  },
];

export const DEBTS: DebtPosting[] = [
  {
    id: 'debt_1',
    lender: USERS[0],
    debtorName: 'Sam W.',
    debtAmount: 60.0,
    approximateAmountRange: '$50-$100',
    isPublic: true,
    createdAt: '2024-07-15T10:00:00Z',
    dueDate: '2024-06-17T10:00:00Z',
    initialDebtDate: '2024-06-10T10:00:00Z',
    description: "Sam came in for a haircut and beard trim, said he'd pay me back next week. It's been over a month now and he's been dodging my texts. The haircut was fire, though.",
    collectionStatus: 'unpaid',
  },
  {
    id: 'debt_2',
    lender: USERS[1],
    debtorName: 'Local Venue LLC',
    debtAmount: 500.0,
    approximateAmountRange: '$400-$600',
    isPublic: true,
    createdAt: '2024-06-01T19:00:00Z',
    dueDate: '2024-05-25T19:00:00Z',
    initialDebtDate: '2024-04-25T19:00:00Z',
    description: 'Played a 3-hour set at their downtown bar. The crowd loved it, but the manager keeps saying "the check is in the mail". My amp needs repairs, and this payment was supposed to cover it.',
    collectionStatus: 'in_collection',
  },
  {
    id: 'debt_3',
    lender: USERS[2],
    debtorName: 'Corporate Catering Co.',
    debtAmount: 1250.5,
    approximateAmountRange: '$1000-$1500',
    isPublic: true,
    createdAt: '2024-07-01T12:00:00Z',
    dueDate: '2024-06-20T12:00:00Z',
    initialDebtDate: '2024-05-20T12:00:00Z',
    description: 'Catered a large corporate lunch event. Everyone raved about the Al Pastor. The invoice was due 30 days ago, and their accounting department is giving me the runaround.',
    collectionStatus: 'unpaid',
  },
  {
    id: 'debt_4',
    lender: USERS[3],
    debtorName: 'Alex P.',
    debtAmount: 85.75,
    approximateAmountRange: '$75-$100',
    isPublic: true,
    createdAt: '2024-05-01T15:30:00Z',
    dueDate: '2024-04-05T15:30:00Z',
    initialDebtDate: '2024-03-27T15:30:00Z',
    description: 'Gave Alex a ride to the airport. It was a long trip with surge pricing. His card got declined at the end of the ride, and he promised to pay me via the app. Still waiting.',
    collectionStatus: 'unpaid',
  },
    {
    id: 'debt_5',
    lender: USERS[0],
    debtorName: 'Mikey "The Fade" F.',
    debtAmount: 30.0,
    approximateAmountRange: '$25-$50',
    isPublic: true,
    createdAt: '2024-07-28T17:00:00Z',
    dueDate: '2024-07-24T17:00:00Z',
    initialDebtDate: '2024-07-24T17:00:00Z',
    description: "A classic dine and dash... or in my case, a 'cut and run'. Got a quick fade, said his wallet was in the car, and then peeled out of the parking lot. Disappointing.",
    collectionStatus: 'unpaid',
  },
];
