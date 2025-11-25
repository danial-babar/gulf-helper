import { FileCheck } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VATInvoiceGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <FileCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">VAT Invoice Generator</h1>
            <p className="text-muted-foreground mt-1">Generate compliant VAT invoices for your business</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <ToolFormCard
          title="Invoice Details"
          description="Fill in the invoice information"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input id="invoice-number" type="text" placeholder="INV-001" />
            </div>
            <div>
              <Label htmlFor="invoice-date">Invoice Date</Label>
              <Input id="invoice-date" type="date" />
            </div>
            <div>
              <Label htmlFor="seller-name">Seller Name</Label>
              <Input id="seller-name" type="text" placeholder="Company Name" />
            </div>
            <div>
              <Label htmlFor="seller-vat">Seller VAT Number</Label>
              <Input id="seller-vat" type="text" placeholder="VAT Number" />
            </div>
            <div>
              <Label htmlFor="buyer-name">Buyer Name</Label>
              <Input id="buyer-name" type="text" placeholder="Customer Name" />
            </div>
            <div>
              <Label htmlFor="item-description">Item Description</Label>
              <Input id="item-description" type="text" placeholder="Product or Service" />
            </div>
            <div>
              <Label htmlFor="amount">Amount (SAR)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="vat-rate">VAT Rate</Label>
              <Select>
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
            <Button className="w-full" size="lg">Generate Invoice</Button>
          </div>
        </ToolFormCard>

        {/* Results Section */}
        <ToolResultCard
          title="Invoice Preview"
          description="Review your generated invoice"
        >
          <div className="space-y-6">
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">0.00 SAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT (15%)</span>
                  <span className="font-medium">0.00 SAR</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">0.00 SAR</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Download PDF</Button>
              <Button className="flex-1">Print Invoice</Button>
            </div>
          </div>
        </ToolResultCard>
      </div>

      {/* SEO Text */}
      <SEOTextBlock title="Understanding VAT Invoices">
        <p>
          VAT invoices are required documents for businesses in Saudi Arabia and GCC countries. They must include specific information such as seller and buyer details, VAT numbers, item descriptions, and VAT amounts.
        </p>
        <p>
          A compliant VAT invoice should include the invoice number, date, seller and buyer information, itemized list of goods or services, subtotal, VAT rate, VAT amount, and total amount.
        </p>
        <p>
          Our VAT invoice generator helps you create compliant invoices quickly and easily, ensuring you meet all regulatory requirements for your business transactions.
        </p>
      </SEOTextBlock>
    </div>
  )
}

