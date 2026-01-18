import React, { useState } from "react";

const ValidateCertificate: React.FC = () => {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/certificates/validate?hash=${hash}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Error en la validación académica." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-500 p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-300 tracking-wide mb-6">
          Validación Académica UTAMV
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Ingrese el <span className="font-semibold text-blue-400">certificate_hash</span> para verificar la autenticidad de su diploma.
        </p>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Ingrese el hash del certificado..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-gray-200 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleValidate}
            disabled={loading || !hash}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
          >
            {loading ? "Validando..." : "Validar"}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-6 rounded-xl border border-gray-700 bg-black/40 text-gray-200">
            {result.valid ? (
              <>
                <h2 className="text-2xl font-bold text-green-400 mb-4">✅ Certificado Válido</h2>
                <p><span className="font-semibold">Institución:</span> {result.institution}</p>
                <p><span className="font-semibold">Alumno:</span> {result.user_name}</p>
                <p><span className="font-semibold">Programa:</span> {result.course_name}</p>
                <p><span className="font-semibold">Emitido:</span> {new Date(result.issued_at).toLocaleString()}</p>
                {result.valid_until && (
                  <p><span className="font-semibold">Válido hasta:</span> {new Date(result.valid_until).toLocaleString()}</p>
                )}
                <p className="mt-4 text-blue-300 italic">
                  Este diploma UTAMV ha sido verificado con firma digital quantum y holograma institucional.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-400 mb-4">❌ Certificado Inválido</h2>
                <p>{result.message || result.error}</p>
              </>
            )}
          </div>
        )}
      </div>

      <footer className="mt-10 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} Universidad TAMV – UTAMV.  
        <br /> Validación académica con liderazgo y seriedad institucional.
      </footer>
    </div>
  );
};

export default ValidateCertificate;
