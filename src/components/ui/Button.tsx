import React from "react";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary:
      "bg-accent text-black hover:bg-accent/90 shadow-[0_0_0_1px_rgba(0,200,83,0.25),0_12px_30px_-20px_rgba(0,200,83,0.5)]",
    secondary:
      "bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10",
    ghost:
      "bg-transparent text-slate-200 hover:bg-white/5 border border-transparent hover:border-white/10",
  };

  return (
    <button
      className={[base, variants[variant], className].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
