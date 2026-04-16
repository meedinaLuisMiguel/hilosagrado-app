'use client'

import { useState, useMemo } from 'react'
import type { Product, CategoryData } from '@/lib/types'
import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { FeaturedSection } from '@/components/landing/featured-section'
import { ProductSection } from '@/components/landing/product-section'
import { Categories } from '@/components/landing/categories'
import { CategoryFilter } from '@/components/landing/category-filter'
import { ProductModal } from '@/components/landing/product-modal'
import { Footer } from '@/components/landing/footer'

interface LandingPageProps {
  products: Product[]
  newProducts: Product[]
  featuredProducts: Product[]
  categories: CategoryData[]
}

export function LandingPage({ products, newProducts, featuredProducts, categories }: LandingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return products.filter(p => p.category_id === selectedCategory)
    }
    return null
  }, [products, selectedCategory])

  const categoryName = useMemo(() => {
    return categories.find(c => c.id === selectedCategory)?.name || 'Colección'
  }, [selectedCategory, categories])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId)
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
      <Header />
      
      <Hero />

      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onClear={handleClearCategory} 
      />

      {selectedCategory && filteredProducts && (
        <ProductSection
          id="productos-filtrados"
          title={categoryName}
          subtitle="Explora todos los productos de esta categoría"
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      )}

      {!selectedCategory && (
        <>
          <FeaturedSection
            id="lo-mas-nuevo"
            title="Lo Más Nuevo"
            subtitle="Descubre las últimas creaciones hechas con amor y dedicación"
            products={newProducts}
            onProductClick={handleProductClick}
          />

          <Categories onCategorySelect={handleCategorySelect} categories={categories} />

          <ProductSection
            id="lo-mas-visto"
            title="Lo Más Visto"
            subtitle="Las piezas favoritas de nuestra comunidad"
            products={featuredProducts}
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