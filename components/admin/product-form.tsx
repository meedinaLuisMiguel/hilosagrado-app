'use client'

import { useState, useEffect, useTransition, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ImageIcon, Loader2, Upload } from 'lucide-react'
import type { Product, Category } from '@/lib/types'
import { categories } from '@/lib/types'
import { createProduct, updateProduct } from '@/lib/actions/products'
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
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'accesorios' as Category,
    image_url: '',
    featured: false,
    available: true,
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        category: product.category,
        image_url: product.image_url || '',
        featured: product.featured,
        available: product.available,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'accesorios',
        image_url: '',
        featured: false,
        available: true,
      })
    }
    setError('')
    setUploadError('')
  }, [product, isOpen])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona una imagen válida')
      return
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('La imagen debe ser menor a 5MB')
      return
    }

    setIsUploading(true)
    setUploadError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        let errorMessage = 'Error al subir la imagen'
        try {
          const errorData = await response.json() as { error?: string }
          if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch {
          // Si no se puede parsear JSON, usar mensaje por defecto
        }
        throw new Error(errorMessage)
      }

      const data = await response.json() as { url: string }
      setFormData(prev => ({ ...prev, image_url: data.url }))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al subir la imagen. Intenta de nuevo.'
      setUploadError(errorMessage)
      console.error('Upload error:', err)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const productData = {
      name: formData.name,
      description: formData.description || null,
      price: parseInt(formData.price) || 0,
      category: formData.category,
      image_url: formData.image_url || null,
      featured: formData.featured,
      available: formData.available,
    }

    startTransition(async () => {
      let result
      if (product) {
        result = await updateProduct(product.id, productData)
      } else {
        result = await createProduct(productData)
      }

      if (result.success) {
        onClose()
      } else {
        setError(result.error || 'Error al guardar el producto')
      }
    })
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, image_url: e.target.value }))
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
                  
                  {formData.image_url ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <div className="space-y-3">
                        <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden bg-secondary">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={formData.image_url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                          >
                            Cambiar imagen
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* File Upload */}
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          disabled={isUploading}
                        />
                        <div className="space-y-3">
                          <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <Upload className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">
                              {isUploading ? 'Subiendo...' : 'Selecciona una imagen'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Haz clic para seleccionar o arrastra un archivo
                            </p>
                          </div>
                          {isUploading && (
                            <div className="flex items-center justify-center">
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* URL Input */}
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground text-center">O ingresa la URL de una imagen</p>
                        <Input
                          type="url"
                          placeholder="https://ejemplo.com/imagen.jpg"
                          value={formData.image_url}
                          onChange={handleImageUrlChange}
                        />
                      </div>

                      {uploadError && (
                        <p className="text-xs text-destructive text-center">{uploadError}</p>
                      )}
                    </div>
                  )}
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
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, featured: checked as boolean }))
                      }
                    />
                    <Label htmlFor="featured" className="cursor-pointer">
                      Destacar producto
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

                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={isPending}
                >
                  {isPending ? (
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
