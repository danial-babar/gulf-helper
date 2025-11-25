import { ReactNode } from "react"

interface SEOTextBlockProps {
  title?: string
  children: ReactNode
}

export function SEOTextBlock({ title, children }: SEOTextBlockProps) {
  return (
    <div className="mt-12 space-y-6 prose prose-lg max-w-none">
      {title && (
        <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      )}
      <div className="text-muted-foreground leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  )
}

