"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { waLink } from "@/lib/site";

const OPTIONS = [
  "Quiero un sitio web",
  "Identidad de marca",
  "Gestión de redes sociales",
  "Automatización de WhatsApp",
  "Publicidad en Meta Ads",
  "Solo quiero información",
];

type Msg = { from: "bot" | "user"; text: string };

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "¡Hola! 👋 Soy el asistente de Mister Content. ¿Qué buscas para tu negocio?",
    },
  ]);
  const [stage, setStage] = useState<"ask" | "ready">("ask");
  const [choice, setChoice] = useState("");
  const [text, setText] = useState("");

  function pick(opt: string) {
    setChoice(opt);
    setMessages((m) => [
      ...m,
      { from: "user", text: opt },
      {
        from: "bot",
        text: "¡Perfecto! Te atiendo personalmente por WhatsApp para darte información y cotización. Toca el botón verde de abajo.",
      },
    ]);
    setStage("ready");
  }

  function sendText(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setChoice(t);
    setMessages((m) => [
      ...m,
      { from: "user", text: t },
      {
        from: "bot",
        text: "¡Listo! Te doy seguimiento por WhatsApp. Toca el botón verde de abajo.",
      },
    ]);
    setStage("ready");
    setText("");
  }

  const wa = waLink(
    `Hola Mister, vi su página. Me interesa: ${choice || "información"}. Quiero más información para mi negocio.`
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex max-h-[70vh] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-night-card shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-night-soft px-4 py-3">
              <Image
                src="/logo-mr-content.png"
                alt="Mister Content"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-contain"
              />
              <div className="flex-1">
                <p className="font-display text-sm font-bold">Mister Content</p>
                <p className="flex items-center gap-1.5 text-xs text-white/70">
                  <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                  Normalmente responde rápido
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-sm bg-accent text-black"
                        : "rounded-bl-sm bg-white/10 text-white"
                    }`}
                  >
                    {m.text}
                  </span>
                </div>
              ))}

              {stage === "ask" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => pick(opt)}
                      className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-bright transition-colors hover:bg-accent/20"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {stage === "ready" && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon /> Continuar en WhatsApp
                </a>
              )}
            </div>

            {/* Input libre */}
            <form
              onSubmit={sendText}
              className="flex items-center gap-2 border-t border-white/10 bg-night-soft px-3 py-3"
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="O escribe lo que buscas…"
                className="flex-1 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-accent"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-black transition-colors hover:bg-accent-bright"
              >
                <Send size={17} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: "backOut" }}
        whileHover={{ scale: 1.08 }}
        aria-label={open ? "Cerrar chat" : "Abrir chat de WhatsApp"}
        className="relative flex h-14 w-14 items-center justify-center self-end rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.45)]"
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring"
          />
        )}
        <span className="relative">
          {open ? <X size={26} color="#fff" /> : <WhatsAppIcon />}
        </span>
      </motion.button>
    </div>
  );
}
