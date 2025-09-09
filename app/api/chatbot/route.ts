// app/api/converso/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

// Initialize Gemini client (make sure GEMINI_API_KEY is set in env)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  // Note: in Next.js, throwing at import time may break dev experience;
  // we prefer to check at runtime below and return 500 if missing.
}
console.log(GEMINI_API_KEY);
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Converso app persona & rules (strict: only app-support answers)
const PROJECT_PROFILE = `
You are **Converso Support Assistant**. You MUST follow these rules exactly:

1. Answer ONLY with information that helps users operate, configure, or troubleshoot the Converso application itself (features, UI flows, bookmarks, authentication, deployment, integrations, and common errors).
2. DO NOT answer academic/subject questions (math, physics, history, code tutoring about curriculum topics). If the user asks a subject/learning question, refuse and redirect: "I only handle app support — please open an active Companion session to ask subject-specific questions.".
3. Keep replies concise and actionable. Provide next steps a user can take inside the app where possible (e.g., "open Dashboard → Companions → Start Session").
4. After generating a reply, validate it is app-specific. If any content drifts into subject/academic explanations, rewrite to be app-specific and indicate you rewrote the answer.
5. When describing features, refer to the exact feature names used in the Converso UI: Companion Builder, Sessions, Bookmarks, Topic Filters, Account (Clerk), Deployment (Vercel), Database (Supabase).

End of persona.
`;

/** Builds the single prompt string we send to Gemini (system + user) */
function buildPrompt(userMessage: string) {
  return `${PROJECT_PROFILE}\n\nUser message: ${userMessage}\n\nRules enforcement: If this message contains learning/subject requests, refuse and redirect the user to their active Companion. Otherwise answer as Converso Support.`;
}

/** Call Gemini (non-streaming) and return assistant text */
async function callGemini(prompt: string) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not set in environment.");

  // Model: gemini-2.5-flash (fast & good for assistant-style replies). Change if needed.
  const model = "gemini-2.5-flash";

  // The JavaScript GenAI SDK accepts `contents` and returns a response
  // whose `.text` property contains the model output. See SDK docs for examples.
  const resp = await ai.models.generateContent({
    model,
    // For simple text replies a plain string is accepted as `contents`.
    contents: prompt,
    // you can tune temperature, maxOutputTokens, etc. by adding additional params if desired.
    // temperature: 0.05,
    // maxOutputTokens: 800,
  });

  // The SDK response object exposes generated text on `.text`
  // (the JS SDK and docs show `.text` on the response). If structure differs, adapt accordingly.
  // Reference: Gemini generateContent examples & SDK docs. :contentReference[oaicite:2]{index=2}
  const assistantText = (resp as any)?.text ?? "";

  return assistantText;
}

/** Validator using Gemini to ensure replies are app-specific and to produce corrected reply if needed */
async function validateAndRewriteIfNeeded(reply: string) {
  if (!GEMINI_API_KEY) return { valid: true, corrected: reply };

  const validatorPrompt = `You are a strict validator for Converso Support responses.

Input: ${JSON.stringify(reply)}

Task: If the input reply contains any academic/subject teaching, examples, problem solving, or off-topic educational material, produce a corrected, rewritten reply that is strictly Converso-app support only (short, actionable). Otherwise, return the original reply unchanged.

Output format: JSON only with these keys: {"valid": true | false, "corrected": "<rewritten reply>"}. Do NOT add extra commentary.`;

  const model = "gemini-2.5-flash";

  try {
    const res = await ai.models.generateContent({
      model,
      contents: validatorPrompt,
      // use a lower temperature to make validator deterministic
      // temperature: 0.0,
      // maxOutputTokens: 300,
    });

    const raw = (res as any)?.text ?? "";

    // Try to extract JSON substring and parse it.
    const jsonStart = raw.indexOf("{");
    const jsonText = jsonStart >= 0 ? raw.slice(jsonStart) : raw;

    try {
      const parsed = JSON.parse(jsonText);
      return {
        valid: Boolean(parsed.valid),
        corrected: parsed.corrected ?? reply,
      };
    } catch (parseErr) {
      // If parsing fails, return safe result (assume valid)
      return { valid: true, corrected: reply };
    }
  } catch (err) {
    // Validator failed — do fail-safe: return original reply as valid
    return { valid: true, corrected: reply };
  }
}

export async function POST(req: Request) {
  try {
    // Clerk authentication helper
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Server not configured: GEMINI_API_KEY missing" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message = String(body?.message ?? "").trim();
    if (!message) {
      return NextResponse.json({ error: "message required" }, { status: 400 });
    }

    // Build prompt (system instructions + user message)
    const prompt = buildPrompt(message);

    // Primary reply from Gemini
    const assistantText = await callGemini(prompt);

    // Validate & rewrite if needed (ensures no subject/academic content leaked)
    const validation = await validateAndRewriteIfNeeded(assistantText);
    const finalReply = validation.valid ? assistantText : validation.corrected;

    // Respond to client
    return NextResponse.json({ reply: finalReply });
  } catch (err: any) {
    console.error("/api/converso (Gemini) error:", err);
    return NextResponse.json({ error: err?.message ?? "server error" }, { status: 500 });
  }
}
