'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Instagram } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatPrice, getCategoryName } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl sm:w-full sm:max-h-[90vh] bg-background rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row h-full overflow-auto">
              {/* Image */}
              <div className="relative w-full sm:w-1/2 aspect-square sm:aspect-auto sm:min-h-[400px] flex-shrink-0">
                <Image
                  src={product.image_url || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <Badge className="bg-primary text-primary-foreground">
                      Destacado
                    </Badge>
                  )}
                  {!product.available && (
                    <Badge variant="secondary" className="bg-foreground/80 text-background">
                      Agotado
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <Badge variant="outline" className="w-fit mb-3 border-border text-muted-foreground">
                  {getCategoryName(product.category)}
                </Badge>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {product.name}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>

                <div className="space-y-4">
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <a
                      href="https://instagram.com/_.hilosagrado"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Instagram className="w-5 h-5" />
                      Consultar Disponibilidad
                    </a>
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Escríbenos por Instagram para hacer tu pedido
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
