// lib/actions/products.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Product, ProductInsert, ProductUpdate } from '@/lib/types'

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
  return data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('available', true)
    .order('created_at', { ascending: false })
    .limit(8)
  return data || []
}

export async function getNewProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_new', true)
    .eq('available', true)
    .order('created_at', { ascending: false })
    .limit(8)
  return data || []
}

export async function createProduct(product: ProductInsert) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').insert(product)
  if (error) return { success: false, error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function updateProduct(id: string, updates: ProductUpdate) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').update(updates).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function toggleProductAvailability(id: string, available: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').update({ available }).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/dashboard')
  return { success: true }
}