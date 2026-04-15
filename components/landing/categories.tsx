'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { categories, Category } from '@/lib/data'

interface CategoriesProps {
  onCategorySelect: (category: Category) => void
}

export function Categories({ onCategorySelect }: CategoriesProps) {
  return (
    <section id="categorias" className="py-16 sm:py-20 px-4 bg-secondary/30">
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
            Categorías
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora nuestras colecciones y encuentra la pieza perfecta para ti
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategorySelect(category.id)}
              className="group relative aspect-[4/5] sm:aspect-[3/4] rounded-xl overflow-hidden cursor-pointer text-left"
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-background mb-2">
                  {category.name}
                </h3>
                <p className="text-background/80 text-sm sm:text-base line-clamp-2">
                  {category.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-xl transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
