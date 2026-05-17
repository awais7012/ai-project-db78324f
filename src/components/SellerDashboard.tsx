import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function SellerDashboard(): JSX.Element {
  return (
    <motion.div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-4 p-6',
        'bg-background'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="col-span-1 md:col-span-2">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">
            Product Form
          </h2>
          <p className="text-sm text-muted-foreground">
            Add new products to your store.
          </p>
          {/* TODO: Replace with actual ProductForm component */}
          <div className="mt-4">
            <Badge variant="secondary">Product Form Placeholder</Badge>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">
            Order List
          </h2>
          <p className="text-sm text-muted-foreground">
            View and manage your recent orders.
          </p>
          {/* TODO: Replace with actual OrderList component */}
          <div className="mt-4">
            <Badge variant="secondary">Order List Placeholder</Badge>
          </div>
        </div>
      </Card>

      <Card className="col-span-1 md:col-span-3">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">
            Sales Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your sales performance and identify trends.
          </p>
          {/* TODO: Replace with actual SalesAnalytics component */}
          <div className="mt-4">
            <Badge variant="secondary">Sales Analytics Placeholder</Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}