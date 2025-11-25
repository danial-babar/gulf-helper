import { Calculator } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RentalYieldCalculatorPage() {
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
              <Label htmlFor="property-value">Property Value (SAR)</Label>
              <Input id="property-value" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="monthly-rent">Monthly Rent (SAR)</Label>
              <Input id="monthly-rent" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="annual-expenses">Annual Expenses (SAR)</Label>
              <Input id="annual-expenses" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="vacancy-rate">Vacancy Rate (%)</Label>
              <Input id="vacancy-rate" type="number" placeholder="0.00" step="0.1" />
            </div>
            <Button className="w-full" size="lg">Calculate Yield</Button>
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
                <span className="text-muted-foreground">Gross Rental Yield</span>
                <span className="text-2xl font-bold text-foreground">0.00%</span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Net Rental Yield</span>
                <span className="text-2xl font-bold text-foreground">0.00%</span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Annual Income</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">Net Annual Income</span>
                <span className="text-3xl font-bold text-primary">0.00 SAR</span>
              </div>
            </div>
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

