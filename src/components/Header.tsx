import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, LogOut, User, ShoppingCart } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';

interface HeaderProps {}

const navigationLinks = [
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
];

const mockAuth = {
  isAuthenticated: false,
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    imageUrl: 'https://avatars.githubusercontent.com/u/8440561?v=4',
  },
};

const cartItemCount = 3;

export default function Header(): JSX.Element {
  return (
    <motion.header
      className="fixed top-0 w-full bg-white shadow-md z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="py-4 px-6 flex items-center justify-between max-w-7xl mx-auto">
        <motion.a
          href="/"
          className="text-2xl font-semibold text-gray-800 dark:text-white"
          whileHover={{ scale: 1.05 }}
        >
          MarketHub
        </motion.a>

        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <motion.button
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            {cartItemCount > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-blue-500 text-white text-xs rounded-full px-2 py-0">
                {cartItemCount}
              </span>
            )}
          </motion.button>

          {mockAuth.isAuthenticated ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Avatar.Root className="h-8 w-8 rounded-full overflow-hidden">
                    <Avatar.Image src={mockAuth.user.imageUrl} alt={mockAuth.user.name} />
                    <Avatar.Fallback delayMs={600}>
                      {mockAuth.user.name.substring(0, 2).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar.Root>
                </motion.div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                <DropdownMenu.Item className="DropdownMenuItem">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item className="DropdownMenuItem">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost">Login</Button>
              <Button>Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}