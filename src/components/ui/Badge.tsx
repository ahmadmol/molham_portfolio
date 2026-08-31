import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "accent" | "neutral" | "outline";
};

export default function Badge({
  children,
  className = "",
  variant = "accent",
}: BadgeProps) {
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    accent:
      "bg-accent/10 text-accent border border-accent/25",
    neutral:
      "bg-white/5 text-slate-200 border border-white/10",
    outline:
      "bg-transparent text-slate-300 border border-white/15",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
