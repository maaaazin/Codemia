import * as React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const Dialog = ({ open, onOpenChange, children, maxWidth = 'max-w-2xl' }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog Content */}
      <div 
        className={cn("relative z-50 w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg m-4", maxWidth)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

const DialogHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6 pb-4 relative", className)} {...props}>
    {children}
  </div>
)

const DialogTitle = ({ className, children, ...props }) => (
  <h2 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h2>
)

const DialogDescription = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
)

const DialogContent = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
)

const DialogFooter = ({ className, children, ...props }) => (
  <div className={cn("flex items-center justify-end gap-2 p-6 pt-0", className)} {...props}>
    {children}
  </div>
)

const DialogClose = ({ onClick, className, ...props }) => (
  <button
    onClick={onClick}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
)

export {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
}

