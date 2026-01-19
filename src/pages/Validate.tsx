import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle, Award, Shield, Loader2 } from "lucide-react";
import hologramImage from "@/assets/hologram-utamv.jpg";

interface ValidationResult {
  valid: boolean;
  institution: string;
  certificate_number?: string;
  full_name?: string;
  course_name?: string;
  issued_at?: string;
  certificate_hash?: string;
  status?: string;
  message: string;
}

const Validate = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState<"number" | "hash">("number");

  const handleValidate = async () => {
    if (!searchValue.trim()) return;
    
    setLoading(true);
    setResult(null);

    try {
      const params = searchType === "number" 
        ? `certificate_number=${encodeURIComponent(searchValue)}`
        : `hash=${encodeURIComponent(searchValue)}`;

      const { data, error } = await supabase.functions.invoke("validate-certificate", {
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Use fetch directly for GET request with query params
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-certificate?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      setResult(responseData);
    } catch (err) {
      console.error("Error validating:", err);
      setResult({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Error al conectar con el servidor de validación."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-wide">
            Universidad TAMV – UTAMV
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sistema de Validación Académica Institucional
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Award className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-100 mb-2">
              Validación de Certificados
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Verifique la autenticidad de cualquier certificado emitido por UTAMV 
              ingresando el número de certificado o el hash de verificación.
            </p>
          </div>

          {/* Search Type Toggle */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setSearchType("number")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                searchType === "number"
                  ? "bg-primary text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Número de Certificado
            </button>
            <button
              onClick={() => setSearchType("hash")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                searchType === "hash"
                  ? "bg-primary text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Hash de Verificación
            </button>
          </div>

          {/* Search Input */}
          <div className="flex gap-4 mb-8">
            <Input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchType === "number" ? "Ej: TAMV-ABC12345" : "Ingrese el hash de verificación"}
              className="flex-1 bg-slate-800/50 border-slate-700 text-slate-100"
              onKeyDown={(e) => e.key === "Enter" && handleValidate()}
            />
            <Button 
              onClick={handleValidate} 
              disabled={loading || !searchValue.trim()}
              className="px-6"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Validar
                </>
              )}
            </Button>
          </div>

          {/* Result */}
          {result && (
            <div className={`rounded-2xl border p-6 ${
              result.valid 
                ? "bg-emerald-950/30 border-emerald-500/50" 
                : "bg-red-950/30 border-red-500/50"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  result.valid ? "bg-emerald-500/20" : "bg-red-500/20"
                }`}>
                  {result.valid ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-2 ${
                    result.valid ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {result.valid ? "✓ Certificado Válido" : "✗ Certificado Inválido"}
                  </h3>
                  
                  {result.valid ? (
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-300">
                        <span className="text-slate-500">Institución:</span>{" "}
                        {result.institution}
                      </p>
                      <p className="text-slate-300">
                        <span className="text-slate-500">Alumno:</span>{" "}
                        {result.full_name}
                      </p>
                      <p className="text-slate-300">
                        <span className="text-slate-500">Programa:</span>{" "}
                        {result.course_name}
                      </p>
                      <p className="text-slate-300">
                        <span className="text-slate-500">Número:</span>{" "}
                        {result.certificate_number}
                      </p>
                      <p className="text-slate-300">
                        <span className="text-slate-500">Fecha de Emisión:</span>{" "}
                        {result.issued_at && new Date(result.issued_at).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                      {result.certificate_hash && (
                        <p className="text-slate-300 break-all">
                          <span className="text-slate-500">Hash:</span>{" "}
                          <code className="text-xs bg-slate-800 px-2 py-1 rounded">
                            {result.certificate_hash}
                          </code>
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-400">{result.message}</p>
                  )}
                </div>
                
                {result.valid && (
                  <div className="hidden md:block">
                    <img 
                      src={hologramImage} 
                      alt="Holograma UTAMV" 
                      className="w-24 h-24 rounded-full border-2 border-primary/50 opacity-80"
                    />
                  </div>
                )}
              </div>

              {result.valid && (
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-500 text-center">
                    Este certificado ha sido verificado con firma digital institucional UTAMV.
                    La validación es oficial y puede ser utilizada para fines laborales y académicos.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Institutional Info */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p className="mb-2">
            <strong className="text-slate-400">¿Necesita verificar múltiples certificados?</strong>
          </p>
          <p>
            Contacte a nuestra oficina de registros académicos para validaciones institucionales.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Universidad TAMV – UTAMV | 
        Sedes: Ciudad de México · Buenos Aires
      </footer>
    </div>
  );
};

export default Validate;
