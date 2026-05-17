import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface Product {
  id: string
  name: string
  image: string
  price: number
  category: string
}

export default function ProductCard({ product }: { product: Product }): JSX.Element {
  return (
    <motion.div
      className={cn(
        'relative flex flex-col rounded-md shadow-md overflow-hidden bg-white text-gray-800',
        'hover:shadow-lg transition-shadow duration-200'
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="aspect-square object-cover w-full"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </motion.div>
  )
}