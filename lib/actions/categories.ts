// lib/actions/categories.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase.from('categories').select('*').order('name')
  return data || []
}

export async function createCategory(name: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, description: 'Nueva categoría' })
    .select()
    .single()

  if (error) return { success: false, error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/dashboard')
  return { success: true, id: data.id }
}