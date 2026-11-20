"use client";
import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function Latex({ children }: { children: React.ReactNode }) {
  const source = React.Children.toArray(children).join("");
  const parts = source.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        const isBlock = part.startsWith("$$") && part.endsWith("$$");
        const isInline = !isBlock && part.startsWith("$") && part.endsWith("$");
        if (!isBlock && !isInline) return <React.Fragment key={index}>{part}</React.Fragment>;

        const expression = isBlock ? part.slice(2, -2) : part.slice(1, -1);
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(expression, { displayMode: isBlock, throwOnError: false }),
            }}
          />
        );
      })}
    </>
  );
}
