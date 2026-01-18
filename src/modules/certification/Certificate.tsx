import React from "react";

interface CertificateProps {
  userName: string;
  courseName: string;
  completionDate: Date;
  certificateHash: string; // Firma digital quantum
}

const Certificate: React.FC<CertificateProps> = ({ userName, courseName, completionDate, certificateHash }) => {
  const formattedDate = completionDate.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const formattedTime = completionDate.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="p-10 border-8 border-blue-700 rounded-xl shadow-2xl bg-white max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Universidad TAMV – UTAMV</h1>
      
      <p className="text-lg italic mb-4">
        UTAMV se complace en expedir el siguiente certificado a:
      </p>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{userName}</h2>
      
      <p className="text-lg mb-4">
        Tras la culminación exitosa de su <strong>{courseName}</strong>, 
        demostrando excelencia académica y profesional.
      </p>
      
      <p className="text-md text-gray-700 mb-6">
        Fecha de finalización: {formattedDate} – {formattedTime}
      </p>
      
      <div className="mt-10">
        <p className="text-sm text-gray-600">Firma Digital Quantum UTAMV</p>
        <p className="text-xs text-gray-500 mt-2">{certificateHash}</p>
      </div>
      
      <div className="mt-8 flex justify-center">
        <img src="/holograms/tamv-hologram.svg" alt="Holograma UTAMV" className="w-32 h-32" />
      </div>
      
      <p className="mt-6 text-sm text-gray-500 italic">
        Este certificado ha sido registrado en la nube con validez académica y legal en Latinoamérica.
      </p>
    </div>
  );
};

export default Certificate;
