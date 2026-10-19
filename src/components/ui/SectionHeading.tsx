import type { SectionCopy } from "@/data/portfolio";
export default function SectionHeading({
  index,
  label,
  title,
  description,
}: SectionCopy) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">
        {index}
        <span aria-hidden className="px-3 text-foreground-subtle">
          /
        </span>
        {label}
      </p>
      <h2 className="mt-4 text-[clamp(1.9rem,3.2vw,3rem)] font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base text-foreground-muted">
          {description}
        </p>
      )}
    </div>
  );
}
