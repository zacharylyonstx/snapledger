import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { processDocument } from "@/lib/ai/process-document";

export async function POST(request: Request) {
  try {
    // Auth check — either session or API key
    let userId: string | null = null;

    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer sk_")) {
      // API key auth — validate against db
      // For MVP, we'll check supabase
      const apiKey = authHeader.replace("Bearer ", "");
      userId = await validateApiKey(apiKey);
      if (!userId) {
        return NextResponse.json(
          { error: "Invalid API key" },
          { status: 401 }
        );
      }
    } else {
      // Session auth
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
      userId = user.id;
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

async function validateApiKey(key: string): Promise<string | null> {
  // For MVP — simple key validation
  // In production, hash the key and look it up in supabase
  try {
    const { createClient: createAdmin } = await import("@supabase/supabase-js");
    const supabase = createAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const keyHash = await hashKey(key);
    const { data } = await supabase
      .from("api_keys")
      .select("user_id")
      .eq("key_hash", keyHash)
      .single();

    if (data) {
      // Update last used
      await supabase
        .from("api_keys")
        .update({ last_used: new Date().toISOString() })
        .eq("key_hash", keyHash);
      return data.user_id;
    }
    return null;
  } catch {
    return null;
  }
}

async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
