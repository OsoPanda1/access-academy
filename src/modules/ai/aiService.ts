/**
 * aiService.ts
 * Servicio académico de Inteligencia Artificial para Access Academy – UTAMV
 * Tecnología TAMV ONLINE – Orgullosamente Realmontense
 *
 * Este módulo conecta las lecciones del curso con la IA,
 * generando explicaciones, ejemplos y retroalimentación en tiempo real.
 */

import { supabaseClient } from "../../services/supabaseClient";

export interface AIResponse {
  title: string;
  explanation: string;
  examples: string[];
  metadata: {
    seo?: string;
    geo?: string;
    ai?: string;
  };
}

/**
 * Función principal que invoca la IA con un prompt académico.
 * @param promptKey Clave del prompt (ej. "seoPrompt", "geoPrompt", "adsPrompt")
 * @returns Respuesta estructurada de la IA
 */
export async function aiService(promptKey: string): Promise<AIResponse> {
  try {
    // Recupera el prompt desde la base de datos o archivo local
    const { data, error } = await supabaseClient
      .from("prompts")
      .select("content")
      .eq("key", promptKey)
      .single();

    if (error) throw error;

    const prompt = data?.content || "Explica el tema solicitado de forma académica.";

    // Aquí iría la llamada real al modelo de IA (ej. OpenAI, Azure, etc.)
    // Simulación de respuesta académica:
    const response: AIResponse = {
      title: "Explicación Académica",
      explanation: `Este módulo aborda el tema ${promptKey} con rigor académico,
      integrando teoría y práctica para formar competencias profesionales.`,
      examples: [
        "Ejemplo 1: Optimización SEO con metadatos actuales.",
        "Ejemplo 2: Estrategia Geo-targeting aplicada a campañas locales.",
        "Ejemplo 3: Publicidad generada con IA y validada en tiempo real."
      ],
      metadata: {
        seo: "Optimización de motores de búsqueda con palabras clave y metadatos.",
        geo: "Segmentación geográfica precisa para audiencias locales.",
        ai: "Respuestas generadas con modelos de lenguaje avanzados."
      }
    };

    return response;
  } catch (err) {
    console.error("Error en aiService:", err);
    return {
      title: "Error",
      explanation: "No se pudo generar la respuesta académica.",
      examples: [],
      metadata: {}
    };
  }
}
