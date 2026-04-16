'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { CategoryData } from '@/lib/types'

interface CategoriesProps {
  onCategorySelect: (categoryId: number) => void
  categories: CategoryData[]
}

export function Categories({ onCategorySelect, categories }: CategoriesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="categorias" className="relative py-20 sm:py-28 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
              🎨 Nuestras Colecciones
            </span>
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Categorías
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestras colecciones y encuentra la pieza perfecta para ti
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategorySelect(category.id)}
              className="group relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {/* Background Image */}
              <Image
                src={category.image || '/placeholder.jpg'}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent transition-all duration-300 group-hover:from-foreground/80" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-background mb-2">
                    {category.name}
                  </h3>
                  <p className="text-background/80 text-sm sm:text-base line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
                    {category.description}
                  </p>
                </motion.div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />

              {/* Arrow indicator */}
              <motion.div
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center backdrop-blur-sm"
                initial={{ x: 0, y: 0 }}
                whileHover={{ x: 4, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl">→</span>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />
    </section>
  )
}
