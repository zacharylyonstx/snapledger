"use client";

import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface UploadZoneProps {
  onProcessed: (result: ProcessedDocument) => void;
}

export interface ProcessedDocument {
  id: string;
  fileName: string;
  vendor: string;
  date: string;
  subtotal: number | null;
  tax: number | null;
  total: number;
  currency: string;
  category: string;
  paymentTerms: string | null;
  lineItems: LineItem[];
  confidence: number;
  rawResponse: Record<string, unknown>;
  processedAt: string;
}

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export function UploadZone({ onProcessed }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = useCallback(
    async (file: File) => {
      if (
        !file.type.startsWith("image/") &&
        file.type !== "application/pdf"
      ) {
        toast.error("Please upload an image or PDF");
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        toast.error("File too large (max 20MB)");
        return;
      }

      setFileName(file.name);
      setProcessing(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/process", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Processing failed");
        }

        const result = await res.json();
        onProcessed(result);
        toast.success("Document processed successfully!");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Processing failed"
        );
      } finally {
        setProcessing(false);
        setFileName(null);
      }
    },
    [onProcessed]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        dragActive
          ? "border-primary bg-primary/5"
          : "border-border/60 hover:border-border"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center py-12">
        {processing ? (
          <>
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-sm font-medium mb-1">Processing {fileName}...</p>
            <p className="text-xs text-muted-foreground">
              AI is analyzing your document
            </p>
          </>
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium mb-1">
              Drop your invoice or receipt here
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports images (JPG, PNG, WEBP) and PDF — up to 20MB
            </p>
            <label>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleChange}
              />
              <Button variant="outline" size="sm" className="pointer-events-none">
                <FileText className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </label>
          </>
        )}
      </CardContent>
    </Card>
  );
}
