import { NextResponse } from "next/server";
import { processDocument } from "@/lib/ai/process-document";

// Public API endpoint for programmatic access
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Missing authorization header",
          hint: 'Include "Authorization: Bearer sk_..." header',
        },
        { status: 401 }
      );
    }

    const apiKey = authHeader.replace("Bearer ", "");
    if (!apiKey.startsWith("sk_")) {
      return NextResponse.json(
        { error: "Invalid API key format" },
        { status: 401 }
      );
    }

    // TODO: Validate API key against database
    // For MVP, accept any sk_ prefixed key when no DB is configured
    // In production, validate against api_keys table

    const contentType = request.headers.get("content-type") || "";

    let file: File;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const uploaded = formData.get("file") as File | null;
      if (!uploaded) {
        return NextResponse.json(
          { error: "No file provided. Send as multipart form with 'file' field." },
          { status: 400 }
        );
      }
      file = uploaded;
    } else {
      return NextResponse.json(
        {
          error: "Unsupported content type",
          hint: "Send file as multipart/form-data with 'file' field",
        },
        { status: 400 }
      );
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 20MB)" },
        { status: 400 }
      );
    }

    const result = await processDocument(file);

    // Return clean API response (no internal IDs)
    return NextResponse.json({
      success: true,
      data: {
        vendor: result.vendor,
        date: result.date,
        subtotal: result.subtotal,
        tax: result.tax,
        total: result.total,
        currency: result.currency,
        category: result.category,
        payment_terms: result.paymentTerms,
        line_items: result.lineItems,
        confidence: result.confidence,
      },
      meta: {
        processed_at: result.processedAt,
        file_name: result.fileName,
      },
    });
  } catch (error) {
    console.error("API processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Document processing failed",
      },
      { status: 500 }
    );
  }
}
