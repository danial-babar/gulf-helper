"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const COLORS = ['#0057B8', '#C9A94A', '#10B981', '#F59E0B']

export default function RentalYieldCalculatorPage() {
  const [propertyValue, setPropertyValue] = useState(1000000)
  const [monthlyRent, setMonthlyRent] = useState(5000)
  const [annualExpenses, setAnnualExpenses] = useState(12000)
  const [vacancyRate, setVacancyRate] = useState(5)

  const calculateYield = () => {
    const annualRent = monthlyRent * 12
    const adjustedAnnualRent = annualRent * (1 - vacancyRate / 100)
    const netAnnualIncome = adjustedAnnualRent - annualExpenses
    const grossYield = (annualRent / propertyValue) * 100
    const netYield = (netAnnualIncome / propertyValue) * 100
    const roi = (netAnnualIncome / propertyValue) * 100

    return {
      annualRent,
      adjustedAnnualRent,
      annualExpenses,
      netAnnualIncome,
      grossYield,
      netYield,
      roi,
    }
  }

  const results = calculateYield()

  const pieData = [
    { name: 'Net Income', value: results.netAnnualIncome },
    { name: 'Expenses', value: results.annualExpenses },
  ].filter(item => item.value > 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Rental Yield Calculator</h1>
            <p className="text-muted-foreground mt-1">Calculate rental yield and return on investment</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <ToolFormCard
          title="Property Details"
          description="Enter your property information"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="property-value">Property Value (SAR) / قيمة العقار</Label>
              <Input 
                id="property-value" 
                type="number" 
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value) || 0)}
                placeholder="1000000"
              />
            </div>
            <div>
              <Label htmlFor="monthly-rent">Monthly Rent (SAR) / الإيجار الشهري</Label>
              <Input 
                id="monthly-rent" 
                type="number" 
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)}
                placeholder="5000"
              />
            </div>
            <div>
              <Label htmlFor="annual-expenses">Annual Expenses (SAR) / المصروفات السنوية</Label>
              <Input 
                id="annual-expenses" 
                type="number" 
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(Number(e.target.value) || 0)}
                placeholder="12000"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Includes maintenance, insurance, property management, etc.
              </p>
            </div>
            <div>
              <Label htmlFor="vacancy-rate">Vacancy Rate (%) / معدل الشغور</Label>
              <Input 
                id="vacancy-rate" 
                type="number" 
                value={vacancyRate}
                onChange={(e) => setVacancyRate(Number(e.target.value) || 0)}
                placeholder="5"
                step="0.1"
              />
            </div>
            <Button className="w-full" size="lg">Calculate Yield / احسب العائد</Button>
          </div>
        </ToolFormCard>

        {/* Results Section */}
        <ToolResultCard
          title="Rental Yield Results"
          description="Your property investment metrics"
        >
          <div className="space-y-6">
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Gross Rental Yield / العائد الإجمالي</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.grossYield.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Net Rental Yield / العائد الصافي</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.netYield.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Annual Income / الدخل السنوي</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.annualRent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">Net Annual Income / صافي الدخل السنوي</span>
                <span className="text-3xl font-bold text-primary">
                  {results.netAnnualIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">ROI / العائد على الاستثمار</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.roi.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Charts */}
            {pieData.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Income Breakdown / توزيع الدخل</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </ToolResultCard>
      </div>

      {/* SEO Text */}
      <SEOTextBlock title="Complete Guide to Rental Yield Calculation in Saudi Arabia">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Understanding Rental Yield in Saudi Arabia</h2>
            <p>
              Rental yield is one of the most important metrics for property investors in Saudi Arabia. It measures the annual rental income as a percentage of the property's value, helping you evaluate the profitability of real estate investments in cities like Riyadh, Jeddah, Dammam, and other major markets.
            </p>
            <p>
              Whether you're considering buying a property for rental income or evaluating your existing rental portfolio, understanding rental yield helps you make informed investment decisions and compare different property opportunities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">What is Rental Yield?</h2>
            <p>
              Rental yield is expressed as a percentage and shows how much rental income you can expect relative to your property investment. There are two types:
            </p>
            
            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">Gross Rental Yield</h3>
              <p>
                Gross rental yield is the simplest calculation:
              </p>
              <div className="bg-muted p-4 rounded-lg my-2">
                <p className="font-mono text-sm">
                  Gross Yield = (Annual Rental Income ÷ Property Value) × 100
                </p>
              </div>
              <p>
                This calculation doesn't account for expenses, giving you a basic return percentage. It's useful for quick comparisons but doesn't show the true profitability.
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">Net Rental Yield</h3>
              <p>
                Net rental yield provides a more accurate picture by including expenses:
              </p>
              <div className="bg-muted p-4 rounded-lg my-2">
                <p className="font-mono text-sm">
                  Net Yield = [(Annual Rental Income - Annual Expenses) ÷ Property Value] × 100
                </p>
              </div>
              <p>
                Net yield shows your actual return after accounting for all property-related expenses, making it the preferred metric for serious investors.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">What Expenses Should You Include?</h2>
            <p>
              When calculating net rental yield, include all annual expenses:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Property Management Fees:</strong> Typically 5-10% of rental income if using a management company</li>
              <li><strong>Maintenance and Repairs:</strong> Budget 1-2% of property value annually</li>
              <li><strong>Insurance:</strong> Property and landlord insurance premiums</li>
              <li><strong>Property Tax and Fees:</strong> Municipal fees, if applicable</li>
              <li><strong>Vacancy Allowance:</strong> Account for periods when the property may be unoccupied (typically 5-10%)</li>
              <li><strong>Utilities:</strong> If included in rent (water, electricity, internet)</li>
              <li><strong>Legal and Administrative:</strong> Contract renewals, tenant screening costs</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">What is a Good Rental Yield in Saudi Arabia?</h2>
            <p>
              Rental yields vary by location and property type:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Riyadh:</strong> Typically 5-8% gross yield for residential properties</li>
              <li><strong>Jeddah:</strong> Similar to Riyadh, with coastal properties sometimes commanding higher rents</li>
              <li><strong>Dammam/Khobar:</strong> Generally 4-7% depending on location</li>
              <li><strong>Commercial Properties:</strong> Often higher yields (6-10%) but with longer lease terms</li>
            </ul>
            <p>
              A net yield of 5% or higher is generally considered good for residential properties in Saudi Arabia, though this can vary based on your investment goals and risk tolerance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use Our Rental Yield Calculator</h2>
            <p>
              Our rental yield calculator makes it easy to evaluate property investments:
            </p>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Enter the property value (purchase price or current market value)</li>
              <li>Input the monthly rental income you expect or currently receive</li>
              <li>Add all annual expenses (maintenance, insurance, management fees, etc.)</li>
              <li>Set the vacancy rate (percentage of time the property may be unoccupied)</li>
              <li>Instantly see both gross and net rental yields, plus ROI calculations</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Example Rental Yield Calculation</h2>
            <p>
              Let's calculate the yield for a property in Riyadh:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Property Value: 1,000,000 SAR</li>
              <li>Monthly Rent: 5,000 SAR</li>
              <li>Annual Rent: 60,000 SAR</li>
              <li>Annual Expenses: 12,000 SAR (maintenance, insurance, management)</li>
              <li>Vacancy Rate: 5%</li>
            </ul>
            <p>
              <strong>Calculation:</strong><br />
              Adjusted Annual Rent: 60,000 × 0.95 = 57,000 SAR<br />
              Net Annual Income: 57,000 - 12,000 = 45,000 SAR<br />
              Gross Yield: (60,000 ÷ 1,000,000) × 100 = 6%<br />
              Net Yield: (45,000 ÷ 1,000,000) × 100 = 4.5%<br />
              ROI: 4.5%
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">What is a good rental yield in Saudi Arabia?</h3>
                <p>
                  A net rental yield of 5-7% is generally considered good for residential properties in major Saudi cities. Commercial properties may offer higher yields (6-10%) but with different risk profiles.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Should I use gross or net rental yield?</h3>
                <p>
                  Net rental yield is more accurate as it accounts for all expenses. Always use net yield for serious investment analysis, though gross yield is useful for quick property comparisons.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">How do I increase my rental yield?</h3>
                <p>
                  You can increase rental yield by: raising rent to market rates, reducing expenses through efficient management, improving property condition to attract better tenants, and minimizing vacancy periods.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p>
              Understanding rental yield is essential for successful property investment in Saudi Arabia. Our free rental yield calculator helps you evaluate properties accurately, accounting for all expenses and providing both gross and net yield calculations.
            </p>
            <p>
              Use our calculator to compare different property opportunities, understand your true return on investment, and make informed decisions about your real estate portfolio.
            </p>
          </div>
        </div>
      </SEOTextBlock>
    </div>
  )
}
