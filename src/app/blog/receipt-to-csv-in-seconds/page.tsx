import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export const metadata = {
  title: "Receipt to CSV in 3 Seconds: A Step-by-Step Guide — SnapLedger",
  description: "Upload a photo of any receipt and get clean, structured CSV data instantly. No typing, no templates, no setup required.",
  keywords: "receipt to CSV, receipt scanner to spreadsheet, convert receipt to Excel, receipt photo to data, scan receipt to CSV, receipt OCR free",
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

      <article className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">Tutorial</Badge>
            <Badge variant="secondary">CSV</Badge>
            <Badge variant="secondary">Receipt Scanner</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Receipt to CSV in 3 Seconds: A Step-by-Step Guide
          </h1>
          <p className="text-muted-foreground">March 24, 2026 · 3 min read</p>
        </div>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <p className="text-lg">
            Need to get receipt data into a spreadsheet? Here&apos;s the fastest way
            in 2026 — no typing, no templates, no software to install.
          </p>

          <h2 className="text-xl font-bold !mt-10 !mb-3">Step 1: Take a Photo</h2>
          <p>
            Use your phone camera or any scanner. The photo doesn&apos;t need to be perfect —
            AI handles angled shots, shadows, and even partially crumpled receipts.
          </p>
          <p>Tips for best results:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Make sure all text is visible (no fingers covering important parts)</li>
            <li>Decent lighting — avoid extreme shadows</li>
            <li>Any angle works, but straight-on is best</li>
          </ul>

          <h2 className="text-xl font-bold !mt-10 !mb-3">Step 2: Upload to SnapLedger</h2>
          <p>
            Go to <Link href="/#demo" className="text-primary hover:underline">the demo</Link> and
            drag-and-drop your receipt photo. No account needed.
          </p>
          <p>
            Supported formats: JPG, PNG, WEBP, PDF (up to 20MB).
          </p>

          <h2 className="text-xl font-bold !mt-10 !mb-3">Step 3: AI Extracts Everything</h2>
          <p>
            In 2-5 seconds, GPT-4o Vision analyzes your receipt and extracts:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Vendor name</strong> (the store/business)</li>
            <li><strong>Date</strong> (formatted as YYYY-MM-DD)</li>
            <li><strong>Each line item</strong> with description, quantity, and price</li>
            <li><strong>Subtotal, tax, and total</strong></li>
            <li><strong>Category</strong> (food, office supplies, travel, etc.)</li>
            <li><strong>Payment terms</strong> (if it&apos;s an invoice)</li>
          </ul>
          <p>
            Each field comes with a <strong>confidence score</strong> so you know what to
            double-check.
          </p>

          <h2 className="text-xl font-bold !mt-10 !mb-3">Step 4: Download CSV</h2>
          <p>
            Click the CSV export button. Open in Excel, Google Sheets, or any spreadsheet
            app. The data is clean, structured, and ready to use.
          </p>
          <p>
            Need JSON instead? Click the JSON button. Building automation?
            Use the <Link href="/#api" className="text-primary hover:underline">REST API</Link> to
            process documents programmatically.
          </p>

          <h2 className="text-xl font-bold !mt-10 !mb-3">That&apos;s It</h2>
          <p>
            Photo → Upload → CSV. Three steps, three seconds, zero typing.
          </p>

          <div className="my-8 p-6 rounded-xl bg-card border border-border/60 text-center">
            <p className="text-lg font-semibold mb-3">Ready to stop typing receipts?</p>
            <Link href="/#demo">
              <Button size="lg" className="gap-2">
                Try It Free — No Signup <Zap className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              10 documents/month free. Upgrade anytime.
            </p>
          </div>

          <h2 className="text-xl font-bold !mt-10 !mb-3">Processing Lots of Receipts?</h2>
          <p>
            If you&apos;re a bookkeeper or business owner processing hundreds of receipts monthly,
            check out our <Link href="/services" className="text-primary hover:underline">AI development services</Link>.
            We build custom document processing pipelines that integrate directly with your
            existing workflow.
          </p>
        </div>
      </article>
    </div>
  );
}
