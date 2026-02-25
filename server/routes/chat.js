import express from "express";
import OpenAI from "openai";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Берем ключ прямо в момент запроса
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("Ошибка: OPENAI_API_KEY не найден в .env");
      return res.status(500).json({ error: "API key is not configured" });
    }

    // Создаем клиента внутри функции
    const openai = new OpenAI({
      apiKey: apiKey.trim(),
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Самая стабильная и доступная модель
      messages: [
        { role: "system", content: "Ты помощник MindEasy. Твоя задача — поддерживать пользователя." },
        { role: "user", content: prompt }
      ],
    });

    return res.json({ reply: response.choices[0].message.content });

  } catch (err) {
    console.error("OpenAI Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;