import { NextResponse } from "next/server";
import { processDocument } from "@/lib/ai/process-document";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // Rate limit: 5 documents per hour per IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               request.headers.get("cf-connecting-ip") || "unknown";
    const { allowed, remaining } = checkRateLimit(ip, 5);
    if (!allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Upgrade to Pro for unlimited processing." },
        { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 20MB)" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, WEBP, or PDF." },
        { status: 400 }
      );
    }

    const result = await processDocument(file);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Document processing failed",
      },
      { status: 500 }
    );
  }
}
