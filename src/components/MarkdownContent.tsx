import { Fragment, type JSX, type ReactNode } from "react";

/**
 * Minimal markdown renderer for blog posts (no deps).
 * Supports: ## H2, ### H3, > blockquote, - lists, paragraphs, [text](url) links.
 */

// Inline parser: handles [text](url) — internal links use site styling.
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isExternal = /^https?:\/\//.test(href);
    nodes.push(
      <a
        key={`${keyPrefix}-a-${i++}`}
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-medium text-[var(--gold-deep)] underline decoration-[color-mix(in_oklab,var(--gold)_50%,transparent)] underline-offset-4 transition-colors hover:text-[var(--navy)]"
      >
        {label}
      </a>,
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/);
  const elements: JSX.Element[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${key}`} className="my-6 space-y-3 pl-6">
        {listBuffer.map((item, i) => (
          <li
            key={i}
            className="relative text-[16px] leading-[1.85] text-[var(--text-secondary)] before:absolute before:-left-5 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--gold)]"
          >
            {renderInline(item.replace(/^[-*]\s+/, ""), `li-${key}-${i}`)}
          </li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  blocks.forEach((raw, idx) => {
    const block = raw.trim();
    if (!block) return;

    if (/^[-*]\s+/.test(block)) {
      block.split("\n").forEach((line) => {
        if (/^[-*]\s+/.test(line)) listBuffer.push(line);
      });
      return;
    }
    flushList(String(idx));

    if (block.startsWith("### ")) {
      elements.push(
        <h3
          key={idx}
          className="mt-10 mb-4 font-serif text-[20px] font-semibold text-[var(--navy)]"
        >
          {block.slice(4)}
        </h3>,
      );
    } else if (block.startsWith("## ")) {
      elements.push(
        <h2
          key={idx}
          className="mt-12 mb-4 font-serif text-[26px] font-semibold leading-tight text-[var(--navy)]"
        >
          {block.slice(3)}
        </h2>,
      );
    } else if (block.startsWith("> ")) {
      elements.push(
        <blockquote
          key={idx}
          className="my-7 border-l-[3px] border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_8%,white)] px-5 py-4 font-serif text-[17px] italic leading-[1.7] text-[var(--navy)]"
        >
          {renderInline(block.slice(2), `bq-${idx}`)}
        </blockquote>,
      );
    } else {
      const lines = block.split("\n");
      elements.push(
        <p key={idx} className="my-5 text-[16px] leading-[1.9] text-[var(--text-secondary)]">
          {lines.map((line, i) => (
            <Fragment key={i}>
              {renderInline(line, `p-${idx}-${i}`)}
              {i < lines.length - 1 && <br />}
            </Fragment>
          ))}
        </p>,
      );
    }
  });

  flushList("end");
  return <div>{elements}</div>;
}

  const blocks = content.split(/\n{2,}/);
  const elements: JSX.Element[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${key}`} className="my-6 space-y-3 pl-6">
        {listBuffer.map((item, i) => (
          <li
            key={i}
            className="relative text-[16px] leading-[1.85] text-[var(--text-secondary)] before:absolute before:-left-5 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--gold)]"
          >
            {item.replace(/^[-*]\s+/, "")}
          </li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  blocks.forEach((raw, idx) => {
    const block = raw.trim();
    if (!block) return;

    if (/^[-*]\s+/.test(block)) {
      block.split("\n").forEach((line) => {
        if (/^[-*]\s+/.test(line)) listBuffer.push(line);
      });
      return;
    }
    flushList(String(idx));

    if (block.startsWith("### ")) {
      elements.push(
        <h3
          key={idx}
          className="mt-10 mb-4 font-serif text-[20px] font-semibold text-[var(--navy)]"
        >
          {block.slice(4)}
        </h3>,
      );
    } else if (block.startsWith("## ")) {
      elements.push(
        <h2
          key={idx}
          className="mt-12 mb-4 font-serif text-[26px] font-semibold leading-tight text-[var(--navy)]"
        >
          {block.slice(3)}
        </h2>,
      );
    } else if (block.startsWith("> ")) {
      elements.push(
        <blockquote
          key={idx}
          className="my-7 border-l-[3px] border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_8%,white)] px-5 py-4 font-serif text-[17px] italic leading-[1.7] text-[var(--navy)]"
        >
          {block.slice(2)}
        </blockquote>,
      );
    } else {
      const lines = block.split("\n");
      elements.push(
        <p key={idx} className="my-5 text-[16px] leading-[1.9] text-[var(--text-secondary)]">
          {lines.map((line, i) => (
            <Fragment key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </Fragment>
          ))}
        </p>,
      );
    }
  });

  flushList("end");
  return <div>{elements}</div>;
}
