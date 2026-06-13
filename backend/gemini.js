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
function buildComparePrompt(devices) {
  return [
    "You are DeviceDada, a neutral, data-driven gadget advisor.",
    "Compare the following devices side-by-side in a table-like format for non-technical buyers.",
    "Explain technical terms in plain language.",
    "",
    "CRITICAL: Use the EXACT device names provided below as keys in the 'values' object and for the 'name' field in 'summaries'. Do not shorten or change them.",
    "",
    "Devices to compare:",
    devices.map(d => `"${d}"`).join(", "),
    "",
    "Respond with ONLY valid JSON (no markdown fences) matching this schema:",
...

    JSON.stringify(
      {
        comparison: [
          {
            feature: "Feature Name (e.g. Display, Battery, Performance)",
            explanation: "Simple explanation of what this feature means for the user.",
            values: {
              "Device Name 1": "Specs/Value for Device 1",
              "Device Name 2": "Specs/Value for Device 2",
            },
            better: "Device Name that wins in this category, or 'neutral'",
          },
        ],
        summaries: [
          {
            name: "Device Name",
            pros: ["3 simple pros"],
            cons: ["2-3 simple cons"],
            verdict: "One sentence final judgment.",
          },
        ],
      },
      null,
      2
    ),
  ].join("\n");
}

export async function compareDevices(devices) {
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: buildComparePrompt(devices) }] }],
      generationConfig: { temperature: 0.5, responseMimeType: "application/json" },
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

  return extractJson(text);
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
