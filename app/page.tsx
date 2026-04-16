// app/page.tsx
import { getProducts, getNewProducts, getFeaturedProducts } from '@/lib/actions/products'
import { getCategories } from '@/lib/actions/categories'
import { LandingPage } from '@/components/landing/landing-page'

export default async function Home() {
  const [products, newProducts, featuredProducts, dbCategories] = await Promise.all([
    getProducts(),
    getNewProducts(),
    getFeaturedProducts(),
    getCategories()
  ])

  return (
    <LandingPage 
      products={products}
      newProducts={newProducts}
      featuredProducts={featuredProducts}
      categories={dbCategories} // Pasamos categorías de la DB
    />
  )
}