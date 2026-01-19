import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      
      if (!sessionId) {
        setStatus("error");
        setMessage("No se encontró información de la sesión de pago.");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { session_id: sessionId },
        });

        if (error) throw error;

        if (data.success) {
          setStatus("success");
          setMessage("¡Tu pago ha sido procesado exitosamente! Ya tienes acceso al curso Master 360 Elite.");
        } else {
          setStatus("error");
          setMessage(data.message || "No se pudo verificar el pago.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setStatus("error");
        setMessage("Error al verificar el pago. Por favor contacta soporte.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-slate-100 mb-2">
              Verificando pago...
            </h1>
            <p className="text-slate-400">
              Estamos confirmando tu transacción con Stripe.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">
              ¡Pago Exitoso!
            </h1>
            <p className="text-slate-400 mb-6">{message}</p>
            <Button 
              onClick={() => navigate("/curso")}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Ir al Curso
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">
              Error en el Pago
            </h1>
            <p className="text-slate-400 mb-6">{message}</p>
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full"
            >
              Volver al Inicio
            </Button>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            © 2026 Universidad TAMV – UTAMV
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
