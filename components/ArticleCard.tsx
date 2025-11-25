import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

interface ArticleCardProps {
  title: string
  description: string
  href: string
  date?: string
  readTime?: string
  category?: string
}

export function ArticleCard({ title, description, href, date, readTime, category }: ArticleCardProps) {
  return (
    <Link href={href}>
      <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent/50">
        <CardHeader>
          {category && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-2">
              {category}
            </span>
          )}
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription className="text-base line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

