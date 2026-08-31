import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
};

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: Props) {
  return (
    <Tag
      className={[
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
