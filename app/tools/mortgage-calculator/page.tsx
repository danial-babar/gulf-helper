"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MortgageCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(2000000)
  const [downPayment, setDownPayment] = useState(400000)
  const [interestRate, setInterestRate] = useState(5.5)
  const [tenure, setTenure] = useState(20)
  const [tenureType, setTenureType] = useState("years")

  const calculateMortgage = () => {
    const loanAmount = propertyPrice - downPayment
    const annualRate = interestRate / 100
    const monthlyRate = annualRate / 12
    const totalMonths = tenureType === "years" ? tenure * 12 : tenure

    if (monthlyRate === 0) {
      return {
        loanAmount,
        emi: loanAmount / totalMonths,
        totalInterest: 0,
        totalPayment: loanAmount,
        downPaymentPercent: (downPayment / propertyPrice) * 100,
      }
    }

    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1)
    
    const totalPayment = emi * totalMonths
    const totalInterest = totalPayment - loanAmount
    const downPaymentPercent = (downPayment / propertyPrice) * 100

    return {
      loanAmount,
      emi,
      totalInterest,
      totalPayment,
      downPaymentPercent,
      totalMonths,
    }
  }

  const results = calculateMortgage()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Mortgage Calculator</h1>
            <p className="text-muted-foreground mt-1">Calculate mortgage payments and amortization</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <ToolFormCard
          title="Mortgage Details"
          description="Enter your mortgage information"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="property-price">Property Price (SAR) / سعر العقار</Label>
              <Input 
                id="property-price" 
                type="number" 
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
                placeholder="2000000"
              />
            </div>
            <div>
              <Label htmlFor="down-payment">Down Payment (SAR) / الدفعة الأولى</Label>
              <Input 
                id="down-payment" 
                type="number" 
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                placeholder="400000"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Down Payment: {results.downPaymentPercent.toFixed(1)}% of property price
              </p>
            </div>
            <div>
              <Label htmlFor="interest-rate">Annual Interest Rate (%) / معدل الفائدة السنوي</Label>
              <Input 
                id="interest-rate" 
                type="number" 
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                placeholder="5.5"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="loan-term">Loan Term / مدة القرض</Label>
              <div className="flex gap-2">
                <Input 
                  id="loan-term" 
                  type="number" 
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value) || 0)}
                  placeholder="20"
                />
                <Select value={tenureType} onValueChange={setTenureType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years / سنوات</SelectItem>
                    <SelectItem value="months">Months / أشهر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full" size="lg">Calculate Mortgage / احسب الرهن</Button>
          </div>
        </ToolFormCard>

        {/* Results Section */}
        <ToolResultCard
          title="Mortgage Calculation"
          description="Your mortgage payment breakdown"
        >
          <div className="space-y-6">
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Loan Amount / مبلغ القرض</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Down Payment / الدفعة الأولى</span>
                <span className="text-2xl font-bold text-foreground">
                  {downPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Monthly EMI / القسط الشهري</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.emi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Total Interest / إجمالي الفائدة</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">Total Payment / إجمالي المبلغ</span>
                <span className="text-3xl font-bold text-primary">
                  {results.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-xl">
              <div className="text-sm text-muted-foreground mb-2">Payment Summary / ملخص الدفعات</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Payments</span>
                  <span className="font-medium">{results.totalMonths} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal</span>
                  <span className="font-medium">{results.loanAmount.toLocaleString('en-US')} SAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest</span>
                  <span className="font-medium">{results.totalInterest.toLocaleString('en-US')} SAR</span>
                </div>
              </div>
            </div>
          </div>
        </ToolResultCard>
      </div>

      {/* SEO Text */}
      <SEOTextBlock title="Complete Guide to Mortgage Calculation in Saudi Arabia">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Understanding Mortgages in Saudi Arabia</h2>
            <p>
              Mortgages (home loans) have become increasingly popular in Saudi Arabia, especially with government initiatives like the Sakani program making homeownership more accessible. Understanding mortgage calculations is essential for anyone considering buying property in cities like Riyadh, Jeddah, or Dammam.
            </p>
            <p>
              A mortgage calculator helps you understand the complete financial picture of property ownership, including monthly payments, total interest costs, and how different down payments and loan terms affect your finances.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How Mortgage Payments Work</h2>
            <p>
              Your monthly mortgage payment (EMI) consists of:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Principal:</strong> The portion that reduces your loan balance</li>
              <li><strong>Interest:</strong> The cost of borrowing money</li>
            </ul>
            <p>
              In the early years of your mortgage, most of your payment goes toward interest. As you progress, more goes toward principal. This is called amortization.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Key Factors Affecting Your Mortgage</h2>
            
            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">1. Down Payment</h3>
              <p>
                The down payment is your initial contribution toward the property purchase. Typical down payments are 20-30% of property value, though some programs like Sakani may offer lower down payments (10-15%) for eligible first-time buyers.
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">2. Interest Rate</h3>
              <p>
                Mortgage interest rates in Saudi Arabia typically range from 4% to 7% per annum, depending on your credit score, loan-to-value ratio, and bank policies.
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">3. Loan Term</h3>
              <p>
                Common mortgage terms in Saudi Arabia are 15, 20, 25, or 30 years. Longer terms mean lower monthly payments but more total interest paid.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use Our Mortgage Calculator</h2>
            <p>
              Our mortgage calculator helps you plan your property purchase:
            </p>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Enter the property price you're considering</li>
              <li>Input your planned down payment amount</li>
              <li>Set the interest rate (check with banks for current rates)</li>
              <li>Choose your preferred loan term (15, 20, 25, or 30 years)</li>
              <li>Instantly see your monthly EMI, total interest, and total payment</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Example Mortgage Calculation</h2>
            <p>
              Let's calculate a mortgage for a property in Riyadh:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Property Price: 2,000,000 SAR</li>
              <li>Down Payment: 400,000 SAR (20%)</li>
              <li>Loan Amount: 1,600,000 SAR</li>
              <li>Interest Rate: 5.5% per annum</li>
              <li>Loan Term: 20 years</li>
            </ul>
            <p>
              <strong>Calculation:</strong><br />
              Monthly EMI: Approximately 11,020 SAR<br />
              Total Interest: 1,044,800 SAR<br />
              Total Payment: 2,644,800 SAR
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">What is the minimum down payment for a mortgage in Saudi Arabia?</h3>
                <p>
                  Typically 20-30% of property value, though some programs like Sakani may offer lower down payments (10-15%) for eligible first-time buyers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Can expatriates get mortgages in Saudi Arabia?</h3>
                <p>
                  Yes, many banks offer mortgages to expatriates, though requirements may be stricter. You typically need a valid Iqama, stable employment, and minimum salary thresholds (often 8,000-10,000 SAR per month).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">What is the maximum mortgage term in Saudi Arabia?</h3>
                <p>
                  Most banks offer mortgage terms up to 25-30 years, though 20 years is most common. The maximum term often depends on your age and retirement plans.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p>
              Understanding mortgage calculations is essential for making informed property purchase decisions in Saudi Arabia. Our free mortgage calculator helps you understand the complete financial commitment, including monthly payments, total interest, and how different factors affect your mortgage.
            </p>
            <p>
              Use our calculator to compare different scenarios, understand the impact of down payments and loan terms, and plan your finances effectively.
            </p>
          </div>
        </div>
      </SEOTextBlock>
    </div>
  )
}
