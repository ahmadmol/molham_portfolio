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
        <p className="text-sm font-medium tracking-wide text-accent-400 uppercase">
          {kicker}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base sm:text-lg text-slate-300/90">
          {description}
        </p>
      ) : null}
    </div>
  );
}
