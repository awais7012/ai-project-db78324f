import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
        secondary: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
        destructive: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
        outline: 'text-foreground border border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div className={cn(badgeVariants({ variant }), className)} {...props} ref={ref} />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }