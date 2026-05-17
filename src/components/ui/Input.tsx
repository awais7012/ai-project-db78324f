import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <motion.input
        type={type}
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200',
          'dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          backgroundColor: isFocused ? 'rgba(220, 235, 255, 0.2)' : undefined,
        }}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';