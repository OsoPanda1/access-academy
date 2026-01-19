import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VALIDATE-CERTIFICATE] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting certificate validation");

    const url = new URL(req.url);
    const hash = url.searchParams.get("hash");
    const certificateNumber = url.searchParams.get("certificate_number");

    if (!hash && !certificateNumber) {
      return new Response(JSON.stringify({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Debe proporcionar un hash o número de certificado para validar."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    let certificateData = null;
    let registryData = null;

    // Search by certificate number first
    if (certificateNumber) {
      logStep("Searching by certificate number", { certificateNumber });
      
      const { data: cert, error: certError } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_number", certificateNumber)
        .maybeSingle();

      if (certError) {
        logStep("Error searching certificate", { error: certError.message });
      }
      
      if (cert) {
        certificateData = cert;
        
        // Also get registry data if exists
        const { data: registry } = await supabase
          .from("certificate_registry")
          .select("*")
          .eq("certificate_id", cert.id)
          .maybeSingle();
        
        registryData = registry;
      }
    }

    // If not found, search by hash in registry
    if (!certificateData && hash) {
      logStep("Searching by hash", { hash });
      
      const { data: registry, error: regError } = await supabase
        .from("certificate_registry")
        .select("*, certificates(*)")
        .eq("certificate_hash", hash)
        .maybeSingle();

      if (regError) {
        logStep("Error searching registry", { error: regError.message });
      }
      
      if (registry) {
        registryData = registry;
        certificateData = registry.certificates;
      }
    }

    if (!certificateData) {
      logStep("Certificate not found");
      return new Response(JSON.stringify({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Certificado no encontrado. Verifique el número o hash proporcionado."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Check if revoked
    if (registryData?.status === "revoked") {
      logStep("Certificate revoked");
      return new Response(JSON.stringify({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Este certificado ha sido revocado."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    logStep("Certificate validated successfully", { 
      certificateNumber: certificateData.certificate_number,
      fullName: certificateData.full_name 
    });

    return new Response(JSON.stringify({
      valid: true,
      institution: "Universidad TAMV – UTAMV",
      certificate_number: certificateData.certificate_number,
      full_name: certificateData.full_name,
      course_name: registryData?.course_name || "Master 360 Elite - Marketing Digital con IA",
      issued_at: certificateData.issued_at,
      certificate_hash: registryData?.certificate_hash || null,
      status: registryData?.status || "valid",
      message: `Este certificado UTAMV es auténtico y válido para ${certificateData.full_name}.`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({
      valid: false,
      institution: "Universidad TAMV – UTAMV",
      error: "Error interno en la validación académica."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
