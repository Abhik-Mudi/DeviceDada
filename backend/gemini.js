// Thin wrapper around the Gemini REST API.
// The API key is read from the GEMINI_API_KEY environment variable and never
// leaves the server. Do NOT hardcode the key here or expose it to the client.

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function buildPrompt(answers) {
  return [
    "You are DeviceDada, a neutral, data-driven gadget advisor for non-technical buyers.",
    "Based on the user's quiz answers below, recommend 3 to 4 real, currently available devices.",
    "Explain technical terms in plain language.",
    "",
    "User answers (JSON):",
    JSON.stringify(answers, null, 2),
    "",
    "Respond with ONLY valid JSON (no markdown fences) matching this schema:",
    JSON.stringify(
      {
        recommendations: [
          {
            id: "short-kebab-case-id",
            name: "Full device name",
            category: "Phone | Laptop | Tablet | Audio",
            price: "Approximate price with currency symbol",
            specs: ["3 short key specs"],
            tag: "Best Value | Best Camera | Best for Gaming | etc",
            badge: "1-3 word standout label",
            reason: "One simple sentence on why it fits this user.",
          },
        ],
      },
      null,
      2
    ),
  ].join("\n");
}

function extractJson(text) {
  // Strip optional markdown fences and parse the first JSON object found.
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in model response.");
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function getRecommendations(answers) {
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: buildPrompt(answers) }] }],
      generationConfig: { temperature: 0.7, responseMimeType: "application/json" },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${detail}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini.");
  }

  const parsed = extractJson(text);
  return Array.isArray(parsed.recommendations) ? parsed.recommendations : [];
}
