'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, ImageIcon, Loader2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Product, Category, categories } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface ProductFormProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export function ProductForm({ isOpen, onClose, product }: ProductFormProps) {
  const { addProduct, updateProduct } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'accesorios' as Category,
    image: '',
    isNew: false,
    isFeatured: false,
    available: true,
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        available: product.available,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'accesorios',
        image: '',
        isNew: false,
        isFeatured: false,
        available: true,
      })
    }
  }, [product, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price) || 0,
      category: formData.category,
      image: formData.image || `https://picsum.photos/seed/${Date.now()}/400/400`,
      isNew: formData.isNew,
      isFeatured: formData.isFeatured,
      available: formData.available,
    }

    if (product) {
      updateProduct(product.id, productData)
    } else {
      addProduct(productData)
    }

    setIsLoading(false)
    onClose()
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, image: e.target.value }))
  }

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
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full sm:max-h-[90vh] bg-background rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-xl font-bold text-foreground">
                {product ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-6">
              <div className="space-y-6">
                {/* Image Upload Section */}
                <div className="space-y-2">
                  <Label>Imagen del Producto</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    {formData.image ? (
                      <div className="space-y-3">
                        <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden bg-secondary">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        >
                          Cambiar imagen
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Arrastra una imagen o ingresa la URL
                          </p>
                          <Input
                            type="url"
                            placeholder="https://ejemplo.com/imagen.jpg"
                            value={formData.image}
                            onChange={handleImageUrlChange}
                            className="max-w-xs mx-auto"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Pulsera Flor de Cerezo"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe la pieza, sus materiales y significado..."
                    rows={3}
                    required
                  />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio (COP)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="45000"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: Category) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="isNew"
                      checked={formData.isNew}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isNew: checked as boolean }))
                      }
                    />
                    <Label htmlFor="isNew" className="cursor-pointer">
                      Marcar como nuevo
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isFeatured: checked as boolean }))
                      }
                    />
                    <Label htmlFor="isFeatured" className="cursor-pointer">
                      Destacar en &quot;Lo más visto&quot;
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="available"
                      checked={formData.available}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, available: checked as boolean }))
                      }
                    />
                    <Label htmlFor="available" className="cursor-pointer">
                      Disponible para venta
                    </Label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Guardando...
                    </>
                  ) : product ? (
                    'Guardar Cambios'
                  ) : (
                    'Crear Producto'
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
