import { getProducts, getNewProducts, getFeaturedProducts } from '@/lib/actions/products'
import { LandingPage } from '@/components/landing/landing-page'

export default async function Home() {
  const [products, newProducts, featuredProducts] = await Promise.all([
    getProducts(),
    getNewProducts(),
    getFeaturedProducts(),
  ])

  return (
    <LandingPage 
      products={products}
      newProducts={newProducts}
      featuredProducts={featuredProducts}
    />
  )
}
