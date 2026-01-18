// src/pages/api/certificates/validate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../../services/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { hash } = req.query;

    if (!hash || typeof hash !== "string") {
      return res.status(400).json({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        error: "Debe proporcionar un certificate_hash válido."
      });
    }

    // Buscar certificado en la base con blindaje académico
    const { data, error } = await supabaseClient
      .from("certificates")
      .select("user_name, course_name, issued_at, valid_until, is_valid")
      .eq("certificate_hash", hash)
      .single();

    if (error || !data) {
      return res.status(404).json({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Certificado no encontrado o inválido."
      });
    }

    // Validación de estado
    if (!data.is_valid) {
      return res.status(200).json({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Certificado revocado o expirado."
      });
    }

    // Validación de fecha de expiración
    if (data.valid_until && new Date(data.valid_until) < new Date()) {
      return res.status(200).json({
        valid: false,
        institution: "Universidad TAMV – UTAMV",
        message: "Certificado expirado por fecha de validez."
      });
    }

    // Respuesta oficial académica
    return res.status(200).json({
      valid: true,
      institution: "Universidad TAMV – UTAMV",
      user_name: data.user_name,
      course_name: data.course_name,
      issued_at: data.issued_at,
      valid_until: data.valid_until || null,
      message: `Este certificado UTAMV es auténtico y válido para ${data.user_name}.`
    });
  } catch (err) {
    console.error("Error en validación:", err);
    return res.status(500).json({
      valid: false,
      institution: "Universidad TAMV – UTAMV",
      error: "Error interno en la validación académica."
    });
  }
}
