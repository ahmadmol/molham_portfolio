import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2 min-h-11 rounded-lg px-4 py-2.5 text-sm font-semibold " +
  "transition-colors duration-200 select-none " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-[#04130d] hover:bg-accent-bright",
  secondary:
    "border border-white/10 bg-white/[0.03] text-foreground hover:border-white/20 hover:bg-white/[0.06]",
  ghost: "bg-transparent text-foreground hover:bg-white/[0.04]",
  outline:
    "border border-accent/40 bg-transparent text-accent hover:border-accent hover:bg-accent/10",
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
