interface AuthorAvatarProps {
  name: string;
  /** URL da foto real do autor. Vazio ou ausente: renderiza o monograma da marca. */
  foto?: string;
  alt?: string;
  className?: string;
}

function initials(name: string) {
  return name
    .replace(/^Dr[a]?\.\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function AuthorAvatar({ name, foto, alt, className = "" }: AuthorAvatarProps) {
  const base =
    "mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-2 md:h-36 md:w-36";
  const wrapper = `${base} ${className}`.trim();

  if (foto && foto.trim().length > 0) {
    return (
      <div className={wrapper} style={{ borderColor: "var(--gold)" }}>
        <img
          src={foto}
          alt={alt ?? name}
          width={288}
          height={288}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${wrapper} flex items-center justify-center bg-[var(--gold-soft)]`}
      style={{ borderColor: "var(--gold)" }}
      aria-hidden
    >
      <span className="font-serif text-4xl tracking-[0.06em] text-[var(--gold-deep)] md:text-5xl">
        {initials(name)}
      </span>
    </div>
  );
}
