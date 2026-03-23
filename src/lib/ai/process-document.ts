import type { ProcessedDocument, LineItem } from "@/components/upload-zone";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const SYSTEM_PROMPT = `You are a document data extraction AI. You analyze images and PDFs of invoices, receipts, and bills to extract structured data.

Extract the following fields from the document:
- vendor: The business/company name
- date: The document date in YYYY-MM-DD format
- subtotal: The subtotal amount before tax (null if not present)
- tax: The tax amount (null if not present)
- total: The total amount
- currency: The currency code (default USD)
- category: One of: office_supplies, food_dining, travel, utilities, services, hardware, software, rent, insurance, medical, other
- payment_terms: Payment terms like "Net 30" (null if not present)
- line_items: Array of items, each with: description, quantity, unit_price, amount
- confidence: Your confidence score from 0.0 to 1.0 in the overall extraction accuracy

Return ONLY valid JSON in this exact format:
{
  "vendor": "string",
  "date": "YYYY-MM-DD",
  "subtotal": number | null,
  "tax": number | null,
  "total": number,
  "currency": "USD",
  "category": "string",
  "payment_terms": "string" | null,
  "line_items": [
    {
      "description": "string",
      "quantity": number,
      "unit_price": number,
      "amount": number
    }
  ],
  "confidence": number
}

If you cannot read part of the document, still extract what you can and lower the confidence score. Always return valid JSON.`;

export async function processDocument(
  file: File
): Promise<ProcessedDocument> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OpenAI API key not configured. Set OPENAI_API_KEY in your environment."
    );
  }

  // Convert file to base64
  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const mimeType = file.type || "image/jpeg";

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all data from this invoice/receipt document. Return JSON only.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64}`,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("OpenAI API error:", err);
    throw new Error(
      `AI processing failed: ${err.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No response from AI model");
  }

  // Parse the JSON response (handle markdown code blocks)
  let jsonStr = content.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    console.error("Failed to parse AI response:", content);
    throw new Error("AI returned invalid data format");
  }

  const lineItems: LineItem[] = (parsed.line_items || []).map(
    (item: Record<string, unknown>) => ({
      description: String(item.description || ""),
      quantity: Number(item.quantity || 1),
      unitPrice: Number(item.unit_price || 0),
      amount: Number(item.amount || 0),
    })
  );

  const result: ProcessedDocument = {
    id: crypto.randomUUID(),
    fileName: file.name,
    vendor: parsed.vendor || "Unknown",
    date: parsed.date || new Date().toISOString().split("T")[0],
    subtotal: parsed.subtotal ?? null,
    tax: parsed.tax ?? null,
    total: Number(parsed.total || 0),
    currency: parsed.currency || "USD",
    category: parsed.category || "other",
    paymentTerms: parsed.payment_terms || null,
    lineItems,
    confidence: Math.min(1, Math.max(0, Number(parsed.confidence || 0.8))),
    rawResponse: parsed,
    processedAt: new Date().toISOString(),
  };

  return result;
}
