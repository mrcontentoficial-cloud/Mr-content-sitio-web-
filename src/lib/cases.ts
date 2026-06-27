export type CaseStudy = {
  slug: string;
  name: string;
  logo: string;
  circleBg: string;
  category: string;
  intro: string;
  work: string[];
  results: { value: string; label: string }[];
};

export const cases: CaseStudy[] = [
  {
    slug: "emjo-consulting",
    name: "EMJO Consulting",
    logo: "/emjo.png",
    circleBg: "#19212d",
    category: "Identidad de marca y automatización",
    intro:
      "EMJO Consulting necesitaba verse a la altura de su servicio y dejar de perder mensajes de clientes. Construimos una marca sólida y un sistema que responde por ellos las 24 horas.",
    work: [
      "Diseño de identidad de marca completa: logo, paleta y tipografías.",
      "Manual de marca para mantener todo consistente.",
      "Chatbot de WhatsApp que responde, informa y filtra clientes automáticamente.",
      "Flujos de atención para no perder ningún mensaje.",
    ],
    results: [
      { value: "24/7", label: "atención automatizada" },
      { value: "0", label: "mensajes perdidos" },
    ],
  },
  {
    slug: "dml-medica",
    name: "DML Médica",
    logo: "/dml-medica.png",
    circleBg: "#ffffff",
    category: "Branding y redes sociales",
    intro:
      "DML Médica tenía presencia, pero sin rumbo. Le dimos una estrategia de marca y contenido que convirtió sus redes en una comunidad real y constante.",
    work: [
      "Posicionamiento y línea gráfica de marca.",
      "Estrategia de contenido mensual para Instagram y Facebook.",
      "Diseño de publicaciones, stories y reels.",
      "Gestión de comunidad para crecer con seguidores reales.",
    ],
    results: [
      { value: "+10K", label: "seguidores alcanzados" },
      { value: "100%", label: "presencia constante" },
    ],
  },
  {
    slug: "clinica-lasser",
    name: "Clínica Lásser",
    logo: "/lasser.png",
    circleBg: "#ffffff",
    category: "Presencia digital",
    intro:
      "Le construimos a Clínica Lásser una presencia digital profesional para que sus pacientes la encuentren, le crean y agenden con confianza.",
    work: [
      "Sitio web profesional y optimizado para móvil.",
      "Identidad visual coherente en todos sus canales.",
      "Estrategia de contenido para posicionar la clínica.",
    ],
    results: [
      { value: "24/7", label: "presencia en línea" },
      { value: "100%", label: "enfocado en pacientes" },
    ],
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
