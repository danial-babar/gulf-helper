"use client"

import { useState } from "react"
import { FileCheck, Plus, Trash2, Download, Printer } from "lucide-react"
import { ToolFormCard } from "@/components/ToolFormCard"
import { ToolResultCard } from "@/components/ToolResultCard"
import { SEOTextBlock } from "@/components/SEOTextBlock"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import jsPDF from "jspdf"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  vatRate: number
}

export default function VATInvoiceGeneratorPage() {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [sellerName, setSellerName] = useState("ABC Company Ltd.")
  const [sellerVAT, setSellerVAT] = useState("123456789012345")
  const [sellerAddress, setSellerAddress] = useState("Riyadh, Saudi Arabia")
  const [buyerName, setBuyerName] = useState("XYZ Corporation")
  const [buyerVAT, setBuyerVAT] = useState("987654321098765")
  const [buyerAddress, setBuyerAddress] = useState("Jeddah, Saudi Arabia")
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Product/Service 1", quantity: 2, unitPrice: 1000, vatRate: 15 },
  ])

  const addItem = () => {
    setItems([...items, {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      vatRate: 15,
    }])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const calculateTotals = () => {
    let subtotal = 0
    let totalVAT = 0

    items.forEach(item => {
      const itemTotal = item.quantity * item.unitPrice
      subtotal += itemTotal
      totalVAT += itemTotal * (item.vatRate / 100)
    })

    const total = subtotal + totalVAT

    return { subtotal, totalVAT, total }
  }

  const totals = calculateTotals()

  const generatePDF = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.text("VAT INVOICE", 105, 20, { align: "center" })
    
    // Seller Info
    doc.setFontSize(12)
    doc.text("Seller / البائع:", 20, 35)
    doc.setFontSize(10)
    doc.text(`Name: ${sellerName}`, 20, 42)
    doc.text(`VAT: ${sellerVAT}`, 20, 48)
    doc.text(`Address: ${sellerAddress}`, 20, 54)
    
    // Buyer Info
    doc.setFontSize(12)
    doc.text("Buyer / المشتري:", 120, 35)
    doc.setFontSize(10)
    doc.text(`Name: ${buyerName}`, 120, 42)
    doc.text(`VAT: ${buyerVAT}`, 120, 48)
    doc.text(`Address: ${buyerAddress}`, 120, 54)
    
    // Invoice Details
    doc.setFontSize(12)
    doc.text(`Invoice No: ${invoiceNumber}`, 20, 70)
    doc.text(`Date: ${invoiceDate}`, 120, 70)
    
    // Items Table Header
    let yPos = 85
    doc.setFontSize(10)
    doc.text("Description", 20, yPos)
    doc.text("Qty", 100, yPos)
    doc.text("Unit Price", 120, yPos)
    doc.text("VAT %", 150, yPos)
    doc.text("Total", 170, yPos)
    
    yPos += 10
    doc.line(20, yPos, 190, yPos)
    yPos += 5
    
    // Items
    items.forEach(item => {
      const itemTotal = item.quantity * item.unitPrice
      const itemVAT = itemTotal * (item.vatRate / 100)
      const itemTotalWithVAT = itemTotal + itemVAT
      
      doc.text(item.description.substring(0, 30), 20, yPos)
      doc.text(item.quantity.toString(), 100, yPos)
      doc.text(item.unitPrice.toFixed(2), 120, yPos)
      doc.text(`${item.vatRate}%`, 150, yPos)
      doc.text(itemTotalWithVAT.toFixed(2), 170, yPos)
      yPos += 8
    })
    
    yPos += 5
    doc.line(20, yPos, 190, yPos)
    yPos += 10
    
    // Totals
    doc.setFontSize(10)
    doc.text(`Subtotal: ${totals.subtotal.toFixed(2)} SAR`, 120, yPos)
    yPos += 8
    doc.text(`VAT: ${totals.totalVAT.toFixed(2)} SAR`, 120, yPos)
    yPos += 8
    doc.setFontSize(12)
    doc.text(`Total: ${totals.total.toFixed(2)} SAR`, 120, yPos)
    
    // Footer
    doc.setFontSize(8)
    doc.text("This is a computer-generated invoice.", 105, 280, { align: "center" })
    
    doc.save(`invoice-${invoiceNumber}.pdf`)
  }

  const handlePrint = () => {
    window.print()
  }

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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoice-number">Invoice Number / رقم الفاتورة</Label>
                <Input 
                  id="invoice-number" 
                  type="text" 
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="INV-001"
                />
              </div>
              <div>
                <Label htmlFor="invoice-date">Invoice Date / تاريخ الفاتورة</Label>
                <Input 
                  id="invoice-date" 
                  type="date" 
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Seller Information / معلومات البائع</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="seller-name">Seller Name / اسم البائع</Label>
                  <Input 
                    id="seller-name" 
                    type="text" 
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label htmlFor="seller-vat">Seller VAT Number / الرقم الضريبي للبائع</Label>
                  <Input 
                    id="seller-vat" 
                    type="text" 
                    value={sellerVAT}
                    onChange={(e) => setSellerVAT(e.target.value)}
                    placeholder="VAT Number"
                  />
                </div>
                <div>
                  <Label htmlFor="seller-address">Seller Address / عنوان البائع</Label>
                  <Input 
                    id="seller-address" 
                    type="text" 
                    value={sellerAddress}
                    onChange={(e) => setSellerAddress(e.target.value)}
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Buyer Information / معلومات المشتري</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="buyer-name">Buyer Name / اسم المشتري</Label>
                  <Input 
                    id="buyer-name" 
                    type="text" 
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Customer Name"
                  />
                </div>
                <div>
                  <Label htmlFor="buyer-vat">Buyer VAT Number / الرقم الضريبي للمشتري</Label>
                  <Input 
                    id="buyer-vat" 
                    type="text" 
                    value={buyerVAT}
                    onChange={(e) => setBuyerVAT(e.target.value)}
                    placeholder="VAT Number"
                  />
                </div>
                <div>
                  <Label htmlFor="buyer-address">Buyer Address / عنوان المشتري</Label>
                  <Input 
                    id="buyer-address" 
                    type="text" 
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Items / العناصر</h3>
                <Button type="button" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <Card key={item.id} className="p-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Item {index + 1}</span>
                        {items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        placeholder="Description / الوصف"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value) || 0)}
                        />
                        <Input
                          type="number"
                          placeholder="Unit Price"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value) || 0)}
                        />
                        <Select
                          value={item.vatRate.toString()}
                          onValueChange={(value) => updateItem(item.id, "vatRate", Number(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="0">0%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1" size="lg" onClick={generatePDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="lg" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </ToolFormCard>

        {/* Results Section */}
        <ToolResultCard
          title="Invoice Preview"
          description="Review your generated invoice"
        >
          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="text-center border-b pb-4">
              <h2 className="text-2xl font-bold">VAT INVOICE</h2>
              <div className="mt-2 text-sm text-muted-foreground">
                <div>Invoice No: {invoiceNumber}</div>
                <div>Date: {invoiceDate}</div>
              </div>
            </div>

            {/* Seller & Buyer Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Seller / البائع</h3>
                <p>{sellerName}</p>
                <p className="text-muted-foreground">VAT: {sellerVAT}</p>
                <p className="text-muted-foreground">{sellerAddress}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Buyer / المشتري</h3>
                <p>{buyerName}</p>
                <p className="text-muted-foreground">VAT: {buyerVAT}</p>
                <p className="text-muted-foreground">{buyerAddress}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Unit Price</th>
                    <th className="p-2 text-right">VAT %</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const itemTotal = item.quantity * item.unitPrice
                    const itemVAT = itemTotal * (item.vatRate / 100)
                    const itemTotalWithVAT = itemTotal + itemVAT
                    return (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">{item.description || "-"}</td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-right">{item.unitPrice.toFixed(2)}</td>
                        <td className="p-2 text-right">{item.vatRate}%</td>
                        <td className="p-2 text-right font-medium">{itemTotalWithVAT.toFixed(2)} SAR</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal / المجموع الفرعي</span>
                <span className="font-medium">{totals.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT / ضريبة القيمة المضافة</span>
                <span className="font-medium">{totals.totalVAT.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR</span>
              </div>
              <div className="pt-2 border-t flex justify-between text-lg">
                <span className="font-semibold">Total / الإجمالي</span>
                <span className="font-bold text-primary">{totals.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR</span>
              </div>
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
