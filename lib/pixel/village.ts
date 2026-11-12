import type { Season } from "@/lib/seasons";
import { seasonPalettes } from "@/lib/pixel/season-palettes";

// Original village artwork on a 640 × 240 canvas, with seasonal landscapes.
export const WORLD_WIDTH = 640;
export const WORLD_HEIGHT = 240;

export function drawVillage(canvas: HTMLCanvasElement, season: Season) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = WORLD_WIDTH;
  canvas.height = WORLD_HEIGHT;
  ctx.imageSmoothingEnabled = false;
  const palette = seasonPalettes[season];
  const winter = season === "winter";
  const r = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };
  const line = (points: [number, number][], color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
  };
  const snow = "#fffaf7";
  const ink = "#65566b";
  r(0, 0, 640, 240, palette.sky);
  r(0, 48, 640, 60, palette.horizon);
  // A pastel sun and stepped clouds.
  r(488, 22, 24, 24, palette.sun);
  r(484, 27, 32, 14, palette.sun);
  const cloud = (x: number, y: number, w: number) => {
    r(x + 8, y, w - 20, 5, palette.cloud);
    r(x, y + 5, w, 6, palette.cloud);
    r(x + 5, y + 11, w - 10, 3, palette.cloud);
  };
  cloud(60, 29, 57);
  cloud(274, 18, 42);
  cloud(545, 50, 55);
  // Distant mountains follow the season; snow appears only in winter.
  line(
    [
      [0, 100],
      [0, 76],
      [25, 76],
      [25, 66],
      [47, 66],
      [47, 51],
      [61, 51],
      [61, 42],
      [72, 42],
      [72, 52],
      [85, 52],
      [85, 64],
      [102, 64],
      [102, 73],
      [121, 73],
      [121, 92],
      [146, 92],
      [146, 78],
      [165, 78],
      [165, 64],
      [185, 64],
      [185, 51],
      [199, 51],
      [199, 65],
      [214, 65],
      [214, 78],
      [238, 78],
      [238, 94],
      [270, 94],
      [270, 108],
    ],
    palette.mountains[0],
  );
  line(
    [
      [365, 108],
      [365, 82],
      [389, 82],
      [389, 67],
      [408, 67],
      [408, 52],
      [424, 52],
      [424, 41],
      [436, 41],
      [436, 54],
      [449, 54],
      [449, 64],
      [467, 64],
      [467, 83],
      [486, 83],
      [486, 74],
      [509, 74],
      [509, 60],
      [525, 60],
      [525, 48],
      [537, 48],
      [537, 62],
      [552, 62],
      [552, 73],
      [571, 73],
      [571, 90],
      [595, 90],
      [595, 79],
      [619, 79],
      [619, 67],
      [640, 67],
      [640, 110],
    ],
    palette.mountains[1],
  );
  if (winter) {
    r(53, 53, 27, 6, "#f4f0f8");
    r(61, 44, 11, 9, "#f4f0f8");
    r(411, 54, 34, 5, "#f4f0f8");
    r(424, 43, 12, 11, "#f4f0f8");
  }
  r(0, 105, 640, 135, palette.ground[0]);
  r(0, 129, 640, 111, palette.ground[1]);
  // Original stepped pines in winter, flowering/leafy trees in other seasons.
  const tree = (x: number, y: number, scale = 1, distant = false) => {
    const q = (a: number, b: number, w: number, h: number, c: string) =>
      r(x + a * scale, y + b * scale, w * scale, h * scale, c);
    const colors = distant
      ? palette.distantLeaf
      : Math.round(x) % 3 === 1
        ? palette.alternateLeaf
        : palette.leaf;
    const [green, dark] = colors;
    q(13, 30, 4, 12, distant ? "#ada6b4" : "#8e777c");
    if (!winter) {
      q(8, 0, 14, 5, green);
      q(3, 5, 24, 7, green);
      q(0, 12, 30, 13, green);
      q(4, 25, 22, 6, dark);
      q(23, 12, 7, 13, dark);
      q(6, 8, 7, 3, palette.highlight);
      q(3, 16, 4, 4, palette.highlight);
      q(17, 22, 4, 3, palette.highlight);
      return;
    }
    q(11, 0, 8, 6, green);
    q(7, 6, 16, 6, green);
    q(3, 12, 24, 7, green);
    q(7, 19, 16, 3, green);
    q(0, 22, 30, 9, green);
    q(3, 31, 24, 4, dark);
    q(11, 0, 8, 3, snow);
    q(7, 6, 16, 3, snow);
    q(3, 12, 24, 3, snow);
    q(0, 22, 30, 3, snow);
    q(7, 26, 4, 2, palette.highlight);
    q(19, 17, 4, 2, palette.highlight);
  };
  [5, 40, 84, 145, 177, 222, 255, 358, 390, 445, 495, 552, 588, 618].forEach(
    (x, i) => tree(x, 79 + (i % 3) * 6, 0.85, true),
  );
  // A winding lane connects the same four village destinations year-round.
  r(105, 166, 425, 13, palette.path);
  r(97, 174, 446, 13, palette.path);
  r(304, 179, 31, 20, palette.path);
  r(290, 199, 45, 16, palette.path);
  r(274, 215, 60, 25, palette.path);
  r(105, 166, 425, 2, palette.pathEdge);
  r(97, 185, 198, 2, winter ? "#fdfbfc" : palette.ground[0]);
  r(337, 185, 206, 2, winter ? "#fdfbfc" : palette.ground[0]);
  for (let i = 0; i < 21; i++)
    r(110 + i * 20, 174 + (i % 3) * 2, 4, 2, "#d6c7c6");
  for (let i = 0; i < 8; i++)
    r(303 + (i % 2) * 10 - Math.floor(i / 2) * 4, 193 + i * 6, 3, 2, "#d6c7c6");
  const window = (x: number, y: number, w = 12, h = 15) => {
    r(x, y, w, h, ink);
    r(x + 2, y + 2, w - 4, h - 4, "#f7d99b");
    r(x + Math.floor(w / 2), y + 1, 2, h - 2, ink);
    r(x + 1, y + Math.floor(h / 2), w - 2, 2, ink);
    r(x - 2, y + h, w + 4, 3, "#fefcfc");
  };
  const roof = (
    x: number,
    y: number,
    w: number,
    color: string,
    dark: string,
  ) => {
    r(x + 12, y, w - 24, 5, ink);
    r(x + 6, y + 5, w - 12, 7, ink);
    r(x, y + 12, w, 15, ink);
    r(x + 13, y + 3, w - 26, 6, color);
    r(x + 8, y + 8, w - 16, 7, color);
    r(x + 3, y + 15, w - 6, 9, color);
    for (let i = 11; i < w - 8; i += 12) r(x + i, y + 16, 2, 7, dark);
    if (winter) {
      r(x + 10, y + 1, w - 20, 4, snow);
      r(x + 5, y + 6, w - 10, 4, snow);
      r(x, y + 13, 11, 5, snow);
      r(x + w - 12, y + 13, 12, 6, snow);
      r(x - 2, y + 25, w + 4, 3, snow);
    }
  };
  // About: a rosy cottage, flower box and chimney.
  r(128, 91, 10, 23, ink);
  r(130, 93, 6, 18, "#ba969b");
  r(126, 89, 14, 4, winter ? snow : ink);
  r(101, 124, 65, 40, ink);
  r(104, 126, 59, 36, "#f0dcd1");
  r(104, 155, 59, 7, "#e3c5bf");
  roof(93, 106, 81, "#d69aa9", "#bd7f93");
  window(111, 137);
  window(147, 137);
  r(128, 140, 14, 24, ink);
  r(130, 142, 10, 22, "#ad8c91");
  r(137, 152, 2, 2, "#f5d399");
  r(126, 164, 18, 4, "#c8b6b5");
  r(123, 168, 24, 3, winter ? snow : "#e4d7c4");
  // Projects: a two-storey workshop with a striped awning.
  r(280, 107, 78, 59, ink);
  r(283, 109, 72, 55, "#e4ddec");
  roof(271, 88, 96, "#a69ebf", "#8d86a7");
  window(290, 119, 16, 16);
  window(331, 119, 16, 16);
  r(310, 113, 17, 19, ink);
  r(312, 115, 13, 15, "#eee4ed");
  r(314, 119, 3, 3, "#a78fad");
  r(320, 119, 3, 3, "#a78fad");
  r(316, 125, 5, 2, "#a78fad");
  r(283, 137, 72, 4, ink);
  for (let i = 0; i < 8; i++) {
    r(282 + i * 9, 139, 9, 7, i % 2 ? "#eee7ef" : "#a79ab9");
    r(282 + i * 9, 146, 9, 3, i % 2 ? "#ded4e0" : "#9384a7");
  }
  window(290, 151, 16, 12);
  window(332, 151, 16, 12);
  r(312, 147, 15, 19, ink);
  r(314, 150, 11, 16, "#9e8ba9");
  r(322, 158, 2, 2, "#f5d399");
  r(309, 166, 21, 4, "#c3b6c8");
  // Blog: a mint bookshop with books visible in the window.
  r(463, 123, 69, 41, ink);
  r(466, 125, 63, 37, "#e0e7d6");
  roof(455, 104, 85, "#8ca99c", "#739184");
  r(471, 136, 30, 23, ink);
  r(473, 138, 26, 19, "#efdab6");
  ["#a493b5", "#bd8d9b", "#7e9e91", "#bd9b76", "#9a9cbb"].forEach((c, i) =>
    r(475 + i * 4, 143 + (i % 2) * 2, 3, 11 - (i % 2) * 2, c),
  );
  r(473, 153, 26, 2, "#8c7774");
  r(508, 136, 14, 28, ink);
  r(510, 138, 10, 25, "#9db2a2");
  r(511, 140, 8, 10, "#f3d69e");
  r(517, 155, 2, 2, "#65566b");
  r(505, 164, 20, 4, "#bdc6b6");
  // Hand-painted shop sign: a tiny open book.
  r(485, 113, 22, 12, "#f9f1df");
  r(489, 115, 6, 6, "#a591a1");
  r(497, 115, 6, 6, "#a591a1");
  r(495, 116, 2, 7, ink);
  // Fences and lamps keep their snow caps in winter only.
  const fence = (x: number, y: number, n: number) => {
    r(x, y + 5, n * 10, 3, "#c0a9a2");
    r(x, y + 13, n * 10, 3, "#c0a9a2");
    for (let i = 0; i <= n; i++) {
      r(x + i * 10, y + 2, 3, 19, "#bda5a1");
      r(x + i * 10 - 1, y, 5, 3, winter ? snow : "#d2baa8");
    }
  };
  fence(174, 144, 6);
  fence(548, 145, 4);
  fence(24, 157, 5);
  const lamp = (x: number, y: number) => {
    r(x, y + 8, 3, 28, ink);
    r(x - 4, y + 2, 11, 12, ink);
    r(x - 2, y + 4, 7, 7, "#f9dda3");
    r(x - 5, y, 13, 3, winter ? snow : ink);
    r(x - 2, y + 35, 7, 3, ink);
  };
  lamp(247, 135);
  lamp(438, 139);
  // The mailbox leads to contact.
  r(395, 181, 5, 19, "#90777f");
  r(386, 167, 24, 17, ink);
  r(389, 165, 18, 3, ink);
  r(388, 170, 20, 11, "#ce929f");
  r(390, 168, 15, 3, "#e7b0b7");
  r(393, 173, 9, 2, ink);
  r(409, 166, 3, 12, "#b97d91");
  r(412, 166, 6, 4, "#e5ae9d");
  r(385, 166, 22, 3, winter ? snow : "#e7b0b7");
  // Foreground trees frame the village.
  tree(18, 112, 1.5);
  tree(58, 138, 1.15);
  tree(578, 113, 1.6);
  tree(548, 181, 1.2);
  tree(7, 194, 1.4);
  tree(192, 192, 0.95);
  if (winter) {
    // A snowman belongs to winter, never to the other three seasons.
    r(114, 201, 14, 13, "#ded9e4");
    r(112, 198, 16, 13, snow);
    r(115, 190, 11, 10, snow);
    r(117, 194, 2, 2, ink);
    r(123, 194, 2, 2, ink);
    r(121, 197, 5, 2, "#d7a080");
    r(114, 199, 14, 3, "#ba8f9d");
    r(123, 201, 3, 6, "#ba8f9d");
    r(114, 189, 13, 3, ink);
    r(117, 184, 8, 5, "#9f8a9e");
  } else if (season === "autumn") {
    // A pair of little pumpkins beside a pile of fallen leaves.
    r(113, 201, 15, 10, "#c38d62");
    r(110, 203, 21, 6, "#dba471");
    r(119, 199, 3, 12, "#b98560");
    r(120, 196, 3, 4, "#7f8f64");
    r(133, 206, 11, 7, "#d6b078");
    r(137, 203, 2, 4, "#7f8f64");
    r(106, 214, 40, 2, palette.speck);
  } else {
    // Flower planters: soft spring blooms, tall sunny summer flowers.
    r(111, 204, 22, 10, "#be9585");
    r(109, 202, 26, 4, "#d2ac96");
    for (let i = 0; i < 3; i++) {
      const x = 114 + i * 7;
      const y = season === "summer" ? 188 + (i % 2) * 3 : 195 - (i % 2) * 3;
      r(x, y + 3, 2, 202 - y, "#7f9b73");
      r(x - 2, y, 6, 4, season === "spring" ? "#dda7bd" : "#e1bd71");
      r(x, y + 1, 2, 2, season === "spring" ? "#fff0cf" : "#a88d62");
    }
  }
  // Season-colored shrubs and tiny details scattered across the ground.
  [
    [81, 192],
    [224, 177],
    [372, 149],
    [465, 202],
    [518, 185],
    [160, 226],
    [355, 224],
  ].forEach(([x, y]) => {
    r(x, y, 13, 6, palette.bush[0]);
    r(x + 3, y - 3, 7, 4, palette.bush[1]);
    if (winter) r(x - 1, y, 15, 2, snow);
    r(x + 9, y + 2, 2, 2, season === "summer" ? "#e3c67f" : "#d8a0ad");
  });
  for (let i = 0; i < 60; i++) {
    const x = (i * 137 + 17) % 640;
    const y = 131 + ((i * 53) % 109);
    if (y < 163 && x > 90 && x < 540) continue;
    r(x, y, 2 + (i % 3), 1, palette.speck);
    if (season === "autumn" && i % 3 === 0) {
      r(x, y - 1, 3, 2, i % 2 ? "#c89977" : "#d2b075");
    } else if (season === "spring" && i % 5 === 0) {
      r(x, y - 1, 2, 2, "#e3b1c3");
    } else if (season === "summer" && i % 4 === 0) {
      r(x, y - 2, 1, 3, "#9fbd88");
    }
  }
  // A sleeping pink cat near the workshop.
  r(345, 185, 12, 5, "#b992a3");
  r(347, 182, 8, 6, "#d8adba");
  r(347, 180, 2, 3, "#c59caa");
  r(353, 180, 2, 3, "#c59caa");
  r(348, 184, 2, 1, ink);
  r(353, 184, 2, 1, ink);
  r(357, 184, 4, 2, "#b992a3");
}
