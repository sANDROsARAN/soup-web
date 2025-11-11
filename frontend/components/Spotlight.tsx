"use client";

import { useState, useEffect } from "react";

export default function Spotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition duration-100"
      style={{
        background: `radial-gradient(
          circle 250px at ${pos.x}px ${pos.y}px,
          rgba(255,255,0,255),
          rgba(0,0,0,0.2) 60%
        )`,
        mixBlendMode: "hard-light",
      }}
    ></div>
  );
}
