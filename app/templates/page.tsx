import { FileText, Download, Eye } from "lucide-react"
import { SectionHeader } from "@/components/SectionHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const templates = [
  {
    title: "VAT Invoice Template",
    description: "Professional VAT invoice template compliant with Saudi Arabia regulations",
    category: "Business",
    downloads: 1250,
    icon: FileText,
  },
  {
    title: "Employment Contract Template",
    description: "Standard employment contract template for Saudi Arabia",
    category: "Legal",
    downloads: 890,
    icon: FileText,
  },
  {
    title: "Rental Agreement Template",
    description: "Comprehensive rental agreement template for property leasing",
    category: "Property",
    downloads: 2100,
    icon: FileText,
  },
  {
    title: "Purchase Order Template",
    description: "Professional purchase order template for business transactions",
    category: "Business",
    downloads: 750,
    icon: FileText,
  },
  {
    title: "Quotation Template",
    description: "Standard quotation template for business proposals",
    category: "Business",
    downloads: 1100,
    icon: FileText,
  },
  {
    title: "Receipt Template",
    description: "Simple receipt template for payment documentation",
    category: "Business",
    downloads: 1650,
    icon: FileText,
  },
  {
    title: "Service Agreement Template",
    description: "Service agreement template for professional services",
    category: "Legal",
    downloads: 680,
    icon: FileText,
  },
  {
    title: "NDA Template",
    description: "Non-disclosure agreement template for confidential information",
    category: "Legal",
    downloads: 920,
    icon: FileText,
  },
]

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Document Templates</h1>
            <p className="text-muted-foreground mt-1">Professional templates for your business needs</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="property">Property</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <Card key={index} className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent/50">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                  <template.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {template.category}
                </span>
              </div>
              <CardTitle className="text-xl">{template.title}</CardTitle>
              <CardDescription className="text-base mt-2">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <Download className="h-4 w-4 inline mr-1" />
                  {template.downloads.toLocaleString()} downloads
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

