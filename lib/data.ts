export type Category = 'mascotas' | 'para-mama' | 'accesorios'

export interface Product {
  id: string
  name: string
  category: Category
  description: string
  price: number
  image: string
  isNew: boolean
  isFeatured: boolean
  available: boolean
  createdAt: Date
}

export const categories: { id: Category; name: string; description: string; image: string }[] = [
  {
    id: 'mascotas',
    name: 'Mascotas',
    description: 'Piezas únicas inspiradas en el amor por nuestros compañeros peludos',
    image: 'https://picsum.photos/seed/mascotas-miyuki/400/400'
  },
  {
    id: 'para-mama',
    name: 'Para Mamá',
    description: 'Regalos especiales tejidos con amor para las personas más importantes',
    image: 'https://picsum.photos/seed/mama-miyuki/400/400'
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    description: 'Manillas, collares y aretes que complementan tu estilo único',
    image: 'https://picsum.photos/seed/accesorios-miyuki/400/400'
  }
]

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Pulsera Huellitas de Amor',
    category: 'mascotas',
    description: 'Delicada pulsera con huellitas tejidas en tonos tierra, perfecta para amantes de las mascotas.',
    price: 45000,
    image: 'https://picsum.photos/seed/huellitas-miyuki/400/400',
    isNew: true,
    isFeatured: true,
    available: true,
    createdAt: new Date('2024-03-15')
  },
  {
    id: '2',
    name: 'Collar Patitas Doradas',
    category: 'mascotas',
    description: 'Elegante collar con diseño de patitas en dorado y negro, símbolo del vínculo eterno.',
    price: 85000,
    image: 'https://picsum.photos/seed/patitas-collar/400/400',
    isNew: true,
    isFeatured: false,
    available: true,
    createdAt: new Date('2024-03-10')
  },
  {
    id: '3',
    name: 'Aretes Flor de Cerezo',
    category: 'para-mama',
    description: 'Aretes con delicadas flores de cerezo tejidas, ideales para mamá en su día especial.',
    price: 65000,
    image: 'https://picsum.photos/seed/flor-cerezo-aretes/400/400',
    isNew: true,
    isFeatured: true,
    available: true,
    createdAt: new Date('2024-03-12')
  },
  {
    id: '4',
    name: 'Pulsera Infinito Maternal',
    category: 'para-mama',
    description: 'Pulsera con símbolo del infinito, representando el amor sin fin de madre.',
    price: 55000,
    image: 'https://picsum.photos/seed/infinito-mama/400/400',
    isNew: false,
    isFeatured: true,
    available: true,
    createdAt: new Date('2024-02-20')
  },
  {
    id: '5',
    name: 'Collar Corazón Sagrado',
    category: 'para-mama',
    description: 'Collar con corazón tejido en tonos rosados y dorados, pieza central única.',
    price: 120000,
    image: 'https://picsum.photos/seed/corazon-sagrado/400/400',
    isNew: true,
    isFeatured: false,
    available: true,
    createdAt: new Date('2024-03-08')
  },
  {
    id: '6',
    name: 'Manilla Geométrica Boho',
    category: 'accesorios',
    description: 'Manilla con patrones geométricos en tonos neutros, estilo bohemio contemporáneo.',
    price: 38000,
    image: 'https://picsum.photos/seed/geometrica-boho/400/400',
    isNew: false,
    isFeatured: true,
    available: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '7',
    name: 'Aretes Luna Bordada',
    category: 'accesorios',
    description: 'Aretes en forma de media luna con detalles bordados, perfectos para ocasiones especiales.',
    price: 75000,
    image: 'https://picsum.photos/seed/luna-bordada/400/400',
    isNew: false,
    isFeatured: false,
    available: true,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '8',
    name: 'Collar Mandala Ancestral',
    category: 'accesorios',
    description: 'Imponente collar con mandala central, fusión de tradición y modernidad artesanal.',
    price: 180000,
    image: 'https://picsum.photos/seed/mandala-ancestral/400/400',
    isNew: false,
    isFeatured: true,
    available: true,
    createdAt: new Date('2024-02-28')
  }
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export function getCategoryName(category: Category): string {
  const cat = categories.find(c => c.id === category)
  return cat ? cat.name : category
}
