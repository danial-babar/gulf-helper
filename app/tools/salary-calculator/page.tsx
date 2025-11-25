import { TrendingUp } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SalaryCalculatorPage() {
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
              <Label htmlFor="gross-salary">Gross Salary (SAR)</Label>
              <Input id="gross-salary" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="housing-allowance">Housing Allowance (SAR)</Label>
              <Input id="housing-allowance" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="transport-allowance">Transport Allowance (SAR)</Label>
              <Input id="transport-allowance" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="other-allowances">Other Allowances (SAR)</Label>
              <Input id="other-allowances" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="deductions">Deductions (SAR)</Label>
              <Input id="deductions" type="number" placeholder="0.00" />
            </div>
            <Button className="w-full" size="lg">Calculate Salary</Button>
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
                <span className="text-muted-foreground">Gross Salary</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Total Allowances</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Total Deductions</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">Net Salary</span>
                <span className="text-3xl font-bold text-primary">0.00 SAR</span>
              </div>
            </div>
          </div>
        </ToolResultCard>
      </div>

      {/* SEO Text */}
      <SEOTextBlock title="Understanding Salary Calculation in Saudi Arabia">
        <p>
          Salary calculation in Saudi Arabia typically includes a base salary plus various allowances such as housing, transport, and other benefits. Understanding your net salary helps you plan your finances better.
        </p>
        <p>
          Common deductions may include social insurance contributions, income tax (if applicable), and other mandatory deductions based on your employment contract.
        </p>
        <p>
          Our salary calculator helps you understand your take-home pay by accounting for all allowances and deductions, giving you a clear picture of your monthly income.
        </p>
      </SEOTextBlock>
    </div>
  )
}

