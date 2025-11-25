"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const GOSI_RATE_EMPLOYEE = 0.10 // 10% for employee
const GOSI_RATE_EMPLOYER = 0.12 // 12% for employer (not deducted from salary)

const COLORS = ['#0057B8', '#C9A94A', '#10B981', '#F59E0B', '#EF4444']

export default function SalaryCalculatorPage() {
  const [grossSalary, setGrossSalary] = useState(10000)
  const [housingAllowance, setHousingAllowance] = useState(0)
  const [housingAllowanceType, setHousingAllowanceType] = useState("percentage")
  const [transportAllowance, setTransportAllowance] = useState(0)
  const [otherAllowances, setOtherAllowances] = useState(0)
  const [deductions, setDeductions] = useState(0)
  const [hasGOSI, setHasGOSI] = useState("yes")
  const [nationality, setNationality] = useState("saudi")

  const calculateSalary = () => {
    // Calculate housing allowance
    const housingAmount = housingAllowanceType === "percentage" 
      ? grossSalary * (housingAllowance / 100)
      : housingAllowance

    // Calculate total allowances
    const totalAllowances = housingAmount + transportAllowance + otherAllowances

    // Calculate GOSI (only for employees, not deducted for employer portion)
    const gosiDeduction = hasGOSI === "yes" 
      ? grossSalary * GOSI_RATE_EMPLOYEE 
      : 0

    // Calculate net salary
    const netSalary = grossSalary + totalAllowances - gosiDeduction - deductions

    // Yearly calculations
    const yearlyGross = grossSalary * 12
    const yearlyAllowances = totalAllowances * 12
    const yearlyGOSI = gosiDeduction * 12
    const yearlyDeductions = deductions * 12
    const yearlyNet = netSalary * 12

    return {
      grossSalary,
      housingAmount,
      transportAllowance,
      otherAllowances,
      totalAllowances,
      gosiDeduction,
      deductions,
      netSalary,
      yearlyGross,
      yearlyAllowances,
      yearlyGOSI,
      yearlyDeductions,
      yearlyNet,
    }
  }

  const results = calculateSalary()

  const pieData = [
    { name: 'Gross Salary', value: results.grossSalary, color: COLORS[0] },
    { name: 'Housing Allowance', value: results.housingAmount, color: COLORS[1] },
    { name: 'Transport Allowance', value: results.transportAllowance, color: COLORS[2] },
    { name: 'Other Allowances', value: results.otherAllowances, color: COLORS[3] },
  ].filter(item => item.value > 0)

  const deductionPieData = [
    { name: 'GOSI Deduction', value: results.gosiDeduction, color: COLORS[4] },
    { name: 'Other Deductions', value: results.deductions, color: COLORS[3] },
  ].filter(item => item.value > 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Salary Calculator</h1>
            <p className="text-muted-foreground mt-1">Calculate your net salary and deductions in Saudi Arabia</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <ToolFormCard
          title="Enter Salary Details"
          description="Fill in your salary information"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="gross-salary">Gross Salary (SAR) / الراتب الإجمالي</Label>
              <Input 
                id="gross-salary" 
                type="number" 
                value={grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                placeholder="10000"
              />
            </div>
            <div>
              <Label htmlFor="housing-allowance-type">Housing Allowance Type / نوع بدل السكن</Label>
              <Select value={housingAllowanceType} onValueChange={setHousingAllowanceType}>
                <SelectTrigger id="housing-allowance-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage / نسبة مئوية</SelectItem>
                  <SelectItem value="fixed">Fixed Amount / مبلغ ثابت</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="housing-allowance">
                {housingAllowanceType === "percentage" 
                  ? "Housing Allowance (%) / بدل السكن (%)" 
                  : "Housing Allowance (SAR) / بدل السكن (ريال)"}
              </Label>
              <Input 
                id="housing-allowance" 
                type="number" 
                value={housingAllowance}
                onChange={(e) => setHousingAllowance(Number(e.target.value) || 0)}
                placeholder={housingAllowanceType === "percentage" ? "25" : "2500"}
              />
            </div>
            <div>
              <Label htmlFor="transport-allowance">Transport Allowance (SAR) / بدل المواصلات</Label>
              <Input 
                id="transport-allowance" 
                type="number" 
                value={transportAllowance}
                onChange={(e) => setTransportAllowance(Number(e.target.value) || 0)}
                placeholder="500"
              />
            </div>
            <div>
              <Label htmlFor="other-allowances">Other Allowances (SAR) / البدلات الأخرى</Label>
              <Input 
                id="other-allowances" 
                type="number" 
                value={otherAllowances}
                onChange={(e) => setOtherAllowances(Number(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="deductions">Other Deductions (SAR) / الخصومات الأخرى</Label>
              <Input 
                id="deductions" 
                type="number" 
                value={deductions}
                onChange={(e) => setDeductions(Number(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="gosi">GOSI Contribution / اشتراك التأمينات</Label>
              <Select value={hasGOSI} onValueChange={setHasGOSI}>
                <SelectTrigger id="gosi">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes / نعم</SelectItem>
                  <SelectItem value="no">No / لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nationality">Nationality / الجنسية</Label>
              <Select value={nationality} onValueChange={setNationality}>
                <SelectTrigger id="nationality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saudi">Saudi / سعودي</SelectItem>
                  <SelectItem value="expat">Expatriate / مقيم</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" size="lg">Calculate Salary / احسب الراتب</Button>
          </div>
        </ToolFormCard>

        {/* Results Section */}
        <ToolResultCard
          title="Salary Breakdown"
          description="Your salary calculation results"
        >
          <div className="space-y-6">
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Gross Salary / الراتب الإجمالي</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.grossSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Total Allowances / إجمالي البدلات</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.totalAllowances.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            {results.gosiDeduction > 0 && (
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">GOSI Deduction (10%) / خصم التأمينات</span>
                  <span className="text-2xl font-bold text-foreground">
                    {results.gosiDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                  </span>
                </div>
              </div>
            )}
            {results.deductions > 0 && (
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Other Deductions / الخصومات الأخرى</span>
                  <span className="text-2xl font-bold text-foreground">
                    {results.deductions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                  </span>
                </div>
              </div>
            )}
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">Net Salary / الراتب الصافي</span>
                <span className="text-3xl font-bold text-primary">
                  {results.netSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>

            {/* Yearly Summary */}
            <div className="p-6 bg-muted rounded-xl">
              <h3 className="font-semibold mb-4">Yearly Summary / الملخص السنوي</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yearly Gross</span>
                  <span className="font-medium">{results.yearlyGross.toLocaleString('en-US')} SAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yearly Net</span>
                  <span className="font-medium text-primary">{results.yearlyNet.toLocaleString('en-US')} SAR</span>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            {pieData.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Salary Components / مكونات الراتب</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
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
      <SEOTextBlock title="Understanding Salary Calculation in Saudi Arabia">
        <p>
          Salary calculation in Saudi Arabia typically includes a base salary plus various allowances such as housing, transport, and other benefits. Understanding your net salary helps you plan your finances better.
        </p>
        <p>
          Common deductions may include social insurance contributions (GOSI), income tax (if applicable), and other mandatory deductions based on your employment contract.
        </p>
        <p>
          Our salary calculator helps you understand your take-home pay by accounting for all allowances and deductions, giving you a clear picture of your monthly income.
        </p>
      </SEOTextBlock>
    </div>
  )
}

