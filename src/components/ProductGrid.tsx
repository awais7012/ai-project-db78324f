import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Card } from './ui/Card';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const skeletonProducts = Array.from({ length: 8 }, (_, i) => ({
  id: `skeleton-${i}`,
  name: 'Loading...',
  description: 'Loading...',
  price: 0,
  imageUrl: '/placeholder.jpg', // Replace with a placeholder image
}));

export default function ProductGrid(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?page=${page}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data]);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="bg-background p-6">
      {error && (
        <div className="text-red-500">Error: {error}</div>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {loading &&
          skeletonProducts.map((product) => (
            <motion.div key={product.id} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
              <Card className="bg-card shadow-md rounded-md overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-4">
                    <div className="h-4 bg-muted mb-2"></div>
                    <div className="h-3 bg-muted"></div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

        {!loading &&
          products.map((product) => (
            <motion.div key={product.id} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>

      {loading && <div className="text-center mt-4">Loading more products...</div>}
      {!hasMore && !loading && <div className="text-center mt-4 text-muted-foreground">No more products to load.</div>}
    </div>
  );
}