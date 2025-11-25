import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  toolCount?: number
}

export function CategoryCard({ title, description, href, icon: Icon, toolCount }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent/50">
        <CardHeader>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base mt-2">{description}</CardDescription>
        </CardHeader>
        {toolCount !== undefined && (
          <CardContent>
            <p className="text-sm text-muted-foreground">{toolCount} tools available</p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}

