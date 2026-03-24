import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export const metadata = {
  title: "Stop Typing Receipts Into Spreadsheets — SnapLedger",
  description: "The average small business owner spends 5+ hours per month on manual data entry from receipts. Here's how AI eliminates that entirely.",
  keywords: "receipt scanner, AI receipt processing, stop manual data entry, receipt to spreadsheet, automated receipt processing",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">SnapLedger</span>
          </Link>
          <Link href="/blog">
            <Button variant="ghost" size="sm">&larr; Blog</Button>
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-2xl px-6 py-16 prose prose-invert prose-slate">
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">AI</Badge>
            <Badge variant="secondary">Automation</Badge>
            <Badge variant="secondary">Small Business</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 !mt-0">
            Stop Typing Receipts Into Spreadsheets — There&apos;s an AI for That
          </h1>
          <p className="text-muted-foreground">March 24, 2026 · 4 min read</p>
        </div>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <p className="text-lg">
            The average small business owner spends <strong>5-10 hours per month</strong> typing
            receipt data into spreadsheets. That&apos;s 60-120 hours per year of pure data entry.
            In 2026, that&apos;s insane.
          </p>

          <h2 className="text-xl font-bold !mt-10 !mb-3">The Problem Everyone Ignores</h2>
          <p>
            You buy something for the business. You get a receipt. Then you have to:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Find the receipt (it&apos;s crumpled in your pocket)</li>
            <li>Squint at the faded thermal paper</li>
            <li>Open your spreadsheet or QuickBooks</li>
            <li>Type the vendor name, date, each line item, subtotal, tax, total</li>
            <li>Double-check you didn&apos;t fat-finger a number</li>
            <li>Repeat for every. single. receipt.</li>
          </ol>

          <h2 className="text-xl font-bold !mt-10 !mb-3">What AI Can Do Now</h2>
          <p>
            GPT-4o Vision can look at a photo of a receipt and extract every data point
            with 99%+ accuracy. Not &quot;OCR that gives you a wall of text&quot; — actual
            structured data. Vendor. Date. Line items with quantities and prices.
            Subtotal. Tax. Total. Category. Payment terms.
          </p>
          <p>
            The whole process takes <strong>under 3 seconds</strong>.
          </p>

          <h2 className="text-xl font-bold !mt-10 !mb-3">How SnapLedger Works</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Upload:</strong> Snap a photo or drag-and-drop a PDF</li>
            <li><strong>AI Extracts:</strong> GPT-4o Vision reads the document and pulls out every field</li>
            <li><strong>Export:</strong> Download as CSV (for Excel/Sheets) or JSON (for developers)</li>
          </ol>
          <p>
            That&apos;s it. No templates to set up. No rules to configure. No training required.
            The AI understands receipts from Home Depot, Walmart, Amazon, restaurants,
            gas stations — anything.
          </p>

          <h2 className="text-xl font-bold !mt-10 !mb-3">The Math</h2>
          <p>
            If you process 50 receipts a month and each takes 3 minutes to type:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Manual: 50 × 3 min = <strong>2.5 hours/month</strong></li>
            <li>With SnapLedger: 50 × 5 sec = <strong>4 minutes/month</strong></li>
            <li>Time saved: <strong>2 hours 26 minutes every month</strong></li>
            <li>Annual savings: <strong>29 hours</strong></li>
          </ul>
          <p>
            At $50/hr (a conservative freelancer rate), that&apos;s <strong>$1,450/year</strong> in
            time savings. SnapLedger Pro costs $29/month ($348/year). The ROI is over 4x.
          </p>

          <h2 className="text-xl font-bold !mt-10 !mb-3">Try It Right Now</h2>
          <p>
            No signup. No credit card. Just upload a receipt and see it work:
          </p>
          <div className="my-6">
            <Link href="/#demo">
              <Button size="lg" className="gap-2">
                Try the Live Demo <Zap className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <h2 className="text-xl font-bold !mt-10 !mb-3">Need Something Custom?</h2>
          <p>
            If you need AI document processing tailored to your specific business —
            custom fields, integration with your software, bulk processing pipelines —
            we build that too.
          </p>
          <p>
            <Link href="/services" className="text-primary hover:underline">
              Check out our AI development services →
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}
