"use client";

import { useEffect, useRef } from "react";
import { drawVillage } from "@/lib/pixel/village";
import { PixelCharacter } from "@/components/pixel-character";
import { useSeason } from "@/components/season-provider";

export function ProjectPreview({ large = false }: { large?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const season = useSeason();
  useEffect(() => {
    if (ref.current && season) drawVillage(ref.current, season);
  }, [season]);
  return (
    <div
      className={`project-preview ${large ? "large" : ""}`}
      aria-label="ryu-deco의 픽셀 월드 제작을 표현한 오리지널 일러스트"
      role="img"
    >
      <div className="preview-browser">
        <span className="preview-dots">● ● ●</span>
        <span>ryu-deco / pixel world editor</span>
        <span>✦</span>
      </div>
      <div className="preview-editor">
        <div className="preview-tools" aria-hidden="true">
          <b>✎</b>
          <span>▦</span>
          <span>◇</span>
          <span>✦</span>
          <i />
        </div>
        <div className="preview-world">
          <canvas ref={ref} width={640} height={240} aria-hidden="true" />
          <div className="preview-dev-card">
            <PixelCharacter />
            <div>
              <strong>hello, I&apos;m RyuRim!</strong>
              <span>Building my little pixel world.</span>
              <div className="preview-tech">
                <i>Next.js</i>
                <i>TypeScript</i>
                <i>Canvas</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="preview-bottom">
        <span>
          <i /> All changes saved
        </span>
        <span>
          PNG · GIF <b>Export ↗</b>
        </span>
      </div>
    </div>
  );
}
