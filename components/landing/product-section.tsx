'use client'

import { motion } from 'framer-motion'
import { Product } from '@/lib/data'
import { ProductCard } from './product-card'

interface ProductSectionProps {
  id?: string
  title: string
  subtitle?: string
  products: Product[]
  onProductClick: (product: Product) => void
}

export function ProductSection({ id, title, subtitle, products, onProductClick }: ProductSectionProps) {
  if (products.length === 0) return null

  return (
    <section id={id} className="py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
