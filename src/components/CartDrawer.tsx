import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const cartDrawerVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): JSX.Element {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockCartData: CartItem[] = [
        { id: '1', name: 'Awesome T-Shirt', price: 25.00, quantity: 2, image: 'https://placehold.co/64x64' },
        { id: '2', name: 'Cool Coffee Mug', price: 12.50, quantity: 1, image: 'https://placehold.co/64x64' },
      ];
      setCartItems(mockCartData);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch cart data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen, fetchCartData]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            'fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 dark:bg-gray-900 dark:text-gray-100',
          )}
          variants={cartDrawerVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className="p-4 flex items-center justify-between border-b border-border dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Your Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" aria-label="Close cart" />
            </Button>
          </div>

          {loading ? (
            <div className="p-4">Loading cart...</div>
          ) : error ? (
            <div className="p-4 text-red-500">Error: {error}</div>
          ) : (
            <ScrollArea className="h-[calc(100vh-150px)]">
              <div className="p-4 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <Card key={item.id} className="flex flex-row items-center space-x-4 p-2">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">Your cart is empty.</div>
                )}
              </div>
            </ScrollArea>
          )}

          <div className="p-4 border-t border-border dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800 dark:text-gray-100">Total:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-primary text-white hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark">
              Checkout
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}