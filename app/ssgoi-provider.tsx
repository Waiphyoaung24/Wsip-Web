"use client";

import { Ssgoi } from "@ssgoi/react";
import { fade, scroll } from "@ssgoi/react/view-transitions";

type Props = {
  children: React.ReactNode;
};

const config = {
  defaultTransition: fade(),
  transitions: [
    {
      from: "/",
      to: "/about",
      transition: scroll({ direction: "up" }),
    },
  ],
};

export function SsgoiProvider({ children }: Props) {
  return (
    <Ssgoi config={config}>
      {/* ⚠️ Important: position: relative is required! */}
      <div style={{ position: "relative", minHeight: "100vh" }}>{children}</div>
    </Ssgoi>
  );
}


