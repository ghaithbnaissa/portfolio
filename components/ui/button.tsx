import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-mono text-xs uppercase tracking-[0.14em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-mx-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-mx-deep',
  {
    variants: {
      variant: {
        default:
          'border border-mx-primary/60 bg-mx-primary/12 text-mx-primary hover:border-mx-primary hover:bg-mx-primary/22 hover:text-mx-bright hover:shadow-glow',
        solid: 'border border-mx-primary bg-mx-primary text-mx-deep hover:bg-mx-bright hover:shadow-glow',
        outline:
          'border border-mx-line-strong bg-mx-panel/70 text-mx-text hover:border-mx-primary/70 hover:bg-mx-primary/10 hover:text-mx-primary',
        ghost: 'border border-transparent text-mx-textDim hover:bg-mx-primary/10 hover:text-mx-primary',
        danger: 'border border-mx-danger/60 bg-mx-danger/12 text-mx-danger hover:bg-mx-danger/22'
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3 text-[11px]',
        lg: 'h-11 px-6',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
