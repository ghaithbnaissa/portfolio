import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-2xs uppercase tracking-[0.12em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-mx-primary/60 bg-mx-primary/12 text-mx-primary',
        outline: 'border-mx-line bg-mx-primary/[0.05] text-mx-textDim hover:border-mx-primary/50 hover:text-mx-primary',
        muted: 'border-mx-line/70 bg-transparent text-mx-textFaint'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
