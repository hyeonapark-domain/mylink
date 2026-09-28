import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-toss-blue-500",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-toss-blue-500 text-white",
        secondary:
          "border-transparent bg-toss-grey-100 text-toss-grey-900",
        destructive:
          "border-transparent bg-toss-red-500 text-white",
        outline: "text-toss-grey-900 border-toss-grey-200",
        soft: "border-transparent bg-toss-blue-50 text-toss-blue-500 font-medium",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
