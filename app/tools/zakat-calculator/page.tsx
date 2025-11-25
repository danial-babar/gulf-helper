"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { Metadata } from "next"

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
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Zakat Calculator Saudi Arabia - Calculate Your Zakat Online</h1>
              <p className="text-muted-foreground mt-1">Calculate your Zakat obligation accurately based on current gold and silver prices in Saudi Arabia and GCC</p>
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

        {/* SEO Content */}
        <SEOTextBlock title="Complete Guide to Zakat Calculation in Saudi Arabia">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">What is Zakat?</h2>
              <p>
                Zakat is one of the Five Pillars of Islam and is an obligatory form of charity that requires Muslims to donate 2.5% of their qualifying wealth (Nisab) to those in need. In Saudi Arabia and GCC countries, calculating Zakat accurately is essential for fulfilling this religious obligation.
              </p>
              <p>
                Zakat serves as a means of purifying wealth and helping those less fortunate. It is calculated annually based on your total assets, including cash, gold, silver, investments, and business assets, minus any outstanding debts.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Understanding Nisab Threshold</h2>
              <p>
                The Nisab is the minimum amount of wealth a Muslim must possess before being obligated to pay Zakat. In Saudi Arabia, the Nisab threshold is equivalent to:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>85 grams of gold</strong> - Based on current market prices in Saudi Riyal</li>
                <li><strong>595 grams of silver</strong> - An alternative calculation method</li>
              </ul>
              <p>
                If your net wealth (total assets minus debts) exceeds the Nisab threshold and has been held for a full lunar year, you are required to pay Zakat at a rate of 2.5%.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">What Assets Are Included in Zakat Calculation?</h2>
              <p>
                When calculating your Zakat obligation, you should include all qualifying assets:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Cash and Bank Balances:</strong> All money in savings accounts, checking accounts, and cash on hand</li>
                <li><strong>Gold and Silver:</strong> Jewelry, coins, bars, or any form of precious metals (valued at current market prices)</li>
                <li><strong>Stocks and Investments:</strong> Shares, bonds, mutual funds, and other investment vehicles</li>
                <li><strong>Business Assets:</strong> Inventory, accounts receivable, and business capital</li>
                <li><strong>Other Assets:</strong> Any other wealth that has reached the Nisab threshold</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">What Can Be Deducted from Zakat?</h2>
              <p>
                You can deduct the following from your total assets when calculating Zakat:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Outstanding Debts:</strong> Loans, credit card balances, and any money you owe to others</li>
                <li><strong>Immediate Expenses:</strong> Rent, utilities, and essential living expenses for the current month</li>
                <li><strong>Personal Assets:</strong> Your primary residence, personal vehicle, and items used for personal consumption are generally exempt</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">How to Use Our Zakat Calculator</h2>
              <p>
                Our Zakat calculator for Saudi Arabia makes it easy to determine your Zakat obligation:
              </p>
              <ol className="list-decimal pl-6 space-y-2 my-4">
                <li>Enter your cash and bank balances in Saudi Riyal</li>
                <li>Input the weight of your gold in grams and the current gold price per gram</li>
                <li>If applicable, enter your silver weight and current silver price</li>
                <li>Add the value of your stocks, investments, and business assets</li>
                <li>Enter any outstanding debts that should be deducted</li>
                <li>The calculator will automatically determine if you meet the Nisab threshold and calculate your Zakat amount</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Example Zakat Calculation</h2>
              <p>
                Let's say you have the following assets:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Cash and bank balances: 50,000 SAR</li>
                <li>Gold: 100 grams at 250 SAR per gram = 25,000 SAR</li>
                <li>Stocks: 20,000 SAR</li>
                <li>Outstanding debts: 5,000 SAR</li>
              </ul>
              <p>
                <strong>Total Assets:</strong> 95,000 SAR<br />
                <strong>Net Wealth:</strong> 90,000 SAR (after deducting debts)<br />
                <strong>Nisab Threshold:</strong> 21,250 SAR (85 grams × 250 SAR)<br />
                <strong>Zakat Amount (2.5%):</strong> 2,250 SAR
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">When Should You Pay Zakat?</h2>
              <p>
                Zakat should be paid once per lunar year (Hijri year). Many Muslims choose to pay during the holy month of Ramadan, but it can be paid at any time during the year once your wealth has been held for a full lunar year (Hawl).
              </p>
              <p>
                It's important to note that Zakat is due on wealth that has been in your possession for a complete lunar year. New wealth acquired during the year will be subject to Zakat in the following year.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">What is the current Nisab threshold in Saudi Arabia?</h3>
                  <p>
                    The Nisab threshold is based on the value of 85 grams of gold or 595 grams of silver. Since gold and silver prices fluctuate, the threshold amount in Saudi Riyal changes daily. Our calculator uses current market prices to determine the exact threshold.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Do I need to pay Zakat on my salary?</h3>
                  <p>
                    Zakat is not due on your salary until it has been in your possession for a full lunar year. However, if your salary accumulates in your bank account and reaches the Nisab threshold, it becomes subject to Zakat after one lunar year.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Is Zakat required on my primary residence?</h3>
                  <p>
                    No, your primary residence (the home you live in) is generally exempt from Zakat. However, if you own rental properties or investment real estate, those are subject to Zakat.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">How often should I calculate Zakat?</h3>
                  <p>
                    Zakat should be calculated annually, typically at the same time each year. Many Muslims calculate and pay Zakat during Ramadan, but you can choose any date that marks one full lunar year since your wealth reached the Nisab threshold.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I use this calculator for other GCC countries?</h3>
                  <p>
                    Yes, our Zakat calculator works for all GCC countries. Simply ensure you're using the correct currency conversion and current gold/silver prices for your country.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
              <p>
                Calculating Zakat accurately is an important religious obligation for Muslims in Saudi Arabia and GCC countries. Our free Zakat calculator helps you determine your Zakat obligation based on current gold and silver prices, ensuring you fulfill this pillar of Islam correctly.
              </p>
              <p>
                Use our calculator regularly to stay on top of your Zakat obligations, and remember that Zakat is not just a financial calculation—it's a means of purifying your wealth and helping those in need. May your Zakat be accepted and bring blessings to you and your family.
              </p>
            </div>
          </div>
        </SEOTextBlock>
      </div>
    </>
  )
}
