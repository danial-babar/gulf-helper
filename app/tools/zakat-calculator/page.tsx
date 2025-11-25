"use client"

import { useState, useEffect } from "react"
import { Calculator } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const NISAB_GOLD = 85 // grams
const NISAB_SILVER = 595 // grams
const GOLD_PRICE_PER_GRAM = 250 // SAR (example, should be fetched from API)
const SILVER_PRICE_PER_GRAM = 3 // SAR (example)
const ZAKAT_RATE = 0.025 // 2.5%

const COLORS = ['#0057B8', '#C9A94A', '#10B981', '#F59E0B', '#EF4444']

export default function ZakatCalculatorPage() {
  const [cash, setCash] = useState(50000)
  const [gold, setGold] = useState(100)
  const [silver, setSilver] = useState(0)
  const [stocks, setStocks] = useState(0)
  const [business, setBusiness] = useState(0)
  const [debts, setDebts] = useState(0)
  const [goldPrice, setGoldPrice] = useState(GOLD_PRICE_PER_GRAM)
  const [silverPrice, setSilverPrice] = useState(SILVER_PRICE_PER_GRAM)

  const calculateZakat = () => {
    const goldValue = gold * goldPrice
    const silverValue = silver * silverPrice
    const totalAssets = cash + goldValue + silverValue + stocks + business
    const netWealth = totalAssets - debts
    
    // Nisab threshold (using gold value)
    const nisabThreshold = NISAB_GOLD * goldPrice
    
    const isEligible = netWealth >= nisabThreshold
    const zakatAmount = isEligible ? netWealth * ZAKAT_RATE : 0

    return {
      totalAssets,
      netWealth,
      nisabThreshold,
      isEligible,
      zakatAmount,
      goldValue,
      silverValue,
    }
  }

  const results = calculateZakat()

  const chartData = [
    { name: 'Cash', value: cash, amount: cash },
    { name: 'Gold', value: results.goldValue, amount: results.goldValue },
    { name: 'Silver', value: results.silverValue, amount: results.silverValue },
    { name: 'Stocks', value: stocks, amount: stocks },
    { name: 'Business', value: business, amount: business },
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
              <Label htmlFor="cash">Cash & Bank Balances (SAR) / النقد والودائع المصرفية</Label>
              <Input 
                id="cash" 
                type="number" 
                value={cash}
                onChange={(e) => setCash(Number(e.target.value) || 0)}
                placeholder="50000"
              />
            </div>
            <div>
              <Label htmlFor="gold">Gold Weight (grams) / وزن الذهب (جرام)</Label>
              <Input 
                id="gold" 
                type="number" 
                value={gold}
                onChange={(e) => setGold(Number(e.target.value) || 0)}
                placeholder="100"
              />
            </div>
            <div>
              <Label htmlFor="gold-price">Gold Price per Gram (SAR) / سعر الذهب للجرام</Label>
              <Input 
                id="gold-price" 
                type="number" 
                value={goldPrice}
                onChange={(e) => setGoldPrice(Number(e.target.value) || 0)}
                placeholder="250"
              />
            </div>
            <div>
              <Label htmlFor="silver">Silver Weight (grams) / وزن الفضة (جرام)</Label>
              <Input 
                id="silver" 
                type="number" 
                value={silver}
                onChange={(e) => setSilver(Number(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="silver-price">Silver Price per Gram (SAR) / سعر الفضة للجرام</Label>
              <Input 
                id="silver-price" 
                type="number" 
                value={silverPrice}
                onChange={(e) => setSilverPrice(Number(e.target.value) || 0)}
                placeholder="3"
              />
            </div>
            <div>
              <Label htmlFor="stocks">Stocks & Investments (SAR) / الأسهم والاستثمارات</Label>
              <Input 
                id="stocks" 
                type="number" 
                value={stocks}
                onChange={(e) => setStocks(Number(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="business">Business Assets (SAR) / أصول الأعمال</Label>
              <Input 
                id="business" 
                type="number" 
                value={business}
                onChange={(e) => setBusiness(Number(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="debts">Outstanding Debts (SAR) / الديون المستحقة</Label>
              <Input 
                id="debts" 
                type="number" 
                value={debts}
                onChange={(e) => setDebts(Number(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => {
                // Force re-render
                setCash(cash)
              }}
            >
              Calculate Zakat / احسب الزكاة
            </Button>
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
                <span className="text-muted-foreground">Total Assets / إجمالي الأصول</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Nisab Threshold / حد النصاب</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.nisabThreshold.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Net Wealth / صافي الثروة</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.netWealth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            {!results.isEligible && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Your net wealth is below the Nisab threshold. Zakat is not required.
                </p>
              </div>
            )}
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">Zakat Amount (2.5%) / مبلغ الزكاة</span>
                <span className="text-3xl font-bold text-primary">
                  {results.zakatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Asset Breakdown / توزيع الأصول</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
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

