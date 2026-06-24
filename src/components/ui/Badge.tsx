import React from "react";

export default function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        "bg-accent/10 text-accent border border-accent/20",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
