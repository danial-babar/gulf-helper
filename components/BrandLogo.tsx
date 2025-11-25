import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  variant?: "full" | "icon"
  size?: "sm" | "md" | "lg"
  className?: string
  href?: string
}

const sizeMap = {
  sm: { width: 120, height: 29 },
  md: { width: 160, height: 38 },
  lg: { width: 200, height: 48 },
}

const iconSizeMap = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 48, height: 48 },
}

export function BrandLogo({ variant = "full", size = "md", className, href = "/" }: BrandLogoProps) {
  const dimensions = variant === "full" ? sizeMap[size] : iconSizeMap[size]
  const logoSrc = variant === "full" ? "/logo.svg" : "/logo-icon.svg"
  
  const logoElement = (
    <Image
      src={logoSrc}
      alt="GulfHelper - Smart Tools for Saudi & GCC"
      width={dimensions.width}
      height={dimensions.height}
      className={cn("object-contain", className)}
      priority
    />
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}

