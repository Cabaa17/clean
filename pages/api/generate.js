// pages/api/generate.js

import OpenAI from "openai";

// Crea instancia de OpenAI usando tu clave de entorno
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: "Falta el tema del curso" });
  }

  try {
    // Prompt profesional para generar un curso serio y actualizado
    const prompt = `
Eres un profesor experto. Crea un curso detallado, claro y actualizado sobre: "${topic}".
El curso debe incluir:
- Introducción
- Módulos con lecciones (3–5 por módulo) y breve descripción
- Actividades prácticas o ejemplos
- Recursos recomendados
Mantén un lenguaje sencillo, con analogías y bien estructurado.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",   // o "gpt-4" si lo tienes disponible
      messages: [
        { role: "system", content: "Eres un docente profesional." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const course = completion.choices[0].message.content;
    return res.status(200).json({ course });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return res.status(500).json({ error: "Error generando el curso" });
  }
}

