import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const apiKey = process.env.GEMINI_API_KEY;
    const endpoint = process.env.GEMINI_ENDPOINT;

    if (!apiKey || !endpoint) {
      return res.status(500).json({ error: "GEMINI_API_KEY or GEMINI_ENDPOINT not configured" });
    }

    // Proxy request to Gemini endpoint. The expected request/response shape
    // depends on the provider; adjust headers/body as needed for your setup.
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: "gemini-1.5", input: prompt }),
    });

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Gemini proxy error:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
});

export default router;
