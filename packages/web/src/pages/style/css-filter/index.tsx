import React, { useEffect, useRef } from "react";
import bg from "./bg1.png";

export const Component = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const anim = ref.current.animate(
      {
        transform: ["translateX(-300px)", "translateX(300px)", "translateX(-300px)"],
      },
      {
        duration: 5000,
        iterations: Infinity,
      }
    );
    return () => {
      anim.cancel();
    };
  }, []);

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #333, #333 50%, #eee 50%, #eee 100%)",
          width: '100%',
          height: 800,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span ref={ref} style={{ fontSize: 100, fontWeight: 900, color: "#FFF", mixBlendMode: "difference" }}>
          星空
        </span>
      </div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "100% 100%",
          width: '100%',
          height: 800,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ padding: 50, fontSize: 100, fontWeight: 900, color: "black", backdropFilter: "blur(10px)" }}>星空</span>
      </div>
    </>
  );
}
