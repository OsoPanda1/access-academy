import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Award, Loader2 } from "lucide-react";

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correct_option: number;
  topic: string;
}

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPassed: () => void;
}

const ExamModal = ({ isOpen, onClose, onPassed }: ExamModalProps) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [examPassed, setExamPassed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadQuestions();
    }
  }, [isOpen]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("exam_questions")
        .select("*")
        .order("topic");

      if (error) throw error;

      // Shuffle and take 10 questions
      const shuffled = (data || []).sort(() => Math.random() - 0.5).slice(0, 10);
      setQuestions(shuffled as ExamQuestion[]);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setShowResult(false);
    } catch (err) {
      console.error("Error loading questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_option;

    setAnswers([...answers, { questionId: currentQuestion.id, correct: isCorrect }]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Exam finished
      finishExam([...answers, { questionId: currentQuestion.id, correct: isCorrect }]);
    }
  };

  const finishExam = async (finalAnswers: { questionId: string; correct: boolean }[]) => {
    const score = finalAnswers.filter((a) => a.correct).length;
    const total = finalAnswers.length;
    const passed = score >= Math.ceil(total * 0.7); // 70% to pass

    setExamPassed(passed);
    setShowResult(true);

    // Save result to database
    if (user) {
      try {
        await supabase.from("exam_results").insert({
          user_id: user.id,
          score,
          total_questions: total,
          passed,
        });
      } catch (err) {
        console.error("Error saving exam result:", err);
      }
    }

    if (passed) {
      onPassed();
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const score = answers.filter((a) => a.correct).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Examen Final - Master 360 Elite
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : showResult ? (
          <div className="py-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              examPassed ? "bg-emerald-500/20" : "bg-red-500/20"
            }`}>
              {examPassed ? (
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              ) : (
                <XCircle className="w-10 h-10 text-red-400" />
              )}
            </div>

            <h3 className={`text-2xl font-bold mb-2 ${
              examPassed ? "text-emerald-400" : "text-red-400"
            }`}>
              {examPassed ? "¡Felicidades!" : "No aprobado"}
            </h3>

            <p className="text-slate-400 mb-4">
              Obtuviste {score} de {questions.length} respuestas correctas 
              ({Math.round((score / questions.length) * 100)}%)
            </p>

            {examPassed ? (
              <p className="text-slate-300 mb-6">
                Has aprobado el examen final. ¡Ya puedes generar tu certificado!
              </p>
            ) : (
              <p className="text-slate-300 mb-6">
                Necesitas al menos 70% para aprobar. Puedes intentarlo de nuevo.
              </p>
            )}

            <div className="flex gap-4 justify-center">
              {!examPassed && (
                <Button onClick={loadQuestions} variant="outline">
                  Intentar de Nuevo
                </Button>
              )}
              <Button onClick={onClose}>
                {examPassed ? "Continuar" : "Cerrar"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-4">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Pregunta {currentIndex + 1} de {questions.length}</span>
                <span>{currentQuestion?.topic}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-slate-100 mb-4">
                {currentQuestion?.question}
              </h4>

              <div className="space-y-3">
                {currentQuestion?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                      selectedAnswer === index
                        ? "border-primary bg-primary/10 text-slate-100"
                        : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <Button
                onClick={handleAnswer}
                disabled={selectedAnswer === null}
              >
                {currentIndex < questions.length - 1 ? "Siguiente" : "Finalizar"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExamModal;
