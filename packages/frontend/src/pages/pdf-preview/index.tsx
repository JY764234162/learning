import React, { useEffect, useRef, useState } from "react";

export default function PdfPreview() {
  const ref = useRef<HTMLDivElement>(null);

  const parserDoc = async (path: string) => {
    console.log(window)
    return await window.pdfjsLib.getDocument(path).promise;
  };

  useEffect(() => {
    parserDoc("./1.pdf").then((doc) => {
      doc.getPage(1).then((page) => {
        const canvas = document.createElement("canvas");
        ref.current?.append(canvas);

        const renderer = {
          canvasContext: canvas.getContext("2d"),
          viewport: page.getViewport({ scale: 1 }),
        };
        page.render(renderer);
      });
    });
  }, []);

  return <div ref={ref}>PdfPreview</div>;
}
