'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const DropdownMenu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative inline-block text-left', className)}
    {...props}
  />
))
DropdownMenu.displayName = 'DropdownMenu'

const DropdownMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn('inline-flex items-center justify-center', className)}
    {...props}
  >
    {children}
  </button>
))
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

const DropdownMenuContent = React.forwardRef(({ 
  className, 
  sideOffset = 4, 
  align = 'center',
  children,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute z-50 min-w-[12rem] overflow-hidden rounded-lg border bg-white/95 backdrop-blur-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-gray-800/95 dark:border-gray-700',
      align === 'start' && 'left-0',
      align === 'center' && 'left-1/2 transform -translate-x-1/2',
      align === 'end' && 'right-0',
      className
    )}
    style={{ marginTop: sideOffset }}
    {...props}
  >
    {children}
  </div>
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef(({ 
  className, 
  inset, 
  children,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-700 dark:focus:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
}