'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/store'
import { Product, Category } from '@/lib/data'
import { Hero } from '@/components/landing/hero'
import { ProductSection } from '@/components/landing/product-section'
import { Categories } from '@/components/landing/categories'
import { CategoryFilter } from '@/components/landing/category-filter'
import { ProductModal } from '@/components/landing/product-modal'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  const { products, selectedCategory, setSelectedCategory } = useStore()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const newProducts = useMemo(() => {
    const filtered = products.filter(p => p.isNew)
    if (selectedCategory) {
      return filtered.filter(p => p.category === selectedCategory)
    }
    return filtered.slice(0, 6)
  }, [products, selectedCategory])

  const featuredProducts = useMemo(() => {
    const filtered = products.filter(p => p.isFeatured)
    if (selectedCategory) {
      return filtered.filter(p => p.category === selectedCategory)
    }
    return filtered
  }, [products, selectedCategory])

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
    // Scroll to products section
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

      {/* Show filtered products when category is selected */}
      {selectedCategory && filteredProducts && (
        <ProductSection
          id="productos-filtrados"
          title={`${selectedCategory === 'mascotas' ? 'Mascotas' : selectedCategory === 'para-mama' ? 'Para Mamá' : 'Accesorios'}`}
          subtitle="Explora todos los productos de esta categoría"
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      )}

      {/* Show regular sections when no category is selected */}
      {!selectedCategory && (
        <>
          <ProductSection
            id="lo-mas-nuevo"
            title="Lo Más Nuevo"
            subtitle="Descubre las últimas creaciones hechas con amor y dedicación"
            products={newProducts}
            onProductClick={handleProductClick}
          />

          <Categories onCategorySelect={handleCategorySelect} />

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
