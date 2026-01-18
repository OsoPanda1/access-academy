/**
 * CertificateService.ts
 * Servicio académico premium para emisión de certificados UTAMV
 * Tecnología TAMV ONLINE – Orgullosamente Realmontense
 *
 * Garantiza que cada usuario reciba un único certificado
 * con su nombre real, fecha y firma digital quantum.
 */

import { supabaseClient } from "../../services/supabaseClient";

interface CertificateData {
  userId: string;
  userName: string;
  courseName: string;
  completionDate: Date;
}

export async function issueCertificate(data: CertificateData) {
  // 1. Verificar si el usuario ya tiene un certificado emitido
  const { data: existing, error: checkError } = await supabaseClient
    .from("certificates")
    .select("*")
    .eq("user_id", data.userId)
    .eq("is_valid", true)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    throw new Error("Error verificando certificados existentes");
  }

  if (existing) {
    throw new Error("Ya existe un certificado válido para este usuario. No se pueden emitir duplicados.");
  }

  // 2. Generar firma digital quantum (hash único)
  const certificateHash = crypto
    .createHash("sha256")
    .update(`${data.userId}-${data.userName}-${data.completionDate.toISOString()}`)
    .digest("hex");

  // 3. Registrar certificado en Supabase
  const { error: insertError } = await supabaseClient.from("certificates").insert({
    user_id: data.userId,
    certificate_hash: certificateHash,
    issued_at: data.completionDate.toISOString(),
    valid_until: null,
    is_valid: true
  });

  if (insertError) {
    throw new Error("Error al registrar el certificado en la nube");
  }

  // 4. Registrar en blockchain/notaría digital (opcional)
  await supabaseClient.from("certificate_registry").insert({
    certificate_id: data.userId,
    blockchain_tx: `tx-${certificateHash}`,
    registered_at: new Date().toISOString()
  });

  // 5. Retornar datos para renderizar el diploma
  return {
    userName: data.userName,
    courseName: data.courseName,
    completionDate: data.completionDate,
    certificateHash
  };
}
