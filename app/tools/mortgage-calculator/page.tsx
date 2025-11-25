import { Building2 } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MortgageCalculatorPage() {
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
              <Label htmlFor="property-price">Property Price (SAR)</Label>
              <Input id="property-price" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="down-payment">Down Payment (SAR)</Label>
              <Input id="down-payment" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
              <Input id="interest-rate" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div>
              <Label htmlFor="loan-term">Loan Term</Label>
              <div className="flex gap-2">
                <Input id="loan-term" type="number" placeholder="0" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full" size="lg">Calculate Mortgage</Button>
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
                <span className="text-muted-foreground">Loan Amount</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Monthly Payment</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">Total Payment</span>
                <span className="text-3xl font-bold text-primary">0.00 SAR</span>
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

