import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  category?: string
}

export function ToolCard({ title, description, href, icon: Icon, category }: ToolCardProps) {
  return (
    <Link href={href}>
      <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            {category && (
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                {category}
              </span>
            )}
          </div>
          <CardTitle className="mt-4 text-xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

