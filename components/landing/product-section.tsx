'use client'

import { motion } from 'framer-motion'
import type { Product } from '@/lib/types'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id={id} className="relative py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                product={product}
                onClick={() => onProductClick(product)}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
