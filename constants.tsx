
import { Podcast } from './types';

export const PODCASTS: Podcast[] = [
  {
    id: '1',
    title: 'Tech Talk Today',
    host: 'Tech Experts',
    description: 'Stay updated with the latest in technology, gadgets, and digital trends. Hosted by tech experts, this podcast offers in-depth analysis and discussions on the ever-evolving world of tech.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjP1DWF4CfZwdOEY7H7sXxk--WaLAhkfoPo3M0bT2B2WFkb4lCPPOBmJ0A0PdULe6EIMSwJAALX3JulHK0-WT2Q1Zl8kBEs19iXsuPnl9ilvxSOFp7VYSAkjviTVtnqYYwVxvdFAOnXnmEWGF0BA8icQVqE-5bhZWbsVwgjQ26TGgMLM3Te88XCftbvGLJVNbELdJFf7R_zY0O1pRWcGd0Hb7W6eOQ8A1OLGFM6_IhEdE2oi3rzSizDeSZoeb2BJM-HfeNkRHclnVt',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '42:15',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Mindful Living',
    host: 'Wellness Experts',
    description: 'Explore the path to a more balanced and fulfilling life with Mindful Living. This podcast features interviews with wellness experts, mindfulness exercises, and discussions on mental health.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGyvN23fnCP_Z9JN4gzZFV1BUHJhA1yf2j0Eiu-ZvHMf6gBGhAfDu8f2qMID0_d7Gb01exVrpgc9E0FU_RKe47m87ahs4Uoh1GeSeMf3PueETb6OfDDg4qwL6-wP3nzCDqsurd3wTN3r01kdG-PWj7wESqPERHXaBANV4Tya7iD9R_4vgo8G7P2yKhmJl10ytzIf8QljrZtfzSH0jofHY4z9xfo_J68Rp2LtXGBDHH8K3gC5FcM3BU0237pbY3M2VLay4pJv3hGc1n',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '35:40',
    category: 'Health & Wellness'
  },
  {
    id: '3',
    title: 'The Future Economy',
    host: 'Sarah Jenkins',
    description: 'A deep dive into how blockchain, AI, and sustainable energy are reshaping the global financial landscape.',
    imageUrl: 'https://picsum.photos/seed/economy/800/450',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '28:10',
    category: 'Business'
  },
  {
    id: '4',
    title: 'Creative Sparks',
    host: 'Creative Collective',
    description: 'Unlocking your inner artist through unconventional methods and inspiring stories from world-class creators.',
    imageUrl: 'https://picsum.photos/seed/creative/800/450',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: '55:20',
    category: 'Arts'
  }
];

export const COLORS = {
  bg: '#131118',
  card: '#2e2839',
  primary: '#5b13ec',
  textSecondary: '#a69db9'
};
