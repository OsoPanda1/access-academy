import React from "react";
import { jsPDF } from "jspdf";

interface ValidationPrintProps {
  result: {
    valid: boolean;
    institution: string;
    user_name?: string;
    course_name?: string;
    issued_at?: string;
    valid_until?: string | null;
    message: string;
  };
}

const ValidationPrint: React.FC<ValidationPrintProps> = ({ result }) => {
  const handlePrint = () => {
    const doc = new jsPDF();

    // Encabezado institucional
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Universidad TAMV – UTAMV", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text("Constancia de Validación Académica", 105, 35, { align: "center" });

    doc.setDrawColor(0, 102, 204);
    doc.line(20, 40, 190, 40);

    // Contenido
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    if (result.valid) {
      doc.text(`✅ Certificado válido`, 20, 60);
      doc.text(`Alumno: ${result.user_name}`, 20, 75);
      doc.text(`Programa: ${result.course_name}`, 20, 90);
      doc.text(`Emitido: ${new Date(result.issued_at!).toLocaleString()}`, 20, 105);
      if (result.valid_until) {
        doc.text(`Válido hasta: ${new Date(result.valid_until).toLocaleString()}`, 20, 120);
      }
      doc.text(`Institución: ${result.institution}`, 20, 135);
      doc.text(`Mensaje: ${result.message}`, 20, 150);
    } else {
      doc.text(`❌ Certificado inválido`, 20, 60);
      doc.text(`Institución: ${result.institution}`, 20, 75);
      doc.text(`Mensaje: ${result.message}`, 20, 90);
    }

    // Sello institucional
    doc.setFontSize(10);
    doc.text("Firma digital quantum UTAMV", 105, 270, { align: "center" });
    doc.text("Holograma institucional", 105, 280, { align: "center" });

    // Descargar PDF
    doc.save("UTAMV-Validacion-Certificado.pdf");
  };

  return (
    <button
      onClick={handlePrint}
      className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
    >
      Descargar Constancia PDF
    </button>
  );
};

export default ValidationPrint;
