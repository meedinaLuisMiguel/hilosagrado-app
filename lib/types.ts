// Types for Supabase tables

export type Category = 'mascotas' | 'mama' | 'accesorios'

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: Category
  image_url: string | null
  available: boolean
  featured: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface ProductInsert {
  name: string
  description?: string | null
  price: number
  category: Category
  image_url?: string | null
  available?: boolean
  featured?: boolean
}

export interface ProductUpdate {
  name?: string
  description?: string | null
  price?: number
  category?: Category
  image_url?: string | null
  available?: boolean
  featured?: boolean
}

// Category info for display
export const categories: { id: Category; name: string; description: string; image: string }[] = [
  { id: 'mascotas', name: 'Mascotas', description: 'Collares y accesorios para tus compañeros peludos', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=800&fit=crop' },
  { id: 'mama', name: 'Para Mamá', description: 'Piezas especiales para celebrar a mamá', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop' },
  { id: 'accesorios', name: 'Accesorios', description: 'Aretes, pulseras y más para ti', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop' },
]

export function getCategoryName(category: Category): string {
  const cat = categories.find(c => c.id === category)
  return cat?.name || category
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
