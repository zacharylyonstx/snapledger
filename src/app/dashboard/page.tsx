"use client";

import { useState } from "react";
import { UploadZone, type ProcessedDocument } from "@/components/upload-zone";
import { DocumentResult } from "@/components/document-result";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);

  function handleProcessed(doc: ProcessedDocument) {
    setDocuments((prev) => [doc, ...prev]);
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: FileText,
            label: "Documents This Month",
            value: documents.length.toString(),
            sub: "of 10 free",
          },
          {
            icon: Zap,
            label: "Avg Processing Time",
            value: "2.4s",
            sub: "last 30 days",
          },
          {
            icon: TrendingUp,
            label: "Data Accuracy",
            value: "99.2%",
            sub: "confidence score",
          },
        ].map(({ icon: Icon, label, value, sub }) => (
          <Card key={label} className="border-border/60">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">
                  {label}{" "}
                  <span className="text-muted-foreground/60">· {sub}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload */}
      <UploadZone onProcessed={handleProcessed} />

      {/* Results */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Processed Documents</h2>
            <Badge variant="secondary">{documents.length} total</Badge>
          </div>
          {documents.map((doc) => (
            <DocumentResult key={doc.id} doc={doc} />
          ))}
        </div>
      )}

      {documents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">
            Upload your first document to get started
          </p>
        </div>
      )}
    </div>
  );
}
