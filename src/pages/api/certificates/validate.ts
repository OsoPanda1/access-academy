// src/pages/api/certificates/validate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../../services/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { hash } = req.query;

    if (!hash || typeof hash !== "string") {
      return res.status(400).json({ error: "Debe proporcionar un certificate_hash válido." });
    }

    const { data, error } = await supabaseClient
      .from("certificates")
      .select("user_name, course_name, issued_at, is_valid")
      .eq("certificate_hash", hash)
      .single();

    if (error || !data) {
      return res.status(404).json({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Certificado no encontrado o inválido."
      });
    }

    if (!data.is_valid) {
      return res.status(200).json({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Certificado revocado o expirado."
      });
    }

    return res.status(200).json({
      valid: true,
      institution: "Universidad TAMV – UTAMV",
      user_name: data.user_name,
      course_name: data.course_name,
      issued_at: data.issued_at,
      message: `Este certificado UTAMV es auténtico y válido para ${data.user_name}.`
    });
  } catch (err) {
    console.error("Error en validación:", err);
    return res.status(500).json({ error: "Error interno en la validación académica." });
  }
}
