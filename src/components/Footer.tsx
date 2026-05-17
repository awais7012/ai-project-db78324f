import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Footer(): JSX.Element {
  return (
    <motion.footer
      className={cn(
        'bottom-0 w-full bg-gray-100 py-4 text-center text-gray-500 text-sm dark:bg-gray-800 dark:text-gray-400',
        'border-t border-gray-200 dark:border-gray-700'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="container mx-auto"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="mb-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          &copy; {new Date().getFullYear()} MarketHub. All rights reserved.
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.a
            href="#"
            className="hover:text-blue-500 dark:hover:text-blue-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Terms of Service
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-blue-500 dark:hover:text-blue-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-blue-500 dark:hover:text-blue-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.footer>
  )
}