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
      <SEOTextBlock title="Understanding VAT in Saudi Arabia and GCC">
        <p>
          Value Added Tax (VAT) was introduced in Saudi Arabia in 2018 at a standard rate of 15%. Most goods and services are subject to VAT, with some exceptions for essential items.
        </p>
        <p>
          In other GCC countries, VAT rates vary. The UAE, Bahrain, and Oman have a standard rate of 5%, while some items may be zero-rated or exempt from VAT.
        </p>
        <p>
          Our VAT calculator helps you quickly determine the VAT amount to add or remove from any transaction, making it easier to understand pricing and comply with tax regulations.
        </p>
      </SEOTextBlock>
    </div>
  )
}
