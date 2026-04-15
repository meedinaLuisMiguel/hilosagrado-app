'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Category, categories, getCategoryName } from '@/lib/data'
import { Button } from '@/components/ui/button'

interface CategoryFilterProps {
  selectedCategory: Category | null
  onClear: () => void
}

export function CategoryFilter({ selectedCategory, onClear }: CategoryFilterProps) {
  const category = categories.find(c => c.id === selectedCategory)

  return (
    <AnimatePresence>
      {selectedCategory && category && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="py-4 px-4 bg-secondary/50 border-b border-border">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Mostrando:</span>
                <span className="font-serif font-semibold text-foreground">
                  {getCategoryName(selectedCategory)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Ver todo
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
