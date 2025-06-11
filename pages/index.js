import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateCourse() {
    setLoading(true);
    setCourse("Generando curso, espera un momento...");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setCourse(data.course);
    } catch (error) {
      setCourse("Error al generar el curso.");
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Generador de Cursos con IA</h1>
      <input
        className="border p-2 w-full mb-4 rounded"
        type="text"
        placeholder="Introduce el tema del curso"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        disabled={loading || !topic}
        onClick={generateCourse}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generando..." : "Generar curso"}
      </button>
      <pre className="whitespace-pre-wrap mt-6 bg-white p-4 rounded shadow max-h-[400px] overflow-auto">
        {course}
      </pre>
    </main>
  );
}