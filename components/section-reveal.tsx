'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ComponentPropsWithoutRef } from 'react'

type SectionRevealProps = ComponentPropsWithoutRef<typeof motion.section>

export default function SectionReveal({ children, className, ...props }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={prefersReducedMotion ? undefined : { duration: 0.45, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}
