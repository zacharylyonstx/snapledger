"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Code2, Brain, Workflow } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const services = [
  {
    title: "AI Integration",
    price: "From $500",
    desc: "Add AI capabilities to your existing software. Document processing, chatbots, data extraction, automation.",
    features: ["Custom GPT-4o integration", "API development", "Data pipeline setup", "Production deployment"],
    icon: Brain,
  },
  {
    title: "Custom AI Tools",
    price: "From $2,000",
    desc: "Purpose-built AI applications for your specific business problem. Full stack, production-ready.",
    features: ["Requirements analysis", "Full-stack development", "UI/UX design", "Hosting & deployment", "30 days support"],
    icon: Code2,
  },
  {
    title: "AI Consulting",
    price: "$150/hr",
    desc: "Strategic guidance on AI adoption. Where to automate, what tools to use, build vs buy decisions.",
    features: ["AI opportunity audit", "Tool selection", "Architecture review", "Implementation roadmap"],
    icon: Workflow,
  },
];

export default function ServicesPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/ZacharyLyonsTX@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "SnapLedger Services Inquiry",
        }),
      });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you within 24 hours.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send. Try emailing directly.");
      }
    } catch {
      toast.error("Network error. Try emailing directly.");
    }
    setSending(false);
  }

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
            <Button variant="ghost" size="sm">&larr; Back to Product</Button>
          </Link>
        </div>
      </nav>

      <section className="pt-20 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            AI Development Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Need custom AI for your business?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The team behind SnapLedger builds AI-powered tools for businesses.
            From document processing to full automation pipelines.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(({ title, price, desc, features, icon: Icon }) => (
              <Card key={title} className="border-border/60">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <p className="text-2xl font-bold text-primary">{price}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
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

      <section id="contact" className="py-20 bg-card/30 border-y border-border/40">
        <div className="mx-auto max-w-lg px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Get in Touch</h2>
            <p className="text-muted-foreground">
              Tell us what you need. We respond within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-border/60 bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-border/60 bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <textarea
              placeholder="Tell us about your project..."
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg border border-border/60 bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
            <Button type="submit" className="w-full" disabled={sending}>
              {sending ? "Sending..." : "Send Inquiry"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Or email directly:{" "}
              <a href="mailto:ZacharyLyonsTX@gmail.com" className="text-primary hover:underline">
                ZacharyLyonsTX@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>&copy; 2026 SnapLedger. Built with AI, for businesses that want AI.</p>
      </footer>
    </div>
  );
}
