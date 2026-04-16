'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, 
  LogOut, 
  Package, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  Home,
  Loader2
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Product, CategoryData } from '@/lib/types'
import { formatPrice, getCategoryName } from '@/lib/types'
import { deleteProduct, toggleProductAvailability } from '@/lib/actions/products'
import { getCategories } from '@/lib/actions/categories'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductForm } from '@/components/admin/product-form'
import { DeleteDialog } from '@/components/admin/delete-dialog'
import Image from 'next/image'
import Link from 'next/link'

interface AdminDashboardProps {
  initialProducts: Product[]
}

export function AdminDashboard({ initialProducts }: AdminDashboardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [products, setProducts] = useState(initialProducts)
  const [categoriesList, setCategoriesList] = useState<CategoryData[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all')

  // Cargar categorías dinámicas al montar el componente
  useEffect(() => {
    getCategories().then(setCategoriesList)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
    router.refresh()
  }

  const handleDelete = async () => {
    if (deletingProduct) {
      startTransition(async () => {
        await deleteProduct(deletingProduct.id)
        setProducts(prev => prev.filter(p => p.id !== deletingProduct.id))
        setDeletingProduct(null)
      })
    }
  }

  const handleToggleAvailability = async (product: Product) => {
    startTransition(async () => {
      await toggleProductAvailability(product.id, !product.available)
      setProducts(prev => prev.map(p => 
        p.id === product.id ? { ...p, available: !p.available } : p
      ))
    })
  }

  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category_id === filterCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-xl font-bold text-foreground">
              Panel Admin
            </h1>
            <Badge variant="outline" className="text-xs">
              Hilo Sagrado
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Ver Tienda
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{products.length}</p>
                <p className="text-xs text-muted-foreground">Total Productos</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {products.filter(p => p.available).length}
                </p>
                <p className="text-xs text-muted-foreground">Disponibles</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <EyeOff className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {products.filter(p => !p.available).length}
                </p>
                <p className="text-xs text-muted-foreground">Agotados</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {products.filter(p => p.is_featured).length}
                </p>
                <p className="text-xs text-muted-foreground">Destacados</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={filterCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory('all')}
              className={filterCategory === 'all' ? 'bg-primary' : ''}
            >
              Todos
            </Button>
            {categoriesList.map(cat => (
              <Button
                key={cat.id}
                variant={filterCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory(cat.id)}
                className={filterCategory === cat.id ? 'bg-primary' : ''}
              >
                {cat.name}
              </Button>
            ))}
          </div>
          
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Añadir Producto
          </Button>
        </div>

        {/* Products Table/Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Producto</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Categoría</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Precio</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                          {product.image_url ? (
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <Package className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{getCategoryName(product.category_id, categoriesList)}</Badge>
                    </td>
                    <td className="p-4 font-medium text-foreground">
                      {formatPrice(product.price)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {product.available ? (
                          <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                            Disponible
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-orange-500/10 text-orange-700">
                            Agotado
                          </Badge>
                        )}
                        {product.is_featured && (
                          <Badge className="bg-primary/10 text-primary">Destacado</Badge>
                        )}
                        {product.is_new && (
                          <Badge className="bg-blue-500/10 text-blue-700">Nuevo</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleAvailability(product)}
                          title={product.available ? 'Marcar como agotado' : 'Marcar como disponible'}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : product.available ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingProduct(product)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Package className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-primary font-medium">{formatPrice(product.price)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleToggleAvailability(product)}
                          disabled={isPending}
                        >
                          {product.available ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setDeletingProduct(product)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{getCategoryName(product.category_id, categoriesList)}</Badge>
                      {product.available ? (
                        <Badge className="bg-green-500/10 text-green-700 text-xs">Disponible</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-700 text-xs">Agotado</Badge>
                      )}
                      {product.is_featured && <Badge className="bg-primary/10 text-primary text-xs">Destacado</Badge>}
                      {product.is_new && <Badge className="bg-blue-500/10 text-blue-700 text-xs">Nuevo</Badge>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No hay productos en esta categoría</p>
            </div>
          )}
        </motion.div>
      </main>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        product={editingProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDelete}
        productName={deletingProduct?.name || ''}
      />
    </div>
  )
}