"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Flower2, Leaf, Snowflake, Sun } from "lucide-react";
import {
  getKoreanSeason,
  nextKoreanMidnight,
  seasons,
  type Season,
} from "@/lib/seasons";

const SeasonContext = createContext<Season | null>(null);

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  // A neutral SSR state avoids baking a build-time season into static Pages.
  const [season, setSeason] = useState<Season | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      clearTimeout(timer);
      if (document.hidden) return;
      const now = new Date();
      setSeason(getKoreanSeason(now));
      timer = setTimeout(refresh, nextKoreanMidnight(now) - now.getTime() + 50);
    };
    refresh();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("pageshow", refresh);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, []);
  return (
    <SeasonContext.Provider value={season}>{children}</SeasonContext.Provider>
  );
}

export function useSeason() {
  return useContext(SeasonContext);
}

export function SeasonIcon({ size = 13 }: { size?: number }) {
  const season = useSeason();
  const Icon =
    season === "spring"
      ? Flower2
      : season === "summer"
        ? Sun
        : season === "winter"
          ? Snowflake
          : Leaf;
  return <Icon size={size} aria-hidden="true" />;
}

export function SeasonBadge({
  variant = "day",
}: {
  variant?: "day" | "greeting";
}) {
  const season = useSeason();
  return (
    <span className="season-badge" data-season={season ?? "pending"}>
      <SeasonIcon />
      <span>
        {season
          ? variant === "day"
            ? seasons[season].badge
            : seasons[season].greeting
          : "KOREA, FOUR SEASONS"}
      </span>
    </span>
  );
}
