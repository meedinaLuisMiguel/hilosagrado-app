'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, Category, initialProducts } from './data'

interface StoreState {
  products: Product[]
  isAuthenticated: boolean
  selectedCategory: Category | null
  
  // Actions
  setAuthenticated: (value: boolean) => void
  setSelectedCategory: (category: Category | null) => void
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  toggleAvailability: (id: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: initialProducts,
      isAuthenticated: false,
      selectedCategory: null,

      setAuthenticated: (value) => set({ isAuthenticated: value }),
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              ...product,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),
      
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      
      toggleAvailability: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, available: !p.available } : p
          ),
        })),
    }),
    {
      name: 'hilo-sagrado-store',
    }
  )
)
