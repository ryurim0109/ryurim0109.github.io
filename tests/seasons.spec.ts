import { expect, test } from "@playwright/test";
import { getKoreanSeason, nextKoreanMidnight } from "../lib/seasons";

test.use({ timezoneId: "America/Los_Angeles" });

test("all twelve months and season boundaries use Korea's calendar", () => {
  const expected = [
    "winter",
    "winter",
    "spring",
    "spring",
    "spring",
    "summer",
    "summer",
    "summer",
    "autumn",
    "autumn",
    "autumn",
    "winter",
  ];
  expected.forEach((season, index) => {
    expect(getKoreanSeason(new Date(Date.UTC(2026, index, 15)))).toBe(season);
  });
  for (const [before, after, date] of [
    ["winter", "spring", "2026-02-28"],
    ["spring", "summer", "2026-05-31"],
    ["summer", "autumn", "2026-08-31"],
    ["autumn", "winter", "2026-11-30"],
  ]) {
    expect(getKoreanSeason(new Date(`${date}T14:59:59Z`))).toBe(before);
    expect(getKoreanSeason(new Date(`${date}T15:00:00Z`))).toBe(after);
  }
  expect(
    new Date(
      nextKoreanMidnight(new Date("2026-11-30T14:00:00Z")),
    ).toISOString(),
  ).toBe("2026-11-30T15:00:00.000Z");
  expect(
    new Date(
      nextKoreanMidnight(new Date("2026-12-31T15:00:00Z")),
    ).toISOString(),
  ).toBe("2027-01-01T15:00:00.000Z");
});

for (const [month, season, korean, effect, sky] of [
  ["04", "spring", "봄", "꽃잎", [243, 229, 238, 255]],
  ["07", "summer", "여름", "나비", [223, 239, 240, 255]],
  ["11", "autumn", "가을", "낙엽", [241, 227, 220, 255]],
  ["01", "winter", "겨울", "눈", [233, 229, 242, 255]],
] as const) {
  test(`${season} has its own scenery, label and controllable effect`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.clock.install({ time: new Date(`2026-${month}-15T03:00:00Z`) });
    await page.goto("/");
    const village = page.getByRole("region", {
      name: `김유림의 ${korean} 픽셀 마을`,
    });
    await expect(village).toHaveAttribute("data-season", season);
    await expect(page.locator(".page-kicker .season-badge")).toHaveAttribute(
      "data-season",
      season,
    );
    const pixels = await village
      .locator("canvas")
      .evaluate((el: HTMLCanvasElement) => ({
        sky: Array.from(el.getContext("2d")!.getImageData(1, 1, 1, 1).data),
        roof: Array.from(
          el.getContext("2d")!.getImageData(112, 107, 1, 1).data,
        ),
      }));
    expect(pixels.sky).toEqual(sky);
    if (season === "winter") expect(pixels.roof).toEqual([255, 250, 247, 255]);
    else expect(pixels.roof).not.toEqual([255, 250, 247, 255]);
    await page
      .getByRole("button", { name: `${effect} 애니메이션 일시정지` })
      .click();
    await expect(village).toHaveAttribute("data-paused", "true");
    await page
      .getByRole("button", { name: `${effect} 애니메이션 재생` })
      .click();
    await expect(village).toHaveAttribute("data-paused", "false");
    await page.evaluate(() => document.fonts.ready);
    await village.screenshot({
      path: `test-results/season-${season}-${testInfo.project.name}.png`,
    });
  });
}

test("an open page changes season at Korean midnight without rebuilding", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-11-30T14:58:00Z") });
  await page.goto("/");
  await expect(page.locator(".village-window")).toHaveAttribute(
    "data-season",
    "autumn",
  );
  await page.clock.runFor(121_000);
  await expect(page.locator(".village-window")).toHaveAttribute(
    "data-season",
    "winter",
  );
  await expect(
    page.getByRole("button", { name: "눈 애니메이션 일시정지" }),
  ).toBeVisible();
});
