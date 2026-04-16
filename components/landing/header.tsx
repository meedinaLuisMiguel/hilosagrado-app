'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Inicio', href: '#' },
    { label: 'Lo Nuevo', href: '#lo-mas-nuevo' },
    { label: 'Categorías', href: '#categorias' },
    { label: 'Favoritos', href: '#lo-mas-visto' },
  ]

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    if (href === '#') return
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-primary/10 flex-shrink-0 hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src="https://abjmkxitujecmufprjbr.supabase.co/storage/v1/object/public/products/hslog.png"
                    alt="Hilo Sagrado Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="font-serif font-bold text-foreground text-lg leading-none">Hilo Sagrado</p>
                  <p className="text-xs text-muted-foreground">by Geral Velasquez</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </motion.nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground hover:bg-primary/10 rounded-lg">
                  <ShoppingBag className="w-5 h-5" />
                </Button>
              </motion.div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-2 border-t border-border/30 pt-4"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-4 py-2.5 text-foreground/70 hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors text-sm font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.nav>
          )}
        </div>
      </motion.div>
    </header>
  )
}
