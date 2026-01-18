import React, { useState, useEffect } from "react";

const FinalExam: React.FC<{ questions: any[] }> = ({ questions }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hora
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (qId: string, answer: string, correct: string) => {
    if (answer === correct) setScore(prev => prev + 1);
  };

  const passed = (score / questions.length) * 100 >= 80;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Examen Final</h1>
      <p>Tiempo restante: {Math.floor(timeLeft / 60)} min</p>
      {questions.map((q, i) => (
        <div key={i} className="mt-4">
          <p>{q.text}</p>
          {q.options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => handleAnswer(q.id, opt, q.correct)}
              className="mr-2 bg-gray-200 px-3 py-1 rounded"
            >
              {opt}
            </button>
          ))}
        </div>
      ))}
      <p className="mt-6 font-semibold">
        Resultado: {score}/{questions.length} → {passed ? "Aprobado ✅" : "No aprobado ❌"}
      </p>
    </div>
  );
};

export default FinalExam;
