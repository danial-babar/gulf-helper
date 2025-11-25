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
      <SEOTextBlock title="Understanding Rental Yield">
        <p>
          Rental yield is a key metric for property investors, representing the annual rental income as a percentage of the property's value.
        </p>
        <p>
          Gross rental yield is calculated by dividing annual rental income by the property value. Net rental yield accounts for expenses such as maintenance, insurance, and property management fees.
        </p>
        <p>
          Our rental yield calculator helps you evaluate property investments by providing both gross and net yield calculations, giving you a clear picture of potential returns.
        </p>
      </SEOTextBlock>
    </div>
  )
}
