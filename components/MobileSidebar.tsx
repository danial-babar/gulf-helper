"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Calculator,
  DollarSign,
  Home,
  Building2,
  Scale,
  FileText,
  BookOpen,
  TrendingUp,
  Percent,
  Wallet,
  House,
  FileCheck,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const menuItems = [
  {
    title: "Finance Tools",
    icon: DollarSign,
    items: [
      { name: "Zakat Calculator", href: "/tools/zakat-calculator", icon: Calculator },
      { name: "VAT Calculator", href: "/tools/vat-calculator", icon: Percent },
      { name: "Loan Calculator", href: "/tools/loan-calculator", icon: Wallet },
    ],
  },
  {
    title: "Salary Tools",
    icon: TrendingUp,
    items: [
      { name: "Salary Calculator", href: "/tools/salary-calculator", icon: Calculator },
    ],
  },
  {
    title: "Property Tools",
    icon: House,
    items: [
      { name: "Rental Yield Calculator", href: "/tools/rental-yield-calculator", icon: Calculator },
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: Building2 },
    ],
  },
  {
    title: "Business Tools",
    icon: Building2,
    items: [
      { name: "VAT Invoice Generator", href: "/tools/vat-invoice-generator", icon: FileCheck },
    ],
  },
  {
    title: "Legal Tools",
    icon: Scale,
    items: [],
  },
  {
    title: "Templates",
    icon: FileText,
    href: "/templates",
  },
  {
    title: "Articles",
    icon: BookOpen,
    href: "/articles",
  },
]

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Image
            src="/logo.svg"
            alt="GulfHelper"
            width={140}
            height={33}
            className="h-8 w-auto"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tools..."
            className="pl-10 pr-4"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
            pathname === "/"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Home className="h-5 w-5" />
          Home
        </Link>

        <Separator className="my-2" />

        {menuItems.map((section) => (
          <div key={section.title} className="space-y-1">
            {section.href ? (
              <Link
                href={section.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  pathname === section.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <section.icon className="h-5 w-5" />
                {section.title}
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </div>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 ml-4 rounded-lg text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

