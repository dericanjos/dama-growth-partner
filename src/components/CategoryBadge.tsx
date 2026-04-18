import { type BlogCategory } from "@/data/blog";
import { type NewsCategory } from "@/data/news";

type AnyCategory = BlogCategory | NewsCategory | string;

const COLORS: Record<string, { bg: string; fg: string }> = {
  Crescimento: { bg: "#142348", fg: "#f5d27a" },
  Marketing: { bg: "#1f3a2e", fg: "#a8e6c4" },
  Mercado: { bg: "#3a2a1f", fg: "#f5c98a" },
  Regulamentação: { bg: "#142348", fg: "#f5d27a" },
  Congressos: { bg: "#2a1f3a", fg: "#d4b4f5" },
  Pesquisa: { bg: "#1f3a3a", fg: "#a8d8e6" },
};

export function CategoryBadge({ category }: { category: AnyCategory }) {
  const c = COLORS[category] ?? { bg: "var(--navy-light)", fg: "var(--gold-light)" };
  return (
    <span className="cat-badge" style={{ backgroundColor: c.bg, color: c.fg }}>
      {category}
    </span>
  );
}
