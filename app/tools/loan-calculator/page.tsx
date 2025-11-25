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
      <SEOTextBlock title="Complete Guide to Loan Calculations in Saudi Arabia">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Understanding Loans in Saudi Arabia</h2>
            <p>
              Loans are a common financial tool in Saudi Arabia, used for various purposes including personal expenses, car purchases, home improvements, and business investments. Understanding how loans work, including EMI calculations and eligibility criteria, is essential for making informed borrowing decisions.
            </p>
            <p>
              Our comprehensive loan calculator helps you understand both your loan eligibility and the exact monthly payments (EMI) you'll need to make. Whether you're planning to take a personal loan, car loan, or any other type of financing, our tools provide accurate calculations based on Saudi banking standards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">What is EMI (Equated Monthly Installment)?</h2>
            <p>
              EMI is the fixed monthly payment you make to repay your loan. It consists of two components:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Principal Amount:</strong> The portion that goes toward repaying the loan amount</li>
              <li><strong>Interest Amount:</strong> The cost of borrowing money</li>
            </ul>
            <p>
              The EMI amount remains constant throughout the loan tenure, but the proportion of principal and interest changes over time. In the early months, you pay more interest; in later months, you pay more principal.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How EMI is Calculated</h2>
            <p>
              The EMI calculation formula is:
            </p>
            <div className="bg-muted p-4 rounded-lg my-4">
              <p className="font-mono text-sm">
                EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
              </p>
              <p className="text-sm mt-2">
                Where:<br />
                P = Principal loan amount<br />
                R = Monthly interest rate (Annual rate ÷ 12)<br />
                N = Loan tenure in months
              </p>
            </div>
            <p>
              <strong>Example:</strong> For a loan of 500,000 SAR at 5.5% annual interest for 20 years:
            </p>
            <ul className="list-disc pl-6 space-y-1 my-2">
              <li>Principal (P): 500,000 SAR</li>
              <li>Monthly Interest Rate (R): 5.5% ÷ 12 = 0.4583%</li>
              <li>Tenure (N): 20 years × 12 = 240 months</li>
              <li>EMI: Approximately 3,445 SAR per month</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Loan Eligibility in Saudi Arabia</h2>
            <p>
              Banks in Saudi Arabia assess loan eligibility based on several factors:
            </p>
            
            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">1. Income Requirements</h3>
              <p>
                Your monthly income is a primary factor. Banks typically allow EMI payments up to 30-40% of your available monthly income (income minus existing obligations).
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">2. Existing Obligations</h3>
              <p>
                Banks consider your existing financial commitments:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-2">
                <li>Existing loan EMIs</li>
                <li>Credit card payments</li>
                <li>Other monthly financial commitments</li>
              </ul>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">3. Credit History</h3>
              <p>
                Your credit score and payment history significantly impact loan eligibility. A good credit history increases your chances of approval and may result in better interest rates.
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">4. Employment Status</h3>
              <p>
                Stable employment is crucial. Banks prefer applicants with:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-2">
                <li>Permanent employment contracts</li>
                <li>Minimum 6-12 months of employment history</li>
                <li>Regular salary payments</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Types of Loans Available in Saudi Arabia</h2>
            <p>
              Various loan products are available in Saudi Arabia:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Personal Loans:</strong> Unsecured loans for personal use, typically up to 500,000 SAR</li>
              <li><strong>Car Loans:</strong> Secured loans for vehicle purchases, usually up to 80-90% of car value</li>
              <li><strong>Home Loans:</strong> Long-term financing for property purchases</li>
              <li><strong>Business Loans:</strong> For business expansion and working capital</li>
              <li><strong>Credit Cards:</strong> Revolving credit with minimum payment requirements</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use Our Loan Calculator</h2>
            <p>
              Our loan calculator offers two powerful tools:
            </p>
            
            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">EMI Calculator</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Enter the loan amount you want to borrow</li>
                <li>Input the annual interest rate offered by the bank</li>
                <li>Select the loan tenure (in years or months)</li>
                <li>Instantly see your monthly EMI, total interest, and total payment</li>
              </ol>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">Loan Eligibility Calculator</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Enter your monthly income</li>
                <li>Input your existing monthly obligations (other loans, credit cards, etc.)</li>
                <li>Set the bank's EMI limit percentage (typically 30-40%)</li>
                <li>Get an estimate of your maximum eligible loan amount</li>
              </ol>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Tips for Getting the Best Loan Terms</h2>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Maintain a good credit score:</strong> Pay all bills on time and keep credit utilization low</li>
              <li><strong>Compare offers:</strong> Different banks offer different interest rates and terms</li>
              <li><strong>Negotiate:</strong> If you have a good credit history, you may be able to negotiate better rates</li>
              <li><strong>Consider shorter tenures:</strong> While monthly payments are higher, total interest is lower</li>
              <li><strong>Read the fine print:</strong> Understand all fees, charges, and terms before signing</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">What is a typical interest rate for personal loans in Saudi Arabia?</h3>
                <p>
                  Personal loan interest rates in Saudi Arabia typically range from 4% to 8% per annum, depending on your credit profile, loan amount, and the bank. Rates can vary significantly, so it's important to shop around.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Can I prepay my loan early?</h3>
                <p>
                  Most banks in Saudi Arabia allow early loan repayment, but may charge a prepayment penalty (usually 1-2% of the outstanding amount). Check your loan agreement for specific terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">What happens if I miss an EMI payment?</h3>
                <p>
                  Missing EMI payments can result in late fees, negative impact on your credit score, and potentially loan default. Contact your bank immediately if you're facing payment difficulties to discuss restructuring options.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">How does loan tenure affect my EMI?</h3>
                <p>
                  Longer loan tenures result in lower monthly EMIs but higher total interest paid. Shorter tenures mean higher EMIs but less total interest. Choose based on your monthly cash flow capacity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Can expatriates get loans in Saudi Arabia?</h3>
                <p>
                  Yes, many banks offer loans to expatriates, though requirements may be stricter. Typically, you need a valid residency permit (Iqama), stable employment, and a minimum salary threshold (often 5,000-8,000 SAR per month).
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p>
              Understanding loan calculations and eligibility is crucial for making informed borrowing decisions in Saudi Arabia. Our free loan calculator helps you determine both your loan eligibility and exact EMI payments, ensuring you can comfortably manage your loan obligations.
            </p>
            <p>
              Use our calculator to compare different loan options, understand the total cost of borrowing, and plan your finances effectively. Whether you're considering a personal loan, car loan, or any other financing, our tools provide the clarity you need to make the right decision.
            </p>
          </div>
        </div>
      </SEOTextBlock>
    </div>
  )
}
