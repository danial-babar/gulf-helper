"use client"

import { useState } from "react"
import { Percent } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VATCalculatorPage() {
  const [amount, setAmount] = useState(1000)
  const [vatRate, setVatRate] = useState("15")
  const [calculationType, setCalculationType] = useState("add")
  const [quantity, setQuantity] = useState(1)

  const calculateVAT = () => {
    const baseAmount = amount * quantity
    let vatAmount = 0
    let totalAmount = 0
    let originalAmount = 0

    const rate = Number(vatRate) / 100

    if (calculationType === "add") {
      // Add VAT to amount
      originalAmount = baseAmount
      vatAmount = baseAmount * rate
      totalAmount = baseAmount + vatAmount
    } else {
      // Remove VAT from amount (amount includes VAT)
      totalAmount = baseAmount
      originalAmount = baseAmount / (1 + rate)
      vatAmount = totalAmount - originalAmount
    }

    return {
      originalAmount,
      vatAmount,
      totalAmount,
      rate: Number(vatRate),
    }
  }

  const results = calculateVAT()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Percent className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">VAT Calculator</h1>
            <p className="text-muted-foreground mt-1">Calculate VAT amounts for Saudi Arabia and GCC</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <ToolFormCard
          title="Enter Amount"
          description="Calculate VAT on your amount"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (SAR) / المبلغ (ريال)</Label>
              <Input 
                id="amount" 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                placeholder="1000"
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity / الكمية</Label>
              <Input 
                id="quantity" 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                placeholder="1"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="vat-rate">VAT Rate / معدل ضريبة القيمة المضافة</Label>
              <Select value={vatRate} onValueChange={setVatRate}>
                <SelectTrigger id="vat-rate">
                  <SelectValue placeholder="Select VAT rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15% (Standard Rate - Saudi Arabia)</SelectItem>
                  <SelectItem value="5">5% (Standard Rate - UAE, Bahrain, Oman)</SelectItem>
                  <SelectItem value="0">0% (Zero-rated)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="calculation-type">Calculation Type / نوع الحساب</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger id="calculation-type">
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add VAT to amount / إضافة ضريبة القيمة المضافة</SelectItem>
                  <SelectItem value="remove">Remove VAT from amount / إزالة ضريبة القيمة المضافة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" size="lg">Calculate VAT / احسب ضريبة القيمة المضافة</Button>
          </div>
        </ToolFormCard>

        {/* Results Section */}
        <ToolResultCard
          title="VAT Calculation"
          description="Breakdown of VAT amount"
        >
          <div className="space-y-6">
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">
                  {calculationType === "add" ? "Original Amount / المبلغ الأصلي" : "Amount Excluding VAT / المبلغ بدون ضريبة"}
                </span>
                <span className="text-2xl font-bold text-foreground">
                  {results.originalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">VAT Amount ({results.rate}%) / مبلغ الضريبة</span>
                <span className="text-2xl font-bold text-foreground">
                  {results.vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">
                  {calculationType === "add" ? "Total Amount / المبلغ الإجمالي" : "Amount Including VAT / المبلغ مع الضريبة"}
                </span>
                <span className="text-3xl font-bold text-primary">
                  {results.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                </span>
              </div>
            </div>
            {quantity > 1 && (
              <div className="p-4 bg-muted rounded-xl">
                <div className="text-sm text-muted-foreground mb-2">Per Unit / لكل وحدة</div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Unit Price / سعر الوحدة</span>
                  <span className="font-semibold">
                    {(results.originalAmount / quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-muted-foreground">VAT per Unit / الضريبة لكل وحدة</span>
                  <span className="font-semibold">
                    {(results.vatAmount / quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                  </span>
                </div>
              </div>
            )}
          </div>
        </ToolResultCard>
      </div>

      {/* SEO Text */}
      <SEOTextBlock title="Complete Guide to VAT Calculation in Saudi Arabia and GCC">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">What is VAT in Saudi Arabia?</h2>
            <p>
              Value Added Tax (VAT) was introduced in Saudi Arabia on January 1, 2018, at a standard rate of 15%. VAT is an indirect tax levied on the consumption of goods and services. It applies to most transactions, including sales of goods, provision of services, and imports.
            </p>
            <p>
              The implementation of VAT in Saudi Arabia was part of the GCC-wide tax reform initiative to diversify revenue sources and reduce dependence on oil revenues. Understanding VAT calculations is essential for businesses and individuals operating in the Kingdom.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">VAT Rates in GCC Countries</h2>
            <p>
              VAT rates vary across GCC countries:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Saudi Arabia:</strong> 15% standard rate (highest in GCC)</li>
              <li><strong>United Arab Emirates (UAE):</strong> 5% standard rate</li>
              <li><strong>Bahrain:</strong> 5% standard rate</li>
              <li><strong>Oman:</strong> 5% standard rate</li>
              <li><strong>Kuwait:</strong> No VAT implemented (as of 2024)</li>
              <li><strong>Qatar:</strong> No VAT implemented (as of 2024)</li>
            </ul>
            <p>
              Some goods and services may be zero-rated (0% VAT) or exempt from VAT entirely, depending on the specific regulations in each country.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How to Calculate VAT</h2>
            <p>
              There are two main scenarios when calculating VAT:
            </p>
            
            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">1. Adding VAT to a Price</h3>
              <p>
                When you need to add VAT to an amount (exclusive of VAT):
              </p>
              <ul className="list-disc pl-6 space-y-2 my-2">
                <li>VAT Amount = Price × VAT Rate</li>
                <li>Total Price (Including VAT) = Price + VAT Amount</li>
                <li>Or simply: Total = Price × (1 + VAT Rate)</li>
              </ul>
              <p className="mt-2">
                <strong>Example:</strong> A product costs 1,000 SAR (excluding VAT) with 15% VAT rate
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>VAT Amount = 1,000 × 0.15 = 150 SAR</li>
                <li>Total Price = 1,000 + 150 = 1,150 SAR</li>
              </ul>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-semibold mb-2">2. Removing VAT from a Price</h3>
              <p>
                When you have a price that includes VAT and need to find the base amount:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-2">
                <li>Base Price (Excluding VAT) = Total Price ÷ (1 + VAT Rate)</li>
                <li>VAT Amount = Total Price - Base Price</li>
              </ul>
              <p className="mt-2">
                <strong>Example:</strong> A product costs 1,150 SAR (including 15% VAT)
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Base Price = 1,150 ÷ 1.15 = 1,000 SAR</li>
                <li>VAT Amount = 1,150 - 1,000 = 150 SAR</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use Our VAT Calculator</h2>
            <p>
              Our VAT calculator for Saudi Arabia and GCC makes VAT calculations quick and accurate:
            </p>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Enter the amount you want to calculate VAT for</li>
              <li>Select the quantity (if calculating for multiple items)</li>
              <li>Choose the appropriate VAT rate (15% for Saudi Arabia, 5% for UAE/Bahrain/Oman, or 0% for zero-rated items)</li>
              <li>Select whether you want to add VAT to the amount or remove VAT from an amount that already includes it</li>
              <li>The calculator will instantly show you the VAT amount and total</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">VAT Registration Requirements in Saudi Arabia</h2>
            <p>
              Businesses in Saudi Arabia must register for VAT if their annual taxable supplies exceed 375,000 SAR. Voluntary registration is available for businesses with annual supplies between 187,500 SAR and 375,000 SAR.
            </p>
            <p>
              Once registered, businesses must:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Charge VAT on taxable supplies</li>
              <li>Issue VAT invoices for all sales</li>
              <li>File regular VAT returns (typically quarterly or monthly)</li>
              <li>Maintain proper accounting records</li>
              <li>Claim input VAT on business expenses</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Zero-Rated and Exempt Supplies</h2>
            <p>
              Some goods and services in Saudi Arabia are zero-rated (0% VAT) or exempt from VAT:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Zero-Rated:</strong> Exports of goods and services, certain medical supplies, international transportation</li>
              <li><strong>Exempt:</strong> Financial services (in some cases), residential property sales, certain educational services</li>
            </ul>
            <p>
              It's important to understand the difference: zero-rated supplies are still taxable supplies (at 0%), meaning businesses can claim input VAT on related expenses. Exempt supplies do not allow input VAT recovery.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">What is the VAT rate in Saudi Arabia?</h3>
                <p>
                  The standard VAT rate in Saudi Arabia is 15%, which is the highest among GCC countries that have implemented VAT.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Do I need to pay VAT on online purchases?</h3>
                <p>
                  Yes, online purchases from businesses registered in Saudi Arabia are subject to VAT. International online purchases may also be subject to VAT depending on the value and type of goods.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Can I claim VAT back as an individual?</h3>
                <p>
                  Generally, individuals cannot claim VAT refunds. However, tourists visiting Saudi Arabia may be eligible for VAT refunds on purchases made during their visit, subject to certain conditions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">How do I know if a price includes VAT?</h3>
                <p>
                  In Saudi Arabia, businesses are required to display prices clearly. If a price is marked as "including VAT" or shows "شامل ضريبة القيمة المضافة", it means VAT is already included. Otherwise, VAT will be added at checkout.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Is VAT the same as sales tax?</h3>
                <p>
                  While similar, VAT and sales tax differ. VAT is charged at each stage of the supply chain, while sales tax is typically charged only at the final point of sale. VAT allows businesses to claim input tax credits.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p>
              Understanding VAT calculations is essential for businesses and consumers in Saudi Arabia and GCC countries. Our free VAT calculator helps you quickly determine VAT amounts, whether you're adding VAT to a price or removing it from a total amount.
            </p>
            <p>
              Use our calculator for accurate VAT calculations, ensuring compliance with tax regulations and better financial planning. Whether you're a business owner, accountant, or consumer, our tool makes VAT calculations simple and accurate.
            </p>
          </div>
        </div>
      </SEOTextBlock>
    </div>
  )
}
