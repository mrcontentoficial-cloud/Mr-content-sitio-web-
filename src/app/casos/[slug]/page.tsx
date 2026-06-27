import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ShimmerButton from "@/components/ui/ShimmerButton";
import { cases, getCase } from "@/lib/cases";
import { waLink } from "@/lib/site";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Caso de éxito" };
  return {
    title: `${c.name} | Casos de éxito`,
    description: c.intro,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/10 bg-night">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[150px]"
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-32 md:px-8 md:pt-36">
          <Link
            href="/#casos"
            className="group inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-accent"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all group-hover:-translate-x-0.5 group-hover:border-accent group-hover:text-accent">
              <ArrowLeft className="size-5" />
            </span>
            Volver a casos
          </Link>

          <div className="mt-10 flex flex-col items-center text-center">
            <div
              style={{ backgroundColor: c.circleBg }}
              className="flex h-36 w-36 items-center justify-center rounded-full border border-white/15 p-6 ring-1 ring-accent/30"
            >
              <Image
                src={c.logo}
                alt={c.name}
                width={140}
                height={140}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {c.category}
            </span>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              {c.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              {c.intro}
            </p>
          </div>

          {/* Resultados */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            {c.results.map((r) => (
              <div key={r.label} className="text-center">
                <p className="font-bebas text-5xl font-bold tracking-wide text-gradient md:text-6xl">
                  {r.value}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué hicimos */}
      <section className="bg-night-soft">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Qué hicimos
          </h2>
          <ul className="mt-8 space-y-4">
            {c.work.map((w) => (
              <li key={w} className="flex items-start gap-3 text-white/90">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-start gap-3">
            <p className="font-display text-xl font-bold md:text-2xl">
              ¿Quieres resultados así para tu marca?
            </p>
            <ShimmerButton
              href={waLink(
                `Hola Mister Content, vi el caso de ${c.name} y quiero algo así para mi negocio.`
              )}
            >
              Quiero lo mismo para mi negocio
            </ShimmerButton>
          </div>
        </div>
      </section>

      {/* Galería del trabajo */}
      {c.gallery && c.gallery.length > 0 && (
        <section className="bg-night">
          <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
            <h2 className="font-display text-center text-2xl font-bold tracking-tight md:text-3xl">
              El resultado
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {c.gallery.map((src, i) => (
                <div
                  key={src}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-night-card shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_50px_rgba(155,127,212,0.25)]"
                >
                  <Image
                    src={src}
                    alt={`${c.name} trabajo ${i + 1}`}
                    width={1000}
                    height={750}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mapa de ubicación */}
      {c.mapEmbed && (
        <section className="border-t border-white/10 bg-night-soft">
          <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Dónde están
            </h2>

            {c.address && (
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-2 text-white/90">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                  {c.address}
                </p>
                {c.mapUrl && (
                  <a
                    href={c.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-all hover:shadow-[0_0_24px_rgba(155,127,212,0.5)]"
                    style={{
                      background:
                        "linear-gradient(110deg, #b89dee 0%, #9b7fd4 50%, #c77dff 100%)",
                    }}
                  >
                    <MapPin className="size-4" /> Cómo llegar
                  </a>
                )}
              </div>
            )}

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={c.mapEmbed}
                title={`Ubicación de ${c.name}`}
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </section>
      )}

      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
