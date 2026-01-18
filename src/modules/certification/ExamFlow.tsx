import React, { useState } from "react";
import FinalExam from "../course/final-exam/FinalExam";
import Certificate from "../certification/Certificate";
import { issueCertificate } from "../certification/CertificateService";

interface ExamFlowProps {
  userId: string;   // ID real del usuario autenticado
  userName: string; // Nombre validado en backend
}

const ExamFlow: React.FC<ExamFlowProps> = ({ userId, userName }) => {
  const [passed, setPassed] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExamFinish = async (score: number, total: number) => {
    const percentage = (score / total) * 100;

    if (percentage >= 80) {
      try {
        const cert = await issueCertificate({
          userId,
          userName,
          courseName: "Programa Profesional de Marketing Digital con IA",
          completionDate: new Date()
        });

        setPassed(true);
        setCertificateData(cert);
      } catch (err: any) {
        setError("No se pudo emitir el certificado. Ya existe uno válido o hubo un error académico.");
        console.error("Error al emitir certificado:", err);
      }
    } else {
      setError("No alcanzaste el mínimo requerido (80%). Repasa los temas y vuelve a intentarlo.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {!passed ? (
        <>
          <FinalExam questions={[]} onFinish={handleExamFinish} />
          {error && (
            <p className="mt-4 text-red-600 font-semibold text-center">
              {error}
            </p>
          )}
        </>
      ) : certificateData ? (
        <Certificate
          userName={certificateData.userName}
          courseName={certificateData.courseName}
          completionDate={certificateData.completionDate}
          certificateHash={certificateData.certificateHash}
        />
      ) : (
        <p className="text-red-600 text-center">
          Error: no se pudo generar el certificado académico.
        </p>
      )}
    </div>
  );
};

export default ExamFlow;
