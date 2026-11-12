import { expect, test } from "@playwright/test";

test("village locations, menus and project detail lead to real HTML content", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "코드로 짓는",
  );
  await expect(
    page.getByText("안녕하세요, 풀스택 개발자", { exact: false }).first(),
  ).toBeVisible();
  for (const [name, id] of [
    ["유림의 집 · About 이동", "about"],
    ["작은 작업실 · Projects 이동", "projects"],
    ["기록의 서점 · Blog 이동", "blog"],
    ["마을 우체통 · Contact 이동", "contact"],
  ]) {
    await page.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id} h2`)).toBeInViewport();
  }
  for (const item of ["About", "Projects", "Blog", "Contact"]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: item, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${item.toLowerCase()}$`));
  }
  await page.getByRole("link", { name: "어떤 고민을 담았을까요?" }).click();
  await expect(page).toHaveURL(/\/projects\/ryu-deco\/$/);
  await expect(
    page.getByRole("heading", { name: "만들면서 풀어낸 문제들" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "서비스 체험하기" }),
  ).toHaveAttribute("href", "https://ryurim0109.github.io/ryu-deco/");
  await expect(
    page.getByRole("link", { name: "소스 코드", exact: true }),
  ).toHaveAttribute("href", "https://github.com/ryurim0109/ryu-deco");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "ryu-deco",
  );
  expect(errors).toEqual([]);
});

test("motion, greeting, keyboard access and responsive layout", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const pause = page.getByRole("button", { name: /애니메이션 일시정지$/ });
  await pause.click();
  await expect(page.locator(".village-window")).toHaveAttribute(
    "data-paused",
    "true",
  );
  await page.getByRole("button", { name: /애니메이션 재생$/ }).click();
  await expect(page.locator(".village-window")).toHaveAttribute(
    "data-paused",
    "false",
  );
  await page.getByRole("button", { name: "마을의 유림에게 인사하기" }).click();
  await expect(page.getByText("반가워요! 편하게 둘러보세요 ♡")).toBeVisible();
  const house = page.getByRole("link", {
    name: "유림의 집 · About 이동",
    exact: true,
  });
  await house.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#about$/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const animation = await page
    .locator(".season-particles i")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe("none");
  const dimensions = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: innerWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  const scene = page.locator(".village-scene canvas");
  const pixel = await scene.evaluate((el: HTMLCanvasElement) =>
    Array.from(el.getContext("2d")!.getImageData(320, 120, 1, 1).data),
  );
  expect(pixel[3]).toBe(255);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `test-results/village-${testInfo.project.name}.png`,
    fullPage: true,
  });
});

test("hidden tab pauses motion; old site and existing assets remain available", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".village-window")).toHaveAttribute(
    "data-paused",
    "true",
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".village-window")).toHaveAttribute(
    "data-paused",
    "false",
  );
  expect((await request.get("/legacy/")).status()).toBe(200);
  expect((await request.get("/static/js/main.e1cd594d.js")).status()).toBe(200);
  expect((await request.get("/img/yr.png")).status()).toBe(200);
  expect((await request.get("/missing-village-location/")).status()).toBe(404);
  for (const path of [
    "/about/",
    "/blog/",
    "/contact/",
    "/projects/ryu-deco/",
    "/sitemap.xml",
    "/robots.txt",
  ])
    expect((await request.get(path)).status()).toBe(200);
});
