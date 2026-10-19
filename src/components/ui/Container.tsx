import type { ReactNode } from "react";
export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 ${className}`}
    >
      {children}
    </Tag>
  );
}
