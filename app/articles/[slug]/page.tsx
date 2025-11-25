import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// This would typically come from a CMS or database
const articles: Record<string, {
  title: string
  date: string
  readTime: string
  category: string
  content: string
}> = {
  "understanding-zakat-saudi-arabia": {
    title: "Understanding Zakat in Saudi Arabia",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    category: "Finance",
    content: `
      <p>Zakat is one of the Five Pillars of Islam and is an obligatory form of charity for Muslims. In Saudi Arabia, understanding how to calculate and pay Zakat correctly is essential for religious compliance.</p>
      
      <h2>What is Zakat?</h2>
      <p>Zakat is a mandatory charitable contribution that requires Muslims to donate 2.5% of their qualifying wealth (Nisab) to those in need. It is calculated annually based on your total assets.</p>
      
      <h2>Nisab Threshold</h2>
      <p>The Nisab is the minimum amount of wealth a Muslim must possess before being obligated to pay Zakat. It is equivalent to either:</p>
      <ul>
        <li>85 grams of gold, or</li>
        <li>595 grams of silver</li>
      </ul>
      <p>The value is calculated based on current market prices in Saudi Arabia.</p>
      
      <h2>What Assets are Included?</h2>
      <p>When calculating Zakat, you should include:</p>
      <ul>
        <li>Cash and bank balances</li>
        <li>Gold and silver (jewelry, coins, bars)</li>
        <li>Stocks and investments</li>
        <li>Business assets and inventory</li>
        <li>Accounts receivable</li>
      </ul>
      
      <h2>What Can Be Deducted?</h2>
      <p>You can deduct the following from your total assets:</p>
      <ul>
        <li>Outstanding debts and loans</li>
        <li>Immediate expenses (rent, utilities for the month)</li>
        <li>Assets used for personal use (primary residence, personal vehicle)</li>
      </ul>
      
      <h2>How to Calculate Zakat</h2>
      <p>Once you've determined your net wealth (total assets minus deductions), if it exceeds the Nisab threshold, you must pay 2.5% of that amount as Zakat.</p>
      
      <h2>When to Pay Zakat</h2>
      <p>Zakat should be paid once per lunar year. Many Muslims choose to pay during Ramadan, but it can be paid at any time during the year once your wealth has been held for a full lunar year.</p>
      
      <h2>Conclusion</h2>
      <p>Understanding and correctly calculating Zakat is an important religious obligation. Use our Zakat calculator to ensure accurate calculations based on current gold and silver prices in Saudi Arabia.</p>
    `,
  },
  "vat-guide-gcc-businesses": {
    title: "VAT Guide for GCC Businesses",
    date: "Jan 10, 2024",
    readTime: "8 min read",
    category: "Business",
    content: `
      <p>Value Added Tax (VAT) was introduced across GCC countries to diversify revenue sources. Understanding VAT regulations is crucial for businesses operating in the region.</p>
      
      <h2>VAT Rates in GCC</h2>
      <p>VAT rates vary across GCC countries:</p>
      <ul>
        <li><strong>Saudi Arabia:</strong> 15% standard rate</li>
        <li><strong>UAE:</strong> 5% standard rate</li>
        <li><strong>Bahrain:</strong> 5% standard rate</li>
        <li><strong>Oman:</strong> 5% standard rate</li>
        <li><strong>Kuwait:</strong> No VAT (as of 2024)</li>
        <li><strong>Qatar:</strong> No VAT (as of 2024)</li>
      </ul>
      
      <h2>VAT Registration</h2>
      <p>Businesses must register for VAT if their annual taxable supplies exceed the registration threshold, which varies by country. In Saudi Arabia, the threshold is SAR 375,000.</p>
      
      <h2>VAT Compliance</h2>
      <p>Registered businesses must:</p>
      <ul>
        <li>Issue VAT invoices for all taxable supplies</li>
        <li>File regular VAT returns</li>
        <li>Maintain proper accounting records</li>
        <li>Charge and collect VAT on taxable supplies</li>
        <li>Claim input VAT on business expenses</li>
      </ul>
      
      <h2>Zero-Rated and Exempt Supplies</h2>
      <p>Some supplies are zero-rated (0% VAT) or exempt from VAT, including:</p>
      <ul>
        <li>Export of goods and services</li>
        <li>Certain medical supplies</li>
        <li>Educational services</li>
        <li>Financial services (in some cases)</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Proper VAT compliance is essential for businesses in GCC countries. Use our VAT calculator and invoice generator to ensure accurate calculations and compliant documentation.</p>
    `,
  },
  "salary-calculation-saudi-arabia": {
    title: "Salary Calculation in Saudi Arabia",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    category: "Salary",
    content: `
      <p>Understanding how your salary is calculated in Saudi Arabia helps you plan your finances and ensure you're receiving the correct compensation.</p>
      
      <h2>Salary Components</h2>
      <p>A typical salary package in Saudi Arabia includes:</p>
      <ul>
        <li><strong>Base Salary:</strong> The core salary amount</li>
        <li><strong>Housing Allowance:</strong> Additional payment for accommodation</li>
        <li><strong>Transport Allowance:</strong> Payment for transportation costs</li>
        <li><strong>Other Allowances:</strong> Various benefits like food, medical, etc.</li>
      </ul>
      
      <h2>Deductions</h2>
      <p>Common deductions from salary include:</p>
      <ul>
        <li>Social Insurance (GOSI) contributions</li>
        <li>Income tax (for non-Saudis in some cases)</li>
        <li>Loan repayments</li>
        <li>Other contractual deductions</li>
      </ul>
      
      <h2>Net Salary Calculation</h2>
      <p>Your net salary is calculated as:</p>
      <p><strong>Net Salary = Gross Salary + Allowances - Deductions</strong></p>
      
      <h2>Conclusion</h2>
      <p>Use our salary calculator to understand your take-home pay and plan your finances accordingly.</p>
    `,
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/articles">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
      </Link>

      <article>
        <div className="mb-6">
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
          style={{
            color: "var(--foreground)",
          }}
        />
      </article>
    </div>
  )
}

