import { createClient } from "jsr:@supabase/supabase-js@2";

const kc_services = [
  "Desarrollo Web de Alta Gama",
  "Automatización de Procesos",
  "Sistemas de Ventas",
  "Soporte Técnico / Ecosistema Integral",
];
// Orígenes de desarrollo local (python -m http.server, Live Server, npx serve).
// Producción: kc_prodOrigins; dominios extra con el secreto ALLOWED_ORIGINS.
const kc_devOrigins = [
  "http://localhost:8000", "http://127.0.0.1:8000",
  "http://localhost:5500", "http://127.0.0.1:5500",
  "http://localhost:3000", "http://127.0.0.1:3000",
];
const kc_prodOrigins = ["https://kodastudio-web.vercel.app"];
const kc_jsonHeaders = { "Content-Type": "application/json; charset=utf-8", "Vary": "Origin" };
const kc_reply = (status: number, data: Record<string, unknown>, origin = "", allowed = false) => {
  const headers = new Headers(kc_jsonHeaders);
  if (allowed && origin) headers.set("Access-Control-Allow-Origin", origin);
  return new Response(JSON.stringify(data), { status, headers });
};
const kc_htmlEntities: Record<string, string> = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
};
const kc_escapeHtml = (value: string) => value.replace(/[&<>"']/g, (kc_char) => kc_htmlEntities[kc_char] ?? kc_char);

Deno.serve(async (request) => {
  const kc_origin = request.headers.get("origin") ?? "";
  const kc_allowedOrigins = [
    ...kc_devOrigins,
    ...kc_prodOrigins,
    ...(Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((kc_item) => kc_item.trim()).filter(Boolean),
  ];
  const kc_isAllowed = Boolean(kc_origin && kc_allowedOrigins.includes(kc_origin));
  const kc_headers = new Headers(kc_jsonHeaders);
  if (kc_isAllowed) {
    kc_headers.set("Access-Control-Allow-Origin", kc_origin);
    kc_headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    kc_headers.set("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");
    kc_headers.set("Access-Control-Max-Age", "86400");
  }
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: kc_headers });
  if (request.method !== "POST") return kc_reply(405, { ok: false, error: "method" }, kc_origin, kc_isAllowed);
  if (kc_origin && !kc_isAllowed) return kc_reply(403, { ok: false, error: "origin" });
  const kc_length = Number(request.headers.get("content-length") ?? 0);
  if (kc_length > 20 * 1024) return kc_reply(413, { ok: false, error: "size" }, kc_origin, kc_isAllowed);

  let kc_body: Record<string, unknown>;
  try {
    const kc_raw = await request.text();
    if (new TextEncoder().encode(kc_raw).byteLength > 20 * 1024) return kc_reply(413, { ok: false, error: "size" }, kc_origin, kc_isAllowed);
    kc_body = JSON.parse(kc_raw);
    if (!kc_body || typeof kc_body !== "object" || Array.isArray(kc_body)) throw new Error("invalid body");
  } catch {
    return kc_reply(400, { ok: false, error: "validation", fields: { client_name: "El formulario no tiene un formato válido." } }, kc_origin, kc_isAllowed);
  }
  if (kc_body.kc_website_hp != null && (typeof kc_body.kc_website_hp !== "string" || kc_body.kc_website_hp.trim())) {
    return kc_reply(200, { ok: true }, kc_origin, kc_isAllowed);
  }

  const kc_name = typeof kc_body.client_name === "string" ? kc_body.client_name.trim().replace(/\s+/g, " ") : "";
  const kc_email = typeof kc_body.client_email === "string" ? kc_body.client_email.trim() : "";
  const kc_message = typeof kc_body.project_message === "string" ? kc_body.project_message.trim() : "";
  const kc_fields: Record<string, string> = {};
  if (kc_name.length < 2 || kc_name.length > 120) kc_fields.client_name = "Escribe un nombre de 2 a 120 caracteres.";
  if (kc_email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kc_email)) kc_fields.client_email = "Escribe un correo con formato válido.";
  if (kc_message.length < 10 || kc_message.length > 5000) kc_fields.project_message = "Describe tu proyecto en 10 a 5000 caracteres.";
  let kc_selected: string[] = [];
  let kc_invalidServiceType = false;
  if (Array.isArray(kc_body.selected_services)) {
    kc_invalidServiceType = kc_body.selected_services.some((kc_item) => typeof kc_item !== "string");
    kc_selected = kc_body.selected_services.filter((kc_item): kc_item is string => typeof kc_item === "string");
  }
  else if (typeof kc_body.selected_services === "string") kc_selected = kc_body.selected_services.split(",").map((kc_item) => kc_item.trim()).filter(Boolean);
  else if (kc_body.selected_services != null) kc_fields.selected_services = "Selecciona servicios válidos.";
  if (kc_invalidServiceType || kc_selected.length > 4 || kc_selected.some((kc_item) => !kc_services.includes(kc_item)) || new Set(kc_selected).size !== kc_selected.length) {
    kc_fields.selected_services = "Selecciona hasta cuatro servicios válidos.";
  }
  if (Object.keys(kc_fields).length) return kc_reply(400, { ok: false, error: "validation", fields: kc_fields }, kc_origin, kc_isAllowed);

  const kc_forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const kc_salt = Deno.env.get("IP_HASH_SALT") ?? "";
  const kc_hashBytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${kc_forwarded}${kc_salt}`));
  const kc_ipHash = Array.from(new Uint8Array(kc_hashBytes), (kc_byte) => kc_byte.toString(16).padStart(2, "0")).join("");
  const kc_url = Deno.env.get("SUPABASE_URL");
  const kc_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!kc_url || !kc_key) {
    console.error("Falta configuración de Supabase.");
    return kc_reply(500, { ok: false, error: "server" }, kc_origin, kc_isAllowed);
  }
  const kc_supabase = createClient(kc_url, kc_key, { auth: { persistSession: false, autoRefreshToken: false } });
  const kc_limit = Number(Deno.env.get("RATE_LIMIT_MAX") ?? "5");
  const { data: kc_count, error: kc_limitError } = await kc_supabase.rpc("kc_count_recent_requests", { p_ip_hash: kc_ipHash, p_window: "10 minutes" });
  if (kc_limitError) {
    console.error("Error de límite de solicitudes:", kc_limitError);
    return kc_reply(500, { ok: false, error: "server" }, kc_origin, kc_isAllowed);
  }
  if (Number(kc_count) >= (Number.isFinite(kc_limit) && kc_limit > 0 ? kc_limit : 5)) return kc_reply(429, { ok: false, error: "rate_limit" }, kc_origin, kc_isAllowed);

  const { data: kc_requestId, error: kc_submitError } = await kc_supabase.rpc("kc_submit_contact_request", {
    p_full_name: kc_name,
    p_email: kc_email,
    p_message: kc_message,
    p_service_names: kc_selected,
    p_ip_hash: kc_ipHash,
    p_user_agent: request.headers.get("user-agent") ?? "",
  });
  if (kc_submitError || !kc_requestId) {
    console.error("Error al guardar solicitud:", kc_submitError);
    return kc_reply(500, { ok: false, error: "server" }, kc_origin, kc_isAllowed);
  }

  const kc_resendKey = Deno.env.get("RESEND_API_KEY");
  // Sin dominio verificado en Resend se usa su remitente de pruebas.
  const kc_from = Deno.env.get("CONTACT_FROM_EMAIL") || "Koda Studio <onboarding@resend.dev>";
  const kc_to = Deno.env.get("CONTACT_TO_EMAIL");
  if (!kc_resendKey || !kc_to) {
    const kc_error = "Configuración de correo incompleta";
    console.error(kc_error);
    await kc_supabase.from("kc_contact_requests").update({ email_error: kc_error }).eq("id", kc_requestId);
    return kc_reply(503, { ok: false, error: "email_configuration", id: kc_requestId }, kc_origin, kc_isAllowed);
  }
  const kc_safeName = kc_escapeHtml(kc_name);
  const kc_safeEmail = kc_escapeHtml(kc_email);
  const kc_safeMessage = kc_escapeHtml(kc_message);
  const kc_safeServices = kc_selected.map(kc_escapeHtml);
  const kc_html = `<h1>Nueva solicitud de consultoría</h1><p><strong>Nombre:</strong> ${kc_safeName}</p><p><strong>Correo:</strong> ${kc_safeEmail}</p><p><strong>Servicios:</strong> ${kc_safeServices.length ? kc_safeServices.join(", ") : "Sin selección"}</p><p><strong>Proyecto:</strong></p><p>${kc_safeMessage.replace(/\n/g, "<br>")}</p>`;
  const kc_text = `Nueva solicitud de consultoría\nNombre: ${kc_name}\nCorreo: ${kc_email}\nServicios: ${kc_selected.join(", ") || "Sin selección"}\nProyecto:\n${kc_message}`;
  try {
    const kc_emailController = new AbortController();
    const kc_emailTimeout = setTimeout(() => kc_emailController.abort(), 10_000);
    let kc_emailResponse: Response;
    try {
      kc_emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${kc_resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: kc_from,
        to: [kc_to],
        reply_to: kc_email,
        subject: `Nueva solicitud de consultoría — ${kc_name}`,
        html: kc_html,
        text: kc_text,
      }),
      signal: kc_emailController.signal,
      });
    } finally {
      clearTimeout(kc_emailTimeout);
    }
    if (!kc_emailResponse.ok) {
      const kc_errorText = (await kc_emailResponse.text()).slice(0, 1000);
      console.error("Resend rechazó el correo:", kc_emailResponse.status, kc_errorText);
      await kc_supabase.from("kc_contact_requests").update({ email_error: `Resend HTTP ${kc_emailResponse.status}` }).eq("id", kc_requestId);
      return kc_reply(502, { ok: false, error: "email_delivery", id: kc_requestId }, kc_origin, kc_isAllowed);
    } else {
      await kc_supabase.from("kc_contact_requests").update({ email_sent_at: new Date().toISOString(), email_error: null }).eq("id", kc_requestId);
    }
  } catch (kc_error) {
    console.error("No se pudo enviar el correo:", kc_error);
    await kc_supabase.from("kc_contact_requests").update({ email_error: "Error de conexión con Resend" }).eq("id", kc_requestId);
    return kc_reply(502, { ok: false, error: "email_delivery", id: kc_requestId }, kc_origin, kc_isAllowed);
  }
  return kc_reply(200, { ok: true, email_sent: true, id: kc_requestId }, kc_origin, kc_isAllowed);
});
