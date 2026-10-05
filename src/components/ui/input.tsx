import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-toss-grey-200 bg-white px-3.5 py-2 text-[15px] text-toss-grey-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-toss-grey-400 focus-visible:outline-none focus-visible:border-toss-blue-500 focus-visible:ring-2 focus-visible:ring-toss-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-toss-grey-100",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
