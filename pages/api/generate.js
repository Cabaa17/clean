export default async function handler(req, res) {
  const { topic } = req.body;

  const course = `
Curso básico sobre: ${topic.toUpperCase()}

1. Introducción a ${topic}
2. Conceptos clave
3. Ejemplos prácticos
4. Recursos recomendados
5. Conclusión

(Este es un curso de demostración sin uso de IA real)
  `;

  res.status(200).json({ course });
}
