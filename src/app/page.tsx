"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  FileText,
  Download,
  Shield,
  ArrowRight,
  Check,
  Upload,
  Brain,
  Table,
  Code2,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              SnapLedger
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#api"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              API
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="gap-1">
                Get Started <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-chart-2/10 rounded-full blur-3xl" />

        <motion.div
          className="relative mx-auto max-w-4xl px-6 text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-xs font-medium"
            >
              <Star className="mr-1 h-3 w-3 text-yellow-400 fill-yellow-400" />
              AI-Powered Document Processing
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Snap a photo.
            <br />
            <span className="text-primary">Get clean data.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10"
          >
            Upload any invoice, receipt, or bill. Our AI extracts vendor, dates,
            line items, totals, and tax — structured and ready to export.{" "}
            <span className="text-foreground font-medium">
              Stop doing manual data entry.
            </span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button size="lg" className="text-base px-8 gap-2">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="text-base px-8">
                See How It Works
              </Button>
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm text-muted-foreground"
          >
            10 documents/month free. No credit card required.
          </motion.p>

          {/* Hero visual — mock preview */}
          <motion.div
            variants={fadeUp}
            className="mt-16 mx-auto max-w-3xl"
          >
            <div className="relative rounded-2xl border border-border/60 bg-card p-1 shadow-2xl shadow-primary/5">
              <div className="rounded-xl bg-background p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Input side */}
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Upload
                    </div>
                    <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        receipt_march.jpg
                      </p>
                    </div>
                  </div>
                  {/* Output side */}
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Brain className="h-3 w-3 text-primary" />
                      Extracted Data
                    </div>
                    <div className="space-y-2 text-left">
                      {[
                        ["Vendor", "Home Depot"],
                        ["Date", "2026-03-15"],
                        ["Subtotal", "$142.87"],
                        ["Tax", "$11.79"],
                        ["Total", "$154.66"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between text-sm py-1.5 px-3 rounded-md bg-muted/30"
                        >
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Social proof */}
      <section className="border-y border-border/40 py-12 bg-card/30">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["99.2%", "Accuracy"],
              ["< 3s", "Processing"],
              ["50+", "Data Fields"],
              ["$0", "To Start"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to{" "}
              <span className="text-primary">kill data entry</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From photo to spreadsheet in seconds. No templates, no rules, no
              setup — just AI that understands documents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Vision Processing",
                desc: "GPT-4o analyzes your documents with human-level understanding. Handles messy handwriting, faded receipts, and complex multi-page invoices.",
              },
              {
                icon: Table,
                title: "Structured Output",
                desc: "Get vendor, dates, line items, totals, tax, payment terms, and 50+ data fields — all structured and ready to use.",
              },
              {
                icon: Download,
                title: "Export Anywhere",
                desc: "CSV, JSON, or QuickBooks-compatible format. Drop directly into your accounting software. No manual mapping.",
              },
              {
                icon: Shield,
                title: "Confidence Scores",
                desc: "Every extracted field comes with a confidence score. Know exactly what the AI is sure about and what needs a human eye.",
              },
              {
                icon: Code2,
                title: "Developer API",
                desc: "REST API with simple auth. POST a document, GET structured data. Build invoice processing into any workflow.",
              },
              {
                icon: FileText,
                title: "Batch Processing",
                desc: "Upload dozens of documents at once. Process your monthly stack in minutes instead of hours.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="bg-card/50 border-border/60 hover:border-primary/30 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-card/30 border-y border-border/40">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Three steps. That&apos;s it.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Drag & drop a photo, scan, or PDF. We accept anything readable.",
              },
              {
                step: "02",
                title: "AI Extracts",
                desc: "GPT-4o vision reads the document and pulls out every data point — in under 3 seconds.",
              },
              {
                step: "03",
                title: "Export",
                desc: "Review, edit if needed, then export as CSV, JSON, or QuickBooks format.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="text-5xl font-bold text-primary/20 mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Developer API
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Build invoice processing into{" "}
                <span className="text-primary">anything</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Simple REST API. Send a document, get structured JSON back.
                Perfect for automating AP workflows, expense reporting, or
                building your own document pipeline.
              </p>
              <Link href="/signup">
                <Button className="gap-2">
                  Get API Key <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="rounded-xl bg-card border border-border p-6 font-mono text-sm overflow-x-auto">
              <div className="text-muted-foreground mb-1">
                {"// POST /api/v1/process"}
              </div>
              <pre className="text-foreground whitespace-pre-wrap">
                {`curl -X POST \\
  https://snapledger.com/api/v1/process \\
  -H "Authorization: Bearer sk_..." \\
  -F "file=@receipt.jpg"

// Response
{
  "vendor": "Home Depot",
  "date": "2026-03-15",
  "total": 154.66,
  "tax": 11.79,
  "line_items": [...]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-card/30 border-y border-border/40">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Simple, honest pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                desc: "Try it out. No credit card.",
                features: [
                  "10 documents/month",
                  "All export formats",
                  "Email support",
                ],
                cta: "Start Free",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$29",
                period: "/month",
                desc: "For freelancers & small teams.",
                features: [
                  "200 documents/month",
                  "API access",
                  "Batch processing",
                  "Priority support",
                  "QuickBooks export",
                ],
                cta: "Start Pro Trial",
                highlight: true,
              },
              {
                name: "Business",
                price: "$79",
                period: "/month",
                desc: "For teams that process volume.",
                features: [
                  "Unlimited documents",
                  "Full API access",
                  "Custom integrations",
                  "Dedicated support",
                  "SSO & team management",
                  "Webhook notifications",
                ],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map(({ name, price, period, desc, features, cta, highlight }) => (
              <Card
                key={name}
                className={`relative ${
                  highlight
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border/60"
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-lg font-semibold mb-1">{name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{price}</span>
                    <span className="text-muted-foreground">{period}</span>
                  </div>
                  <Link href="/signup">
                    <Button
                      className="w-full mb-6"
                      variant={highlight ? "default" : "outline"}
                    >
                      {cta}
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Stop typing. Start shipping.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of businesses that automated their invoice processing
            with SnapLedger.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-base px-8 gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                <Zap className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">SnapLedger</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Docs
              </a>
              <a
                href="mailto:ZacharyLyonsTX@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 SnapLedger. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
