import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProducts } from '@/lib/actions/products'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const products = await getProducts()

  return <AdminDashboard initialProducts={products} />
}
