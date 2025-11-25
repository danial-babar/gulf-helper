import { Calculator } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ZakatCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Zakat Calculator</h1>
            <p className="text-muted-foreground mt-1">Calculate your Zakat obligation accurately</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <ToolFormCard
          title="Enter Your Details"
          description="Fill in your financial information to calculate Zakat"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="cash">Cash & Bank Balances (SAR)</Label>
              <Input id="cash" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="gold">Gold Value (SAR)</Label>
              <Input id="gold" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="silver">Silver Value (SAR)</Label>
              <Input id="silver" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="stocks">Stocks & Investments (SAR)</Label>
              <Input id="stocks" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="business">Business Assets (SAR)</Label>
              <Input id="business" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="debts">Outstanding Debts (SAR)</Label>
              <Input id="debts" type="number" placeholder="0.00" />
            </div>
            <Button className="w-full" size="lg">Calculate Zakat</Button>
          </div>
        </ToolFormCard>

        {/* Results Section */}
        <ToolResultCard
          title="Zakat Calculation"
          description="Your Zakat obligation for this year"
        >
          <div className="space-y-6">
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Total Assets</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Nisab Threshold</span>
                <span className="text-2xl font-bold text-foreground">0.00 SAR</span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">Zakat Amount (2.5%)</span>
                <span className="text-3xl font-bold text-primary">0.00 SAR</span>
              </div>
            </div>
          </div>
        </ToolResultCard>
      </div>

      {/* SEO Text */}
      <SEOTextBlock title="Understanding Zakat Calculation">
        <p>
          Zakat is one of the Five Pillars of Islam and is an obligatory form of charity. It requires Muslims to donate 2.5% of their qualifying wealth (Nisab) to those in need.
        </p>
        <p>
          To calculate Zakat, you need to determine your total assets including cash, gold, silver, stocks, and business assets, then subtract any outstanding debts. If your net wealth exceeds the Nisab threshold (equivalent to 85 grams of gold or 595 grams of silver), you are required to pay Zakat.
        </p>
        <p>
          Our Zakat calculator helps you accurately determine your Zakat obligation based on current gold and silver prices in Saudi Arabia and GCC countries.
        </p>
      </SEOTextBlock>
    </div>
  )
}

