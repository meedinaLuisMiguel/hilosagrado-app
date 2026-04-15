'use client'

import Link from 'next/link'
import { Instagram, MapPin, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
              Hilo Sagrado
            </h3>
            <p className="text-background/70 italic">by Geral Velasquez</p>
          </motion.div>

          {/* Social & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-8"
          >
            {/* Instagram */}
            <a
              href="https://instagram.com/_.hilosagrado"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-background/80 hover:text-primary-foreground transition-colors group"
            >
              <Instagram className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span>@_.hilosagrado</span>
            </a>

            <span className="hidden sm:block w-px h-4 bg-background/30" />

            {/* Location */}
            <div className="flex items-center gap-2 text-background/80">
              <MapPin className="w-5 h-5" />
              <span>Villamaría, Caldas, Colombia</span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-background/60 max-w-md mb-8"
          >
            Arte tejido con intención. Cada pieza refleja detalle, significado y autenticidad.
          </motion.p>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-background/20 mb-6" />

          {/* Copyright & Admin Link */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-background/50">
            <p>&copy; {new Date().getFullYear()} Hilo Sagrado. Todos los derechos reservados.</p>
            
            <Link
              href="/admin/login"
              className="flex items-center gap-1 hover:text-background/70 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
