"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Loader2, Check, AlertTriangle, FileText } from "lucide-react";

interface DemoResult {
  vendor: string;
  date: string;
  subtotal: number | null;
  tax: number | null;
  total: number;
  currency: string;
  category: string;
  line_items: { description: string; quantity: number; amount: number }[];
  confidence: number;
}

export function DemoUpload() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setError("Upload an image or PDF");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("File too large (max 20MB)");
      return;
    }

    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/process", { method: "POST", body: formData });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Processing failed");
      }

      const data = await res.json();
      setResult({
        vendor: data.vendor,
        date: data.date,
        subtotal: data.subtotal,
        tax: data.tax,
        total: data.total,
        currency: data.currency || "USD",
        category: data.category,
        line_items: data.lineItems || [],
        confidence: data.confidence,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setProcessing(false);
    }
  }, []);

  const fmt = (n: number | null) =>
    n != null
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
      : "—";

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      <Card
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          dragActive ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/40"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const file = e.dataTransfer.files[0];
          if (file) processFile(file);
        }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*,.pdf";
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) processFile(file);
          };
          input.click();
        }}
      >
        <CardContent className="flex flex-col items-center justify-center py-8">
          {processing ? (
            <>
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
              <p className="text-sm font-medium">AI is analyzing your document...</p>
              <p className="text-xs text-muted-foreground">This takes 2-5 seconds</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Drop a receipt or invoice here</p>
              <p className="text-xs text-muted-foreground">or click to browse — JPG, PNG, PDF</p>
            </>
          )}
        </CardContent>
      </Card>

      {error && (
        <div className="text-center text-sm text-destructive">{error}</div>
      )}

      {/* Result */}
      {result && (
        <Card className="border-border/60 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-semibold">{result.vendor}</span>
                <span className="text-sm text-muted-foreground">{result.date}</span>
              </div>
              {result.confidence >= 0.9 ? (
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <Check className="h-3 w-3 mr-1" />
                  {(result.confidence * 100).toFixed(0)}%
                </Badge>
              ) : (
                <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {(result.confidence * 100).toFixed(0)}%
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ["Subtotal", fmt(result.subtotal)],
                ["Tax", fmt(result.tax)],
                ["Total", fmt(result.total)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-muted/30 p-2 text-center">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>

            {result.line_items.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Line Items</p>
                {result.line_items.slice(0, 5).map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 px-2 rounded bg-muted/20">
                    <span className="truncate">{item.description}</span>
                    <span className="font-medium ml-2">{fmt(item.amount)}</span>
                  </div>
                ))}
                {result.line_items.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{result.line_items.length - 5} more items
                  </p>
                )}
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground pt-2">
              ⚡ Processed by GPT-4o Vision in seconds
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
