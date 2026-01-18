import React, { useState, useEffect } from "react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correct: string;
}

const FinalExam: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hora en segundos
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<{ [key: string]: string }>({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setFinished(true); // Finaliza automáticamente al expirar tiempo
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (qId: string, answer: string, correct: string) => {
    if (answered[qId]) return; // Evita responder dos veces
    setAnswered(prev => ({ ...prev, [qId]: answer }));
    if (answer === correct) setScore(prev => prev + 1);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const passed = (score / questions.length) * 100 >= 80;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Examen Final – UTAMV</h1>
      <p className="text-center text-gray-700 mb-6">
        Tiempo restante: <span className="font-semibold">{formatTime(timeLeft)}</span>
      </p>

      {!finished ? (
        <>
          {questions.map((q, i) => (
            <div key={q.id} className="mt-6 border-b pb-4">
              <p className="font-semibold mb-2">{i + 1}. {q.text}</p>
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(q.id, opt, q.correct)}
                  disabled={answered[q.id] !== undefined}
                  className={`mr-2 mb-2 px-3 py-1 rounded border ${
                    answered[q.id] === opt
                      ? opt === q.correct
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-red-500 text-white border-red-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
          <div className="text-center mt-6">
            <button
              onClick={() => setFinished(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
            >
              Finalizar Examen
            </button>
          </div>
        </>
      ) : (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Informe Académico</h2>
          <p className="text-lg">Puntaje: <strong>{score}/{questions.length}</strong></p>
          <p className="text-lg">Porcentaje: <strong>{(score / questions.length) * 100}%</strong></p>
          <p className="mt-2 text-lg font-semibold">
            Estado: {passed ? "Aprobado ✅" : "No aprobado ❌"}
          </p>
          {passed && (
            <div className="mt-6 p-4 border rounded bg-green-50">
              <p className="text-green-700 font-bold">
                ¡Felicidades! Has aprobado el examen final con excelencia.
              </p>
              <p className="text-green-600 mt-2">
                Se generará tu certificado digital premium con firma quantum y holograma.
              </p>
            </div>
          )}
          {!passed && (
            <div className="mt-6 p-4 border rounded bg-red-50">
              <p className="text-red-700 font-bold">
                No alcanzaste el mínimo requerido (80%).
              </p>
              <p className="text-red-600 mt-2">
                Te invitamos a repasar los temas y volver a intentarlo.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinalExam;
