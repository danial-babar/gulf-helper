"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// EMI Calculator Component
function EMICalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [interestRate, setInterestRate] = useState(5.5)
  const [tenure, setTenure] = useState(20)
  const [tenureType, setTenureType] = useState("years")

  const calculateEMI = () => {
    const principalAmount = principal
    const annualRate = interestRate / 100
    const monthlyRate = annualRate / 12
    const totalMonths = tenureType === "years" ? tenure * 12 : tenure

    if (monthlyRate === 0) {
      return {
        emi: principalAmount / totalMonths,
        totalInterest: 0,
        totalPayment: principalAmount,
      }
    }

    const emi = (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1)
    
    const totalPayment = emi * totalMonths
    const totalInterest = totalPayment - principalAmount

    return {
      emi,
      totalInterest,
      totalPayment,
      totalMonths,
    }
  }

  const results = calculateEMI()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ToolFormCard
        title="Loan Details"
        description="Enter your loan information"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="principal">Loan Amount (SAR) / مبلغ القرض</Label>
            <Input 
              id="principal" 
              type="number" 
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
              placeholder="500000"
            />
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
            <Label htmlFor="tenure">Loan Term / مدة القرض</Label>
            <div className="flex gap-2">
              <Input 
                id="tenure" 
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
          <Button className="w-full" size="lg">Calculate EMI / احسب القسط</Button>
        </div>
      </ToolFormCard>

      <ToolResultCard
        title="EMI Calculation"
        description="Your loan payment breakdown"
      >
        <div className="space-y-6">
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
          <div className="p-6 bg-background rounded-xl border border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Total Payment / إجمالي المبلغ</span>
              <span className="text-2xl font-bold text-foreground">
                {results.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
              </span>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground font-medium">Loan Amount / مبلغ القرض</span>
              <span className="text-3xl font-bold text-primary">
                {principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
              </span>
            </div>
          </div>
        </div>
      </ToolResultCard>
    </div>
  )
}

// Loan Eligibility Calculator Component
function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(15000)
  const [existingObligations, setExistingObligations] = useState(2000)
  const [bankLimit, setBankLimit] = useState(33)

  const calculateEligibility = () => {
    // Typical calculation: (Monthly Income - Existing Obligations) * Bank Limit % * 12 months
    const availableIncome = monthlyIncome - existingObligations
    const monthlyEMICapacity = availableIncome * (bankLimit / 100)
    const yearlyEMICapacity = monthlyEMICapacity * 12
    
    // Estimate max loan based on typical interest rates (assuming 5.5% for 20 years)
    // This is a simplified calculation
    const estimatedMaxLoan = monthlyEMICapacity * 12 * 20 // Rough estimate

    return {
      availableIncome,
      monthlyEMICapacity,
      yearlyEMICapacity,
      estimatedMaxLoan,
    }
  }

  const results = calculateEligibility()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ToolFormCard
        title="Income Details"
        description="Enter your financial information"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="monthly-income">Monthly Income (SAR) / الدخل الشهري</Label>
            <Input 
              id="monthly-income" 
              type="number" 
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
              placeholder="15000"
            />
          </div>
          <div>
            <Label htmlFor="existing-obligations">Existing Monthly Obligations (SAR) / الالتزامات الشهرية الحالية</Label>
            <Input 
              id="existing-obligations" 
              type="number" 
              value={existingObligations}
              onChange={(e) => setExistingObligations(Number(e.target.value) || 0)}
              placeholder="2000"
            />
          </div>
          <div>
            <Label htmlFor="bank-limit">Bank EMI Limit (%) / حد البنك للقسط (%)</Label>
            <Input 
              id="bank-limit" 
              type="number" 
              value={bankLimit}
              onChange={(e) => setBankLimit(Number(e.target.value) || 0)}
              placeholder="33"
              step="1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Typically 30-40% of available income
            </p>
          </div>
          <Button className="w-full" size="lg">Check Eligibility / تحقق من الأهلية</Button>
        </div>
      </ToolFormCard>

      <ToolResultCard
        title="Loan Eligibility"
        description="Your maximum eligible loan amount"
      >
        <div className="space-y-6">
          <div className="p-6 bg-background rounded-xl border border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Available Income / الدخل المتاح</span>
              <span className="text-2xl font-bold text-foreground">
                {results.availableIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
              </span>
            </div>
          </div>
          <div className="p-6 bg-background rounded-xl border border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Monthly EMI Capacity / قدرة القسط الشهري</span>
              <span className="text-2xl font-bold text-foreground">
                {results.monthlyEMICapacity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
              </span>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground font-medium">Estimated Max Loan / الحد الأقصى المقدر للقرض</span>
              <span className="text-3xl font-bold text-primary">
                {results.estimatedMaxLoan.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This is an estimate. Actual loan amount depends on bank policies and interest rates.
            </p>
          </div>
        </div>
      </ToolResultCard>
    </div>
  )
}

export default function LoanCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Loan Calculator</h1>
            <p className="text-muted-foreground mt-1">Calculate loan payments and eligibility</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="emi" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="emi">EMI Calculator / حاسبة القسط</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility Check / فحص الأهلية</TabsTrigger>
        </TabsList>
        <TabsContent value="emi">
          <EMICalculator />
        </TabsContent>
        <TabsContent value="eligibility">
          <LoanEligibilityCalculator />
        </TabsContent>
      </Tabs>

      {/* SEO Text */}
      <SEOTextBlock title="Understanding Loan Calculations">
        <p>
          A loan calculator helps you understand the total cost of borrowing money, including principal and interest payments over the loan term.
        </p>
        <p>
          The monthly payment amount depends on the loan amount, interest rate, and loan term. Understanding these factors helps you make informed decisions about borrowing.
        </p>
        <p>
          Our loan calculator provides a clear breakdown of your payments, total interest, and the overall cost of your loan, helping you plan your finances effectively.
        </p>
      </SEOTextBlock>
    </div>
  )
}
