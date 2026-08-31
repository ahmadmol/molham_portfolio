import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold " +
  "transition-all duration-200 ease-out select-none " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none " +
  "active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#04130d] " +
    "hover:bg-accent-bright hover:-translate-y-0.5 " +
    "shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_14px_34px_-18px_rgba(16,185,129,0.55)] " +
    "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.55),0_18px_44px_-18px_rgba(16,185,129,0.65)]",
  secondary:
    "bg-white/[0.04] text-slate-100 border border-white/10 backdrop-blur " +
    "hover:bg-white/[0.08] hover:border-accent/30 hover:-translate-y-0.5 " +
    "hover:shadow-[0_0_0_1px_rgba(16,185,129,0.18)]",
  ghost:
    "bg-transparent text-slate-200 border border-transparent " +
    "hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-0.5",
  outline:
    "bg-transparent text-accent border border-accent/35 " +
    "hover:bg-accent/10 hover:border-accent/55 hover:-translate-y-0.5",
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={[base, variants[variant], className].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
