import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-border"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="container flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
          <a href="/" className="text-2xl font-bold tracking-tight">
            MarketHub
          </a>
          <nav className="flex items-center space-x-4">
            <a href="/seller" className="hover:text-primary transition-colors">
              Become a Seller
            </a>
            <a href="/login" className="hover:text-primary transition-colors">
              Login
            </a>
            <a href="/register" className="hover:text-primary transition-colors">
              Register
            </a>
          </nav>
        </div>
      </motion.header>

      <motion.main
        className="flex-1 py-12 md:py-16 lg:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="container max-w-7xl mx-auto px-4">{children}</div>
      </motion.main>

      <motion.footer
        className="bg-muted dark:bg-muted text-muted-foreground py-8 md:py-12 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MarketHub. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Built with ❤️ using React, Tailwind CSS, and Shadcn UI.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  )
}

export default Layout