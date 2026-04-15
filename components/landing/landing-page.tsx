'use client'

import { useState, useMemo } from 'react'
import type { Product, Category } from '@/lib/types'
import { Hero } from '@/components/landing/hero'
import { ProductSection } from '@/components/landing/product-section'
import { Categories } from '@/components/landing/categories'
import { CategoryFilter } from '@/components/landing/category-filter'
import { ProductModal } from '@/components/landing/product-modal'
import { Footer } from '@/components/landing/footer'

interface LandingPageProps {
  products: Product[]
  newProducts: Product[]
  featuredProducts: Product[]
}

export function LandingPage({ products, newProducts, featuredProducts }: LandingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const displayNewProducts = useMemo(() => {
    if (selectedCategory) {
      return newProducts.filter(p => p.category === selectedCategory)
    }
    return newProducts
  }, [newProducts, selectedCategory])

  const displayFeaturedProducts = useMemo(() => {
    if (selectedCategory) {
      return featuredProducts.filter(p => p.category === selectedCategory)
    }
    return featuredProducts
  }, [featuredProducts, selectedCategory])

  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return products.filter(p => p.category === selectedCategory)
    }
    return null
  }, [products, selectedCategory])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setTimeout(() => {
      const element = document.getElementById('productos-filtrados')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleClearCategory = () => {
    setSelectedCategory(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Hero />

      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onClear={handleClearCategory} 
      />

      {selectedCategory && filteredProducts && (
        <ProductSection
          id="productos-filtrados"
          title={selectedCategory === 'mascotas' ? 'Mascotas' : selectedCategory === 'mama' ? 'Para Mamá' : 'Accesorios'}
          subtitle="Explora todos los productos de esta categoría"
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      )}

      {!selectedCategory && (
        <>
          <ProductSection
            id="lo-mas-nuevo"
            title="Lo Más Nuevo"
            subtitle="Descubre las últimas creaciones hechas con amor y dedicación"
            products={displayNewProducts}
            onProductClick={handleProductClick}
          />

          <Categories onCategorySelect={handleCategorySelect} />

          <ProductSection
            id="lo-mas-visto"
            title="Lo Más Visto"
            subtitle="Las piezas favoritas de nuestra comunidad"
            products={displayFeaturedProducts}
            onProductClick={handleProductClick}
          />
        </>
      )}

      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  )
}
