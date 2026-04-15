'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, MapPin, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

const FOOTER_CONFIG = {
  logo: 'https://abjmkxitujecmufprjbr.supabase.co/storage/v1/object/public/products/hslog.png',
  brandName: 'Hilo Sagrado',
  tagline: 'by Geral Velasquez',
  description: 'Arte tejido con intención. Cada pieza refleja detalle, significado y autenticidad.',
  instagram: 'https://instagram.com/_.hilosagrado',
  instagramHandle: '@_.hilosagrado',
  location: 'Villamaría, Caldas, Colombia',
  adminLink: '/admin/login',
} as const

function FooterLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex-shrink-0"
    >
      <div className="relative w-100 h-100 sm:w-60 sm:h-80">
        <Image
          src={FOOTER_CONFIG.logo}
          alt={FOOTER_CONFIG.brandName}
          fill
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}

function FooterContent() {
  return (
    <div className="flex-1">
      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8"
      >
        <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          {FOOTER_CONFIG.brandName}
        </h3>
        <p className="text-background/70 italic text-sm sm:text-base">
          {FOOTER_CONFIG.tagline}
        </p>
      </motion.div>

      {/* Social & Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8"
      >
        {/* Instagram */}
        <a
          href={FOOTER_CONFIG.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-background/80 hover:text-primary-foreground transition-colors group"
        >
          <Instagram className="w-5 h-5 group-hover:text-primary transition-colors flex-shrink-0" />
          <span>{FOOTER_CONFIG.instagramHandle}</span>
        </a>

        <span className="hidden sm:block w-px h-4 bg-background/30" />

        {/* Location */}
        <div className="flex items-center gap-2 text-background/80">
          <MapPin className="w-5 h-5 flex-shrink-0" />
          <span>{FOOTER_CONFIG.location}</span>
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
        {FOOTER_CONFIG.description}
      </motion.p>

      {/* Divider */}
      <div className="w-full h-px bg-background/20 mb-6" />

      {/* Copyright & Admin Link */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-background/50">
        <p>&copy; {new Date().getFullYear()} {FOOTER_CONFIG.brandName}. Todos los derechos reservados.</p>

        <Link
          href={FOOTER_CONFIG.adminLink}
          className="flex items-center gap-1 hover:text-background/70 transition-colors"
        >
          <Lock className="w-3 h-3" />
          <span>Admin</span>
        </Link>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-foreground/95 text-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8 lg:gap-12">
          {/* Logo */}
          <FooterLogo />

          {/* Content */}
          <FooterContent />
        </div>
      </div>
    </footer>
  )
}
