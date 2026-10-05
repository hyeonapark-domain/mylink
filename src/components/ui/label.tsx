"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-[14px] font-semibold text-toss-grey-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none",
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName ?? "Label"

export { Label }
