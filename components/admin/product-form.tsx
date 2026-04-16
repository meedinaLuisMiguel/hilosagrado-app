// components/admin/product-form.tsx
'use client'

import { useState, useEffect, useTransition, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, Upload, Plus } from 'lucide-react'
import type { Product, CategoryData } from '@/lib/types'
import { getCategories, createCategory } from '@/lib/actions/categories'
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
  
  const [categoriesList, setCategoriesList] = useState<CategoryData[]>([])
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    is_featured: false,
    is_new: false,
    available: true,
  })

  useEffect(() => {
    if (isOpen) {
      getCategories().then(data => {
        setCategoriesList(data)
        // Solo setear categoría por defecto si es un producto nuevo y no tiene categoría
        if (!product && data.length > 0) {
          setFormData(prev => ({ 
            ...prev, 
            category_id: prev.category_id || data[0].id.toString() 
          }))
        }
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        category_id: product.category_id?.toString() || '',
        image_url: product.image_url || '',
        is_featured: product.is_featured,
        is_new: product.is_new,
        available: product.available,
      })
    } else if (isOpen) {
      setFormData(prev => ({
        name: '',
        description: '',
        price: '',
        category_id: prev.category_id,
        image_url: '',
        is_featured: false,
        is_new: false,
        available: true,
      }))
    }
    setError('')
    setUploadError('')
    setIsCreatingCategory(false)
    setNewCategoryName('')
  }, [product?.id, isOpen])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona una imagen válida')
      return
    }

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

      if (!response.ok) throw new Error('Error al subir la imagen')

      const data = await response.json()
      setFormData(prev => ({ ...prev, image_url: data.url }))
    } catch (err) {
      setUploadError('Error al subir la imagen. Intenta de nuevo.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return
    startTransition(async () => {
      const result = await createCategory(newCategoryName)
      if (result.success && result.id) {
        const updatedCategories = await getCategories()
        setCategoriesList(updatedCategories)
        setFormData(prev => ({ ...prev, category_id: result.id!.toString() }))
        setIsCreatingCategory(false)
        setNewCategoryName('')
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const productData = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price) || 0,
      category_id: parseInt(formData.category_id), // Convertimos a int8
      image_url: formData.image_url || null,
      is_featured: formData.is_featured,
      is_new: formData.is_new,
      available: formData.available,
    }

    startTransition(async () => {
      const result = product 
        ? await updateProduct(product.id, productData) 
        : await createProduct(productData)

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl sm:w-full sm:max-h-[90vh] bg-background rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-xl font-bold text-foreground">
                {product ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-6">
              <div className="space-y-6">
                {/* Imagen */}
                <div className="space-y-2">
                  <Label>Imagen del Producto</Label>
                  {formData.image_url ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50">
                      <div className="space-y-3">
                        <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden bg-secondary">
                          <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}>
                          Cambiar imagen
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" disabled={isUploading} />
                        <div className="space-y-3">
                          <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <Upload className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">{isUploading ? 'Subiendo...' : 'Selecciona una imagen'}</p>
                            <p className="text-xs text-muted-foreground">Haz clic para seleccionar un archivo</p>
                          </div>
                          {isUploading && <Loader2 className="w-4 h-4 animate-spin mx-auto text-primary" />}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground text-center">O ingresa la URL de una imagen</p>
                        <Input type="url" placeholder="https://ejemplo.com/imagen.jpg" value={formData.image_url} onChange={handleImageUrlChange} />
                      </div>
                      {uploadError && <p className="text-xs text-destructive text-center">{uploadError}</p>}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={3} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio (COP)</Label>
                    <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    {!isCreatingCategory ? (
                      <div className="flex gap-2">
                        <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriesList.map(cat => (
                              <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="outline" size="icon" className="shrink-0" onClick={() => setIsCreatingCategory(true)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input placeholder="Nombre..." value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="flex-1" />
                        <Button type="button" onClick={handleCreateCategory} disabled={isPending || !newCategoryName}>Guardar</Button>
                        <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={() => setIsCreatingCategory(false)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Checkboxes de la DB */}
                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="is_new" checked={formData.is_new} onCheckedChange={(c) => setFormData(prev => ({ ...prev, is_new: !!c }))} />
                    <Label htmlFor="is_new" className="cursor-pointer">Es nuevo</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="is_featured" checked={formData.is_featured} onCheckedChange={(c) => setFormData(prev => ({ ...prev, is_featured: !!c }))} />
                    <Label htmlFor="is_featured" className="cursor-pointer">Destacar</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="available" checked={formData.available} onCheckedChange={(c) => setFormData(prev => ({ ...prev, available: !!c }))} />
                    <Label htmlFor="available" className="cursor-pointer">Disponible</Label>
                  </div>
                </div>

                {error && <p className="text-sm text-destructive text-center">{error}</p>}
              </div>

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isPending}>Cancelar</Button>
                <Button type="submit" className="flex-1 bg-primary" disabled={isPending || !formData.category_id}>
                  {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...</> : product ? 'Guardar Cambios' : 'Crear Producto'}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}