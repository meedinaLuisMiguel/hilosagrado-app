// lib/types.ts

export interface Category {
  id: number
  name: string
  description: string
  image: string
}

export interface CategoryData {
  id: number
  name: string
  description: string | null
  image: string | null
}

// Categorías estáticas con imágenes para la landing page
export const categories: Category[] = [
  {
    id: 1,
    name: 'Mascotas',
    description: 'Joyería y accesorios para amantes de mascotas',
    image: '/placeholder.jpg',
  },
  {
    id: 2,
    name: 'Mamá',
    description: 'Regalos especiales para mamás',
    image: '/placeholder.jpg',
  },
  {
    id: 3,
    name: 'Accesorios',
    description: 'Joyería bohemia y accesorios',
    image: '/placeholder.jpg',
  },
]

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category_id: number // Coincide con tu esquema
  image_url: string | null
  is_new: boolean // Coincide con tu esquema
  is_featured: boolean // Coincide con tu esquema
  available: boolean
  created_at: string
}

export interface ProductInsert {
  name: string
  description?: string | null
  price: number
  category_id: number
  image_url?: string | null
  is_new?: boolean
  is_featured?: boolean
  available?: boolean
}

export interface ProductUpdate {
  name?: string
  description?: string | null
  price?: number
  category_id?: number
  image_url?: string | null
  is_new?: boolean
  is_featured?: boolean
  available?: boolean
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getCategoryName(categoryId: number | undefined | null, dynamicCategories?: CategoryData[]): string {
  if (!categoryId) return 'Sin categoría'
  
  // Si se proporcionan categorías dinámicas, usarlas
  if (dynamicCategories && dynamicCategories.length > 0) {
    const found = dynamicCategories.find(cat => cat.id === categoryId)
    if (found) return found.name
  }
  
  // Si no, usar las categorías estáticas
  const staticCategory = categories.find(cat => cat.id === categoryId)
  return staticCategory?.name || 'Sin categoría'
}