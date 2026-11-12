import type { Season } from "@/lib/seasons";

// Shared building geometry; each season changes the landscape and vegetation.
export const seasonPalettes = {
  spring: {
    sky: "#f3e5ee",
    horizon: "#f8edf0",
    cloud: "#fff9f8",
    sun: "#fff1c9",
    mountains: ["#cfceda", "#ddd4df"],
    ground: ["#e2ecd6", "#edf2df"],
    leaf: ["#dba8bd", "#bf879e"],
    distantLeaf: ["#e0c3d0", "#cdaabc"],
    alternateLeaf: ["#a5bf94", "#84a67d"],
    highlight: "#efd0da",
    bush: ["#a7c397", "#c2d6aa"],
    path: "#ebdfce",
    pathEdge: "#d8cab8",
    speck: "#c7d6b3",
  },
  summer: {
    sky: "#dfeff0",
    horizon: "#ebf4ed",
    cloud: "#fbfcf0",
    sun: "#ffe6a1",
    mountains: ["#b8cfbf", "#ccdcc7"],
    ground: ["#cddfba", "#e1eccb"],
    leaf: ["#80a58a", "#5f886e"],
    distantLeaf: ["#a5c4ab", "#8eaf98"],
    alternateLeaf: ["#9ab681", "#7b9c68"],
    highlight: "#b9d2a3",
    bush: ["#8eaf7e", "#aec891"],
    path: "#e7dec2",
    pathEdge: "#d0c4a4",
    speck: "#b3cb9e",
  },
  autumn: {
    sky: "#f1e3dc",
    horizon: "#f7eadd",
    cloud: "#fff7ec",
    sun: "#ffe4ac",
    mountains: ["#d7c6bb", "#dfd0bc"],
    ground: ["#e9dfc5", "#f3ead5"],
    leaf: ["#d5aa71", "#b98a63"],
    distantLeaf: ["#d7c39e", "#c5ad87"],
    alternateLeaf: ["#cf9b89", "#b88075"],
    highlight: "#ebca91",
    bush: ["#c2b287", "#d6c69a"],
    path: "#e4d4c4",
    pathEdge: "#ccbaa8",
    speck: "#d6bf97",
  },
  winter: {
    sky: "#e9e5f2",
    horizon: "#eee9f2",
    cloud: "#f9f5fa",
    sun: "#fff4d9",
    mountains: ["#d1cde3", "#d8d2e5"],
    ground: ["#f4f2f6", "#faf7f7"],
    leaf: ["#72978e", "#567d75"],
    distantLeaf: ["#b4c8c2", "#a4bdb6"],
    alternateLeaf: ["#72978e", "#567d75"],
    highlight: "#c0d3c9",
    bush: ["#b2c6b7", "#c1d2c2"],
    path: "#ebe0dc",
    pathEdge: "#e2d5d2",
    speck: "#e5dfe9",
  },
} satisfies Record<
  Season,
  {
    sky: string;
    horizon: string;
    cloud: string;
    sun: string;
    mountains: string[];
    ground: string[];
    leaf: string[];
    distantLeaf: string[];
    alternateLeaf: string[];
    highlight: string;
    bush: string[];
    path: string;
    pathEdge: string;
    speck: string;
  }
>;
