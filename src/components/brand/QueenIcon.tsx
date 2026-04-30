import { type SVGProps } from "react";

/**
 * Grupo DAMA — Ícone da Rainha (peça de xadrez)
 * SVG vetorial, escalável. Usa gradiente dourado da marca por padrão.
 * Para versão monocromática, passe `monochrome` e/ou `color`.
 */
type Props = SVGProps<SVGSVGElement> & {
  monochrome?: boolean;
  color?: string;
  title?: string;
};

export function QueenIcon({
  monochrome = false,
  color,
  title,
  ...props
}: Props) {
  const gradId = "dama-queen-gold";
  const fill = monochrome ? color ?? "currentColor" : `url(#${gradId})`;
  const stroke = monochrome ? color ?? "currentColor" : "#8a6418";

  return (
    <svg
      viewBox="0 0 100 130"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {!monochrome && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5d27a" />
            <stop offset="45%" stopColor="#e8b84a" />
            <stop offset="100%" stopColor="#a87a1f" />
          </linearGradient>
        </defs>
      )}
      <g fill={fill} stroke={stroke} strokeWidth="0.8" strokeLinejoin="round">
        {/* Coroa — 5 pontas com esferas */}
        <circle cx="20" cy="10" r="6" />
        <circle cx="35" cy="6" r="5" />
        <circle cx="50" cy="4" r="6" />
        <circle cx="65" cy="6" r="5" />
        <circle cx="80" cy="10" r="6" />
        {/* Banda da coroa */}
        <path d="M16 14 L20 30 L32 24 L38 30 L50 22 L62 30 L68 24 L80 30 L84 14 Z" />
        {/* Aro decorativo */}
        <rect x="18" y="32" width="64" height="6" rx="1" />
        {/* Detalhe losango central (chanfro) */}
        <path
          d="M50 33 L55 36 L50 39 L45 36 Z"
          fill={monochrome ? "rgba(0,0,0,0.35)" : "#3a2a08"}
          stroke="none"
        />
        {/* Pescoço */}
        <path d="M28 40 L72 40 L66 56 L34 56 Z" />
        {/* Corpo / saia da peça */}
        <path d="M22 60 L78 60 L72 96 L28 96 Z" />
        {/* Base — degraus */}
        <rect x="20" y="98" width="60" height="6" rx="1" />
        <rect x="14" y="106" width="72" height="8" rx="1.5" />
        <rect x="10" y="116" width="80" height="10" rx="2" />
      </g>
    </svg>
  );
}
