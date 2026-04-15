'use client'

import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-foreground">
            Error de Autenticacion
          </h1>
          <p className="text-muted-foreground">
            Hubo un problema al iniciar sesion. Por favor intenta de nuevo.
          </p>
        </div>
        
        <Link 
          href="/admin/login"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Volver al login
        </Link>
      </div>
    </main>
  )
}
