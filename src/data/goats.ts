import { images } from './images'

export type GoatPurpose = 'sale' | 'qurbani' | 'breeding'

export interface Goat {
  id: string
  breedLabel: string
  age: string
  weight: string
  purpose: GoatPurpose
  image: string
  description: string
  available: boolean
}

export interface FeedProduct {
  id: string
  name: string
  description: string
  image: string
}

export const goats: Goat[] = [
  {
    id: 'g1',
    breedLabel: 'Beetal (Black / White)',
    age: '8 months',
    weight: '35 kg',
    purpose: 'sale',
    image: images.goats.beetalBW,
    description: 'Strong and healthy Beetal goat. Great for home or small farm.',
    available: true,
  },
  {
    id: 'g2',
    breedLabel: 'Makhni Cheena',
    age: '10 months',
    weight: '42 kg',
    purpose: 'sale',
    image: images.goats.makhiCheena,
    description: 'Premium Makhni Cheena with good height and clean coat.',
    available: true,
  },
  {
    id: 'g3',
    breedLabel: 'Teddy Goat',
    age: '6 months',
    weight: '22 kg',
    purpose: 'sale',
    image: images.goats.teddy,
    description: 'Friendly Teddy goat. Easy to keep and very active.',
    available: true,
  },
  {
    id: 'g4',
    breedLabel: 'Beetal (Black / White)',
    age: '14 months',
    weight: '55 kg',
    purpose: 'qurbani',
    image: images.goats.beetalQurbani,
    description: 'Well-fed Beetal goat ready for Qurbani. Healthy and strong.',
    available: true,
  },
  {
    id: 'g5',
    breedLabel: 'Kamori',
    age: '12 months',
    weight: '48 kg',
    purpose: 'qurbani',
    image: images.goats.kamori,
    description: 'Premium Kamori for Qurbani booking. Raised with care on green feed.',
    available: true,
  },
  {
    id: 'g6',
    breedLabel: 'Desi (Local)',
    age: '18 months',
    weight: '60 kg',
    purpose: 'qurbani',
    image: images.goats.desi,
    description: 'Large Desi goat with strong build. Book early for Eid.',
    available: true,
  },
  {
    id: 'g7',
    breedLabel: 'Barbari',
    age: '2 years',
    weight: '38 kg',
    purpose: 'breeding',
    image: images.goats.barbari,
    description: 'Proven Barbari breeding goat with good lineage.',
    available: true,
  },
  {
    id: 'g8',
    breedLabel: 'Beetal (White)',
    age: '1.5 years',
    weight: '40 kg',
    purpose: 'breeding',
    image: images.goats.beetalWhite,
    description: 'Healthy white Beetal for breeding. Calm and well cared for.',
    available: true,
  },
]

export const feedProducts: FeedProduct[] = [
  {
    id: 'f1',
    name: 'Dry Lusan',
    description: 'Clean dry lusan for goats and sheep. Good for daily feeding.',
    image: images.feed.lusan,
  },
  {
    id: 'f2',
    name: 'Wanda Mix',
    description: 'Balanced wanda mix with grains and nutrients for strong growth.',
    image: images.feed.wanda,
  },
  {
    id: 'f3',
    name: 'Green Fodder Pack',
    description: 'Fresh seasonal green fodder delivered from our farm.',
    image: images.feed.greenFodder,
  },
]
