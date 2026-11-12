export function PixelCharacter({ className = "" }: { className?: string }) {
  const rows = [
    "....hhhhhh......",
    "...hhhhhhhh.....",
    "..hhhhhhhhhh....",
    "..hhhhhhhhhh....",
    "..hhsssssshh....",
    "..hhsesseshh....",
    "...ssssssss.....",
    "....ssmss.......",
    "...pppppppp.....",
    "..spppppppps....",
    "..spppppppps....",
    "...pppppppp.....",
    "....llllll......",
    "....ll..ll......",
    "...ddd..ddd.....",
    "................",
  ];
  const colors: Record<string, string> = {
    h: "#69576a",
    s: "#f4d4bd",
    e: "#57465a",
    m: "#c78e9d",
    p: "#b296b7",
    l: "#6d7d8e",
    d: "#685869",
  };
  return (
    <svg
      className={`pixel-character ${className}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          colors[c] ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="1"
              height="1"
              fill={colors[c]}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
