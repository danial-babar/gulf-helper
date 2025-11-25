import Link from "next/link"
import { Calculator, FileText, BookOpen, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold text-foreground">GulfHelper</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Smart tools for Saudi Arabia & GCC. Calculate, generate, and manage with confidence.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/zakat-calculator" className="text-muted-foreground hover:text-foreground transition-colors">
                  Zakat Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/vat-calculator" className="text-muted-foreground hover:text-foreground transition-colors">
                  VAT Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/salary-calculator" className="text-muted-foreground hover:text-foreground transition-colors">
                  Salary Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/loan-calculator" className="text-muted-foreground hover:text-foreground transition-colors">
                  Loan Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@gulfhelper.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GulfHelper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

