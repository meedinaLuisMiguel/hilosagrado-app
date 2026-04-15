import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Usar la clave de servicio para bypass de RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const extension = file.name.split('.').pop() || 'jpg'
    const fileName = `product-${timestamp}-${random}.${extension}`

    // Convertir archivo a buffer
    const buffer = await file.arrayBuffer()

    console.log('Uploading file:', { fileName, fileSize: file.size, fileType: file.type })

    // Subir archivo a Supabase Storage
    const { data, error } = await supabase.storage
      .from('products')
      .upload(fileName, new Uint8Array(buffer), {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Supabase storage error:', error)
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      )
    }

    if (!data || !data.path) {
      console.error('No path returned from upload')
      return NextResponse.json(
        { error: 'Upload succeeded but no path returned' },
        { status: 500 }
      )
    }

    console.log('File uploaded successfully:', data.path)

    // Obtener URL pública
    const { data: publicData } = supabase.storage
      .from('products')
      .getPublicUrl(data.path)

    return NextResponse.json({
      url: publicData.publicUrl,
      path: data.path,
    }, { status: 200 })
  } catch (error) {
    console.error('Upload error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: `Server error: ${message}` },
      { status: 500 }
    )
  }
}
