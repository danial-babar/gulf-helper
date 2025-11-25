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
      <SEOTextBlock title="Understanding Mortgage Calculations">
        <p>
          A mortgage calculator helps you understand the financial commitment of purchasing a property, including monthly payments, total interest, and the overall cost of the loan.
        </p>
        <p>
          The monthly mortgage payment depends on the loan amount (property price minus down payment), interest rate, and loan term. A larger down payment reduces your monthly payment and total interest.
        </p>
        <p>
          Our mortgage calculator provides a clear breakdown of your payments, helping you make informed decisions about property purchases and plan your finances accordingly.
        </p>
      </SEOTextBlock>
    </div>
  )
}
