import Link from "next/link"
import { BookOpen, Calendar, Clock, Search } from "lucide-react"
import { SectionHeader } from "@/components/SectionHeader"
import { ArticleCard } from "@/components/ArticleCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const articles = [
  {
    title: "Understanding Zakat in Saudi Arabia",
    description: "A comprehensive guide to calculating and paying Zakat according to Islamic principles and Saudi regulations.",
    href: "/articles/understanding-zakat-saudi-arabia",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    category: "Finance",
  },
  {
    title: "VAT Guide for GCC Businesses",
    description: "Everything you need to know about VAT regulations, compliance, and best practices in GCC countries.",
    href: "/articles/vat-guide-gcc-businesses",
    date: "Jan 10, 2024",
    readTime: "8 min read",
    category: "Business",
  },
  {
    title: "Salary Calculation in Saudi Arabia",
    description: "Learn how to calculate your net salary, understand all deductions, and maximize your take-home pay.",
    href: "/articles/salary-calculation-saudi-arabia",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    category: "Salary",
  },
  {
    title: "Property Investment in GCC",
    description: "A complete guide to property investment, rental yields, and real estate opportunities in GCC countries.",
    href: "/articles/property-investment-gcc",
    date: "Dec 28, 2023",
    readTime: "10 min read",
    category: "Property",
  },
  {
    title: "Loan Options in Saudi Arabia",
    description: "Understanding different types of loans, interest rates, and how to choose the right loan for your needs.",
    href: "/articles/loan-options-saudi-arabia",
    date: "Dec 20, 2023",
    readTime: "7 min read",
    category: "Finance",
  },
  {
    title: "Business Registration in Saudi Arabia",
    description: "Step-by-step guide to registering your business, obtaining licenses, and complying with regulations.",
    href: "/articles/business-registration-saudi-arabia",
    date: "Dec 15, 2023",
    readTime: "12 min read",
    category: "Business",
  },
  {
    title: "Mortgage Guide for First-Time Buyers",
    description: "Everything first-time homebuyers need to know about mortgages, down payments, and the buying process.",
    href: "/articles/mortgage-guide-first-time-buyers",
    date: "Dec 10, 2023",
    readTime: "9 min read",
    category: "Property",
  },
  {
    title: "Tax Planning for Expatriates",
    description: "Tax planning strategies and considerations for expatriates living and working in Saudi Arabia.",
    href: "/articles/tax-planning-expatriates",
    date: "Dec 5, 2023",
    readTime: "6 min read",
    category: "Finance",
  },
  {
    title: "Understanding Rental Laws in Saudi Arabia",
    description: "A guide to tenant and landlord rights, rental agreements, and legal requirements for property leasing.",
    href: "/articles/rental-laws-saudi-arabia",
    date: "Nov 28, 2023",
    readTime: "8 min read",
    category: "Property",
  },
]

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Articles & Guides</h1>
            <p className="text-muted-foreground mt-1">Expert insights and guides for Saudi Arabia & GCC</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="property">Property</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.href} {...article} />
        ))}
      </div>
    </div>
  )
}

