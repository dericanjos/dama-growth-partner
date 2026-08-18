import { Link } from "@tanstack/react-router";

export interface NewsUpdateNoticeProps {
  /** Data da atualização em ISO (yyyy-mm-dd) ou já formatada (dd/mm/aaaa). */
  date: string;
  /** Texto da atualização, sem o rótulo. */
  text: string;
  /** Slug interno opcional para o link no fim do bloco (ex.: /noticias/xxx). */
  linkSlug?: string | null;
  /** Rótulo do link interno. */
  linkLabel?: string | null;
}

function formatUpdateDate(value: string) {
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
  return value;
}

export function NewsUpdateNotice({
  date,
  text,
  linkSlug,
  linkLabel,
}: NewsUpdateNoticeProps) {
  return (
    <aside className="mb-8 rounded-r-[8px] border-l-[3px] border-[var(--gold)] bg-white/70 px-5 py-4">
      <p className="text-[14.5px] leading-[1.65] text-[var(--text-secondary)]">
        <strong className="text-[var(--navy)]">
          Atualização · {formatUpdateDate(date)}
        </strong>{" "}
        {text}
        {linkSlug && linkLabel ? (
          <>
            {" "}
            <Link
              to="/noticias/$slug"
              params={{ slug: linkSlug }}
              className="font-medium text-[var(--gold-deep)] underline"
            >
              {linkLabel}
            </Link>
            .
          </>
        ) : null}
      </p>
    </aside>
  );
}
