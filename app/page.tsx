import Link from "next/link"
import { Search, Calculator, Percent, Wallet, TrendingUp, Shield, Zap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToolCard } from "@/components/ToolCard"
import { CategoryCard } from "@/components/CategoryCard"
import { ArticleCard } from "@/components/ArticleCard"
import { SectionHeader } from "@/components/SectionHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const popularTools = [
  {
    title: "Zakat Calculator",
    description: "Calculate your Zakat obligation accurately based on your assets and wealth.",
    href: "/tools/zakat-calculator",
    icon: Calculator,
    category: "Finance",
  },
  {
    title: "VAT Calculator",
    description: "Calculate VAT amounts for goods and services in Saudi Arabia and GCC.",
    href: "/tools/vat-calculator",
    icon: Percent,
    category: "Finance",
  },
  {
    title: "Salary Calculator",
    description: "Calculate your net salary, deductions, and take-home pay in Saudi Arabia.",
    href: "/tools/salary-calculator",
    icon: TrendingUp,
    category: "Salary",
  },
  {
    title: "Loan Calculator",
    description: "Calculate loan payments, interest, and repayment schedules.",
    href: "/tools/loan-calculator",
    icon: Wallet,
    category: "Finance",
  },
  {
    title: "Rental Yield Calculator",
    description: "Calculate rental yield and return on investment for properties.",
    href: "/tools/rental-yield-calculator",
    icon: Calculator,
    category: "Property",
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate mortgage payments and amortization schedules.",
    href: "/tools/mortgage-calculator",
    icon: Calculator,
    category: "Property",
  },
]

const categories = [
  {
    title: "Finance Tools",
    description: "Zakat, VAT, loans, and financial calculations for GCC.",
    href: "/tools/zakat-calculator",
    icon: Wallet,
    toolCount: 3,
  },
  {
    title: "Salary Tools",
    description: "Calculate salaries, deductions, and take-home pay.",
    href: "/tools/salary-calculator",
    icon: TrendingUp,
    toolCount: 1,
  },
  {
    title: "Property Tools",
    description: "Rental yields, mortgages, and property investment calculators.",
    href: "/tools/rental-yield-calculator",
    icon: Calculator,
    toolCount: 2,
  },
  {
    title: "Business Tools",
    description: "VAT invoices, business calculations, and compliance tools.",
    href: "/tools/vat-invoice-generator",
    icon: Calculator,
    toolCount: 1,
  },
]

const features = [
  {
    title: "Accurate Calculations",
    description: "All our calculators are based on official GCC regulations and updated regularly.",
    icon: Shield,
  },
  {
    title: "Fast & Easy",
    description: "Get instant results with our user-friendly interface. No registration required.",
    icon: Zap,
  },
  {
    title: "Trusted by Thousands",
    description: "Used by individuals and businesses across Saudi Arabia and GCC countries.",
    icon: Award,
  },
]

const articles = [
  {
    title: "Understanding Zakat in Saudi Arabia",
    description: "A comprehensive guide to calculating and paying Zakat according to Islamic principles.",
    href: "/articles/understanding-zakat-saudi-arabia",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    category: "Finance",
  },
  {
    title: "VAT Guide for GCC Businesses",
    description: "Everything you need to know about VAT regulations and compliance in GCC countries.",
    href: "/articles/vat-guide-gcc-businesses",
    date: "Jan 10, 2024",
    readTime: "8 min read",
    category: "Business",
  },
  {
    title: "Salary Calculation in Saudi Arabia",
    description: "Learn how to calculate your net salary and understand all deductions.",
    href: "/articles/salary-calculation-saudi-arabia",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    category: "Salary",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Smart Tools for{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Saudi & GCC</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary via-accent to-primary opacity-30"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Calculate Zakat, VAT, Salary, Loans, and more. Trusted tools for individuals and businesses.
            </p>
            
            {/* Search Bar */}
            <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto mt-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for tools, calculators, or articles..."
                  className="pl-12 pr-4 h-14 text-base"
                />
              </div>
              <Button size="lg" className="h-14 px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            title="Popular Tools"
            description="Most used calculators and tools by our users"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            title="Browse by Category"
            description="Find the right tool for your needs"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.href} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Use GulfHelper */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            title="Why Use GulfHelper?"
            description="Trusted by thousands of users across Saudi Arabia and GCC"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Preview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            title="Latest Articles"
            description="Stay informed with our guides and articles"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.href} {...article} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/articles">
              <Button variant="outline" size="lg">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
