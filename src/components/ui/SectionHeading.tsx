import React from "react";

type Props = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: Props) {
  const isCenter = align === "center";
  return (
    <div
      className={[
        "max-w-2xl",
        isCenter ? "mx-auto text-center" : "",
      ].join(" ")}
    >
      {kicker ? (
        <div
          className={[
            "inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent",
            isCenter ? "mx-auto" : "",
          ].join(" ")}
        >
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent">
            <span className="absolute inset-0 rounded-full bg-accent pulse-dot" aria-hidden />
          </span>
          {kicker}
        </div>
      ) : null}

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
        {title}
      </h2>

      <div
        className={[
          "mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-accent via-accent to-transparent bar-grow",
          isCenter ? "mx-auto" : "",
        ].join(" ")}
        aria-hidden
      />

      {description ? (
        <p className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
