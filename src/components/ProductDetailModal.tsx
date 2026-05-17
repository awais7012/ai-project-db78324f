import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export default function ProductDetailModal({ product, isOpen, onClose }: { product: Product; isOpen: boolean; onClose: () => void }): JSX.Element {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 data-[state=open]:animate-overlayShow z-50" />
        <Dialog.Content className={cn(
          "fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-lg data-[state=open]:animate-contentShow focus:outline-none text-gray-800",
          'dark:bg-gray-900 dark:text-gray-50'
        )}>
          <Dialog.Title className="text-lg font-semibold mb-4">{product.name}</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4 dark:text-gray-400">
            {product.description}
          </Dialog.Description>
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md mb-4" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            <Button>Add to Cart</Button>
          </div>
          <Dialog.Close asChild>
            <Button variant="secondary">Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}