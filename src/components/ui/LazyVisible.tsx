"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Monta a sus hijos (fondos/shaders animados) solo cuando el contenedor
 * está cerca o dentro del viewport. Al salir de pantalla, los desmonta
 * para detener su animación y liberar CPU/GPU.
 */
export function LazyVisible({
  children,
  className,
  rootMargin = "300px",
}: {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} aria-hidden className={cn("absolute inset-0", className)}>
      {show ? children : null}
    </div>
  );
}
