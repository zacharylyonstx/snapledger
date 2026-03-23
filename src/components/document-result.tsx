"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Check, AlertTriangle } from "lucide-react";
import type { ProcessedDocument } from "@/components/upload-zone";
import { toast } from "sonner";

interface DocumentResultProps {
  doc: ProcessedDocument;
}

function ConfidenceBadge({ score }: { score: number }) {
  if (score >= 0.9)
    return (
      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
        <Check className="h-3 w-3 mr-1" />
        {(score * 100).toFixed(0)}% confident
      </Badge>
    );
  if (score >= 0.7)
    return (
      <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
        {(score * 100).toFixed(0)}% confident
      </Badge>
    );
  return (
    <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
      <AlertTriangle className="h-3 w-3 mr-1" />
      {(score * 100).toFixed(0)}% — review needed
    </Badge>
  );
}

function exportCSV(doc: ProcessedDocument) {
  const headers = [
    "Vendor",
    "Date",
    "Category",
    "Subtotal",
    "Tax",
    "Total",
    "Currency",
  ];
  const row = [
    doc.vendor,
    doc.date,
    doc.category,
    doc.subtotal ?? "",
    doc.tax ?? "",
    doc.total,
    doc.currency,
  ];

  let csv = headers.join(",") + "\n" + row.join(",") + "\n";

  if (doc.lineItems.length > 0) {
    csv += "\nLine Items\nDescription,Quantity,Unit Price,Amount\n";
    doc.lineItems.forEach((item) => {
      csv += `"${item.description}",${item.quantity},${item.unitPrice},${item.amount}\n`;
    });
  }

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${doc.vendor.replace(/\s+/g, "_")}_${doc.date}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success("CSV downloaded");
}

function exportJSON(doc: ProcessedDocument) {
  const blob = new Blob([JSON.stringify(doc, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${doc.vendor.replace(/\s+/g, "_")}_${doc.date}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success("JSON downloaded");
}

export function DocumentResult({ doc }: DocumentResultProps) {
  const fmt = (n: number | null) =>
    n != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: doc.currency || "USD",
        }).format(n)
      : "—";

  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">{doc.vendor}</CardTitle>
            <p className="text-xs text-muted-foreground">{doc.date}</p>
          </div>
        </div>
        <ConfidenceBadge score={doc.confidence} />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary fields */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ["Category", doc.category],
            ["Subtotal", fmt(doc.subtotal)],
            ["Tax", fmt(doc.tax)],
            ["Total", fmt(doc.total)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg bg-muted/30 p-3"
            >
              <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
              <p className="text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>

        {doc.paymentTerms && (
          <p className="text-xs text-muted-foreground">
            Payment terms: {doc.paymentTerms}
          </p>
        )}

        {/* Line items */}
        {doc.lineItems.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Line Items
              </p>
              <div className="space-y-1">
                {doc.lineItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm py-2 px-3 rounded-md hover:bg-muted/30"
                  >
                    <span className="flex-1 truncate">{item.description}</span>
                    <span className="text-muted-foreground mx-4">
                      ×{item.quantity}
                    </span>
                    <span className="font-medium w-20 text-right">
                      {fmt(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Export buttons */}
        <Separator />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCSV(doc)}
          >
            <Download className="h-3 w-3 mr-1" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportJSON(doc)}
          >
            <Download className="h-3 w-3 mr-1" />
            JSON
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
