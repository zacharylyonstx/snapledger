import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog — SnapLedger",
  description: "AI invoice processing tips, receipt scanning automation, and bookkeeping efficiency guides.",
};

const posts = [
  {
    slug: "stop-typing-receipts-manually",
    title: "Stop Typing Receipts Into Spreadsheets — There's an AI for That",
    excerpt: "The average small business owner spends 5+ hours per month on manual data entry from receipts. Here's how AI eliminates that entirely.",
    date: "March 24, 2026",
    tags: ["AI", "Automation", "Small Business"],
  },
  {
    slug: "ai-invoice-processing-2026",
    title: "AI Invoice Processing in 2026: What's Changed and What Works",
    excerpt: "From basic OCR to GPT-4o Vision — how AI document processing evolved and why it finally works well enough to trust.",
    date: "March 24, 2026",
    tags: ["AI", "Invoice Processing", "Technology"],
  },
  {
    slug: "receipt-to-csv-in-seconds",
    title: "Receipt to CSV in 3 Seconds: A Step-by-Step Guide",
    excerpt: "Upload a photo of any receipt and get clean, structured CSV data. No typing, no templates, no setup. Here's exactly how it works.",
    date: "March 24, 2026",
    tags: ["Tutorial", "CSV", "Receipt Scanner"],
  },
];

export default function BlogPage() {
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
          <Link href="/">
            <Button variant="ghost" size="sm">&larr; Back</Button>
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-muted-foreground mb-12">
          Tips on AI-powered document processing, bookkeeping automation, and killing manual data entry.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="border-border/60 hover:border-primary/30 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-sm text-primary flex items-center gap-1">
                      Read more <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
