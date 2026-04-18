import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/5521959214292?text=" +
  encodeURIComponent(
    "Olá, sou médico(a) e vim do site do Grupo DAMA. Gostaria de saber mais."
  );

export function WhatsAppFloat() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com o Grupo DAMA"
      className="group fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 md:bottom-7 md:right-7"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-60 blur-md transition-opacity group-hover:opacity-90" />
    </a>
  );
}
