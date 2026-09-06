import { images } from './images'

export type GoatPurpose = 'sale' | 'qurbani' | 'breeding'

export interface Goat {
  id: string
  name: string
  breed: string
  age: string
  weight: string
  price: number
  purpose: GoatPurpose
  image: string
  description: string
  available: boolean
}

export interface FeedProduct {
  id: string
  name: string
  description: string
  price: number
  unit: string
  image: string
}

export const goats: Goat[] = [
  {
    id: 'g1',
    name: 'Sultan',
    breed: 'Beetal',
    age: '8 months',
    weight: '35 kg',
    price: 45000,
    purpose: 'sale',
    image: images.goats.beetal,
    description: 'Strong and healthy Beetal goat. Great for home or small farm.',
    available: true,
  },
  {
    id: 'g2',
    name: 'Noori',
    breed: 'Kamori',
    age: '10 months',
    weight: '42 kg',
    price: 55000,
    purpose: 'sale',
    image: images.goats.kamori,
    description: 'Beautiful Kamori breed with good height and clean coat.',
    available: true,
  },
  {
    id: 'g3',
    name: 'Chandni',
    breed: 'Teddy',
    age: '6 months',
    weight: '22 kg',
    price: 28000,
    purpose: 'sale',
    image: images.goats.teddy,
    description: 'Friendly Teddy goat. Easy to keep and very active.',
    available: true,
  },
  {
    id: 'g4',
    name: 'Badshah',
    breed: 'Beetal',
    age: '14 months',
    weight: '55 kg',
    price: 72000,
    purpose: 'qurbani',
    image: images.goats.herdField,
    description: 'Well-fed Beetal goat ready for Qurbani. Healthy and strong.',
    available: true,
  },
  {
    id: 'g5',
    name: 'Mehboob',
    breed: 'Kamori',
    age: '12 months',
    weight: '48 kg',
    price: 65000,
    purpose: 'qurbani',
    image: images.goats.herdGreen,
    description: 'Premium Kamori for Qurbani booking. Raised with care on green feed.',
    available: true,
  },
  {
    id: 'g6',
    name: 'Raja',
    breed: 'Desi',
    age: '18 months',
    weight: '60 kg',
    price: 58000,
    purpose: 'qurbani',
    image: images.goats.desi,
    description: 'Large Desi goat with strong build. Book early for Eid.',
    available: true,
  },
  {
    id: 'g7',
    name: 'Gulzar',
    breed: 'Barbari',
    age: '2 years',
    weight: '38 kg',
    price: 85000,
    purpose: 'breeding',
    image: images.goats.barbari,
    description: 'Proven Barbari breeding buck with good lineage.',
    available: true,
  },
  {
    id: 'g8',
    name: 'Zara',
    breed: 'Beetal',
    age: '1.5 years',
    weight: '40 kg',
    price: 78000,
    purpose: 'breeding',
    image: images.goats.whiteGoat,
    description: 'Healthy Beetal doe for breeding. Calm and well cared for.',
    available: true,
  },
]

export const feedProducts: FeedProduct[] = [
  {
    id: 'f1',
    name: 'Dry Lusan',
    description: 'Clean dry lusan for goats and sheep. Good for daily feeding.',
    price: 1200,
    unit: 'per 40 kg bag',
    image: images.feed.hay,
  },
  {
    id: 'f2',
    name: 'Wanda Mix',
    description: 'Balanced wanda mix with grains and nutrients for strong growth.',
    price: 2800,
    unit: 'per 50 kg bag',
    image: images.feed.grain,
  },
  {
    id: 'f3',
    name: 'Green Fodder Pack',
    description: 'Fresh seasonal green fodder delivered from our farm.',
    price: 800,
    unit: 'per bundle',
    image: images.feed.greenFodder,
  },
]
