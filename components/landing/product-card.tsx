'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Product } from '@/lib/types'
import { formatPrice, getCategoryName } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  product: Product
  onClick: () => void
  index?: number
}

export function ProductCard({ product, onClick, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image_url || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Destacado
              </Badge>
            )}
            {!product.available && (
              <Badge variant="secondary" className="bg-foreground/80 text-background text-xs">
                Agotado
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="outline" className="bg-background/90 text-foreground text-xs border-border">
              {getCategoryName(product.category_id)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
          <p className="font-semibold text-primary text-lg">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
