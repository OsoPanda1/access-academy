import React from "react";
import { useCourseContext } from "../../context/CourseContext";
import { aiService } from "../../ai/aiService";

const Lesson1SEO: React.FC = () => {
  const { completeLesson } = useCourseContext();

  const handleFinishLesson = async () => {
    // Genera explicación dinámica con IA
    const aiResponse = await aiService("seoPrompt");
    console.log("IA Response:", aiResponse);

    // Marca la lección como completada
    completeLesson("lesson1");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Lección 1: SEO y Metadatos</h1>
      <p className="mt-4">
        Aprende cómo optimizar campañas digitales con SEO y metadatos actuales.
      </p>
      <button
        onClick={handleFinishLesson}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Terminar Lección
      </button>
    </div>
  );
};

export default Lesson1SEO;
