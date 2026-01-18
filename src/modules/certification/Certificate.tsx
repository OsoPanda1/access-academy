import React from "react";

const Certificate: React.FC<{ userName: string; certificateHash: string }> = ({ userName, certificateHash }) => {
  return (
    <div className="p-6 border-4 border-blue-600 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center">Certificado Profesional Premium</h1>
      <p className="mt-4 text-center">Otorgado a: <strong>{userName}</strong></p>
      <p className="mt-2 text-center">Por completar el curso de Marketing Digital con IA</p>
      <p className="mt-4 text-center">Firma Digital Quantum: {certificateHash}</p>
      <img src="/holograms/tamv-hologram.svg" alt="Holograma TAMV" className="mx-auto mt-6 w-32" />
    </div>
  );
};

export default Certificate;
