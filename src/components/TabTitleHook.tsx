"use client";

import { useEffect } from "react";

const AWAY_MESSAGES = [
  "👀 ¡No te vayas! Tu negocio te espera",
  "💜 A un clic de empezar a vender",
  "🚀 Vuelve, hagamos que tu marca destaque",
];

export default function TabTitleHook() {
  useEffect(() => {
    const original = document.title;
    let idx = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const onVisibility = () => {
      if (document.hidden) {
        // El usuario cambió de pestaña: rotamos mensajes que llaman la atención
        idx = 0;
        document.title = AWAY_MESSAGES[0];
        timer = setInterval(() => {
          idx = (idx + 1) % AWAY_MESSAGES.length;
          document.title = AWAY_MESSAGES[idx];
        }, 2500);
      } else {
        // Regresó: restauramos el título original
        if (timer) clearInterval(timer);
        document.title = original;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timer) clearInterval(timer);
      document.title = original;
    };
  }, []);

  return null;
}
