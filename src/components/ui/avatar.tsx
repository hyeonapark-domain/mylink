import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = "Avatar", fallback = "P", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-24 w-24 shrink-0 overflow-hidden rounded-[14px] bg-toss-grey-100 border border-toss-grey-200 shadow-xs ring-4 ring-white",
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="96px"
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-bold text-toss-grey-700 bg-toss-grey-200">
            {fallback}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
