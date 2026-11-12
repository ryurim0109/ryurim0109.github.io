"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoonStar, Pause, Play } from "lucide-react";
import { drawVillage } from "@/lib/pixel/village";
import { PixelCharacter } from "@/components/pixel-character";
import { SeasonBadge, useSeason } from "@/components/season-provider";
import { seasons } from "@/lib/seasons";

const places = [
  {
    id: "about",
    name: "About",
    korean: "유림의 집",
    position: "house",
    number: "01",
  },
  {
    id: "projects",
    name: "Projects",
    korean: "작은 작업실",
    position: "workshop",
    number: "02",
  },
  {
    id: "blog",
    name: "Blog",
    korean: "기록의 서점",
    position: "bookshop",
    number: "03",
  },
  {
    id: "contact",
    name: "Contact",
    korean: "마을 우체통",
    position: "mailbox",
    number: "04",
  },
];

export function Village() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hello, setHello] = useState(false);
  const season = useSeason();
  const effect = season ? seasons[season].effect : "계절 효과";

  useEffect(() => {
    if (canvas.current && season) drawVillage(canvas.current, season);
  }, [season]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section
      className="village-window"
      aria-label={`김유림의 ${season ? seasons[season].name + " " : ""}픽셀 마을`}
      data-paused={paused || hidden}
      data-season={season ?? "pending"}
    >
      <div className="window-bar">
        <div className="window-title">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>ryurim&apos;s little village</span>
        </div>
        <div className="window-weather">
          <SeasonBadge variant="greeting" />
        </div>
      </div>
      <div className="village-scene">
        <canvas ref={canvas} width={640} height={240} aria-hidden="true" />
        <div className="village-corner-note">
          <MoonStar size={12} />
          <span>A little place to explore.</span>
        </div>
        <div className="season-particles" aria-hidden="true">
          {Array.from({ length: season === "summer" ? 8 : 20 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 31 + 7) % 100}%`,
                top: `${(i * 17) % 85}%`,
                animationDelay: `${-i * 1.7}s`,
                animationDuration: `${10 + (i % 5) * 3}s`,
              }}
            />
          ))}
        </div>
        {places.map((place) => (
          <a
            key={place.id}
            href={`#${place.id}`}
            className={`village-place ${place.position}`}
            aria-label={`${place.korean} · ${place.name} 이동`}
          >
            <span className="place-label">
              <span>{place.name}</span>
              <ArrowUpRight size={11} />
            </span>
            <span className="place-korean">{place.korean}</span>
          </a>
        ))}
        <button
          className="village-resident"
          onClick={() => setHello(!hello)}
          aria-expanded={hello}
          aria-label="마을의 유림에게 인사하기"
        >
          <span className="resident-bubble">
            {hello ? "반가워요! 편하게 둘러보세요 ♡" : "어서 오세요!"}
          </span>
          <PixelCharacter />
        </button>
        <span className="scene-coordinate" aria-hidden="true">
          37° N · A WARM CORNER OF THE WEB
        </span>
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-label={`${effect} 애니메이션 ${paused ? "재생" : "일시정지"}`}
          aria-pressed={paused}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
          <span>
            {effect} {paused ? "재생" : "멈추기"}
          </span>
        </button>
      </div>
      <div className="village-status">
        <span>
          <span className="status-dot" /> 작은 마을을 자유롭게 둘러보세요
        </span>
        <span className="village-tip">
          건물의 이름표를 누르면 이야기가 열려요{" "}
          <span aria-hidden="true">↵</span>
        </span>
      </div>
    </section>
  );
}
