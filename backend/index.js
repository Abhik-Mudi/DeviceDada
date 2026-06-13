import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getRecommendations, compareDevices } from "./gemini.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Takes the quiz answers and returns AI-generated device recommendations.
app.post("/api/recommend", async (req, res) => {
  try {
    const answers = req.body?.answers;
    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ error: "Missing 'answers' object in request body." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Server is not configured: GEMINI_API_KEY is missing.",
      });
    }

    const recommendations = await getRecommendations(answers);
    return res.json({ recommendations });
  } catch (err) {
    console.error("Recommendation error:", err);
    return res.status(502).json({ error: "Failed to generate recommendations." });
  }
});

// Takes an array of device names and returns an AI-generated comparison.
app.post("/api/compare", async (req, res) => {
  try {
    const devices = req.body?.devices;
    if (!Array.isArray(devices) || devices.length < 2) {
      return res.status(400).json({ error: "Please provide at least two devices in the 'devices' array." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Server is not configured: GEMINI_API_KEY is missing.",
      });
    }

    const comparisonResult = await compareDevices(devices);
    return res.json(comparisonResult);
  } catch (err) {
    console.error("Comparison error:", err);
    return res.status(502).json({ error: "Failed to generate comparison." });
  }
});

app.listen(PORT, () => {
  console.log(`DeviceDada backend listening on http://localhost:${PORT}`);
});
