import React from "react";

export default function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {kicker}
        </div>
      ) : null}
      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
        {title}
      </h2>
      <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-transparent" />
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-slate-300/90 leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
