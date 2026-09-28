import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[16px] text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-toss-blue-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-toss-blue-500 text-white hover:bg-toss-blue-600 shadow-2xs",
        destructive:
          "bg-toss-red-500 text-white hover:bg-red-600 shadow-2xs",
        outline:
          "border border-toss-grey-200 bg-white hover:bg-toss-grey-100 text-toss-grey-900 shadow-2xs hover:border-toss-blue-500",
        secondary:
          "bg-toss-grey-100 text-toss-grey-900 hover:bg-toss-grey-200",
        ghost:
          "hover:bg-toss-grey-100 text-toss-grey-900",
        link:
          "text-toss-blue-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[56px] px-5 py-2",
        sm: "h-9 px-3 rounded-lg text-xs",
        lg: "h-14 px-8 rounded-2xl text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
