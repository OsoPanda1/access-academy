import React, { useState } from "react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correct: string;
}

const Evaluation: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: string, answer: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.correct === answer) {
      setScore(prev => prev + 1);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Evaluación del Tema</h2>
      {questions.map(q => (
        <div key={q.id} className="mt-4">
          <p>{q.text}</p>
          {q.options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(q.id, opt)}
              className="mr-2 bg-gray-200 px-3 py-1 rounded"
            >
              {opt}
            </button>
          ))}
        </div>
      ))}
      <p className="mt-6 font-semibold">Puntaje: {score}/{questions.length}</p>
    </div>
  );
};

export default Evaluation;
