export type Season = "spring" | "summer" | "autumn" | "winter";

// Calendar seasons requested for Korea, independent of the visitor's timezone.
export function getKoreanSeason(date = new Date()): Season {
  const month = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      month: "numeric",
    }).format(date),
  );
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export function nextKoreanMidnight(date = new Date()): number {
  const offset = 9 * 60 * 60 * 1000;
  const koreanDate = new Date(date.getTime() + offset);
  return (
    Date.UTC(
      koreanDate.getUTCFullYear(),
      koreanDate.getUTCMonth(),
      koreanDate.getUTCDate() + 1,
    ) - offset
  );
}

export const seasons = {
  spring: {
    name: "봄",
    english: "SPRING",
    badge: "A SOFT SPRING DAY",
    greeting: "SPRING, IN BLOOM",
    effect: "꽃잎",
  },
  summer: {
    name: "여름",
    english: "SUMMER",
    badge: "A GREEN SUMMER DAY",
    greeting: "SUMMER, IN THE SHADE",
    effect: "나비",
  },
  autumn: {
    name: "가을",
    english: "AUTUMN",
    badge: "A COZY AUTUMN DAY",
    greeting: "AUTUMN, IN WARM COLORS",
    effect: "낙엽",
  },
  winter: {
    name: "겨울",
    english: "WINTER",
    badge: "A COZY WINTER DAY",
    greeting: "WINTER, WITH WARMTH",
    effect: "눈",
  },
} satisfies Record<
  Season,
  {
    name: string;
    english: string;
    badge: string;
    greeting: string;
    effect: string;
  }
>;
