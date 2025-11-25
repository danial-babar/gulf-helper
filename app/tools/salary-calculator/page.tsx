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
      <SEOTextBlock title="Complete Guide to Salary Calculation in Saudi Arabia">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Understanding Salary Structure in Saudi Arabia</h2>
            <p>
              Salary calculation in Saudi Arabia follows a unique structure that typically includes a base salary plus various allowances. Understanding how your salary is calculated helps you plan your finances, negotiate better employment terms, and ensure you're receiving the correct compensation.
            </p>
            <p>
              The Saudi labor market offers competitive compensation packages, especially for expatriates, with various allowances that can significantly impact your take-home pay. Our salary calculator helps you understand exactly how much you'll receive after all deductions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Components of Salary in Saudi Arabia</h2>
            <p>
              A typical salary package in Saudi Arabia consists of:
            </p>
            
            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">1. Base Salary (الراتب الأساسي)</h3>
              <p>
                The base salary is the core component of your compensation package. This is the fixed amount you receive before any allowances or deductions. It forms the foundation for calculating other benefits and deductions.
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">2. Housing Allowance (بدل السكن)</h3>
              <p>
                Housing allowance is one of the most significant components of a Saudi salary package. It can be provided as:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-2">
                <li><strong>Percentage of base salary:</strong> Typically 25-50% of the base salary</li>
                <li><strong>Fixed amount:</strong> A predetermined monthly amount regardless of base salary</li>
                <li><strong>Company-provided accommodation:</strong> Some employers provide housing directly</li>
              </ul>
              <p>
                For expatriates, housing allowance is often a major part of the compensation package, helping cover the cost of accommodation in cities like Riyadh, Jeddah, or Dammam.
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">3. Transport Allowance (بدل المواصلات)</h3>
              <p>
                Transport allowance covers commuting expenses. While typically smaller than housing allowance, it's a standard component in most employment contracts. The amount varies but is usually between 500-1,500 SAR per month.
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">4. Other Allowances</h3>
              <p>
                Additional allowances may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-2">
                <li>Food allowance (بدل الطعام)</li>
                <li>Medical allowance (بدل طبي)</li>
                <li>Education allowance for children</li>
                <li>Utility allowances</li>
                <li>Performance bonuses</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Salary Deductions in Saudi Arabia</h2>
            <p>
              Understanding deductions is crucial for calculating your net salary:
            </p>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">GOSI (General Organization for Social Insurance)</h3>
              <p>
                GOSI is the mandatory social insurance system in Saudi Arabia:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-2">
                <li><strong>Employee Contribution:</strong> 10% of base salary (deducted from your salary)</li>
                <li><strong>Employer Contribution:</strong> 12% of base salary (paid by employer, not deducted from your salary)</li>
                <li><strong>Coverage:</strong> Provides retirement, disability, and death benefits</li>
              </ul>
              <p>
                <strong>Important:</strong> GOSI is typically deducted only from the base salary, not from allowances. However, this can vary by employment contract.
              </p>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">Other Deductions</h3>
              <p>
                Additional deductions may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-2">
                <li>Loan repayments (personal loans, car loans)</li>
                <li>Insurance premiums (health, life insurance)</li>
                <li>Savings schemes or investment plans</li>
                <li>Income tax (for certain categories of expatriates, though generally not applicable)</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use Our Salary Calculator</h2>
            <p>
              Our salary calculator for Saudi Arabia makes it easy to determine your net salary:
            </p>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Enter your gross salary (base salary)</li>
              <li>Input your housing allowance (as percentage or fixed amount)</li>
              <li>Add transport allowance and any other allowances</li>
              <li>Enter any additional deductions (loans, insurance, etc.)</li>
              <li>Select whether GOSI applies to your contract</li>
              <li>Choose your nationality (Saudi or Expatriate) for accurate calculations</li>
              <li>The calculator will show your net salary and yearly summary</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Example Salary Calculation</h2>
            <p>
              Let's calculate the net salary for an employee with the following package:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Base Salary: 10,000 SAR</li>
              <li>Housing Allowance: 25% of base = 2,500 SAR</li>
              <li>Transport Allowance: 500 SAR</li>
              <li>Other Allowances: 0 SAR</li>
              <li>GOSI: Yes (10% of base salary)</li>
              <li>Other Deductions: 0 SAR</li>
            </ul>
            <p>
              <strong>Calculation:</strong><br />
              Gross Salary: 10,000 SAR<br />
              Total Allowances: 2,500 + 500 = 3,000 SAR<br />
              GOSI Deduction: 10,000 × 10% = 1,000 SAR<br />
              <strong>Net Salary: 10,000 + 3,000 - 1,000 = 12,000 SAR</strong>
            </p>
            <p>
              <strong>Yearly Summary:</strong><br />
              Yearly Gross: 120,000 SAR<br />
              Yearly Net: 144,000 SAR
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Saudi vs Expatriate Salary Considerations</h2>
            <p>
              There are some differences in salary structures between Saudi nationals and expatriates:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Saudi Nationals:</strong> Typically have higher GOSI contributions and may have additional benefits like family allowances</li>
              <li><strong>Expatriates:</strong> Often receive higher housing allowances and may have different tax obligations depending on their home country's tax treaties</li>
              <li><strong>Both:</strong> Should understand their complete compensation package to make informed financial decisions</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Is GOSI deducted from allowances?</h3>
                <p>
                  Typically, GOSI is calculated only on the base salary, not on allowances. However, this can vary by employment contract. Always check your specific contract terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Do expatriates pay income tax in Saudi Arabia?</h3>
                <p>
                  Generally, there is no personal income tax in Saudi Arabia for either Saudis or expatriates. However, expatriates may have tax obligations in their home countries. Consult a tax advisor for your specific situation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">What is a typical housing allowance percentage?</h3>
                <p>
                  Housing allowance typically ranges from 25% to 50% of base salary for expatriates, though it can be higher or provided as a fixed amount. For Saudi nationals, it's often lower or may be provided as company housing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Can I negotiate my salary package?</h3>
                <p>
                  Yes, salary packages in Saudi Arabia are often negotiable, especially for expatriates. Consider negotiating base salary, housing allowance, and other benefits as a complete package.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">How often are salaries paid in Saudi Arabia?</h3>
                <p>
                  Most employers in Saudi Arabia pay salaries monthly, typically at the end of the month. Some companies may pay bi-monthly or have different payment schedules.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p>
              Understanding your salary calculation in Saudi Arabia is essential for financial planning and ensuring you receive the correct compensation. Our free salary calculator helps you break down your complete compensation package, showing exactly how allowances and deductions affect your take-home pay.
            </p>
            <p>
              Use our calculator to understand your net salary, plan your budget, and make informed decisions about your employment. Whether you're a Saudi national or an expatriate, knowing your exact take-home pay helps you manage your finances effectively in the Kingdom.
            </p>
          </div>
        </div>
      </SEOTextBlock>
    </div>
  )
}

