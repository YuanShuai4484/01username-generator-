export type UsernameLength = "short" | "medium" | "long";

export type GeneratorOptions = {
  keyword?: string;
  style?: string;
  length?: UsernameLength;
  count?: number;
};

const adjectives = [
  "Swift",
  "Lunar",
  "Nova",
  "Echo",
  "Pixel",
  "Aether",
  "Shadow",
  "Solar",
  "Binary",
  "Velvet",
  "Quantum",
  "Arctic",
  "Neon",
  "Glitch",
  "Serene",
  "Zephyr",
  "Crimson",
  "Azure",
  "Ivory",
  "Obsidian",
];

const nouns = [
  "Pilot",
  "Quest",
  "Forge",
  "Atlas",
  "Script",
  "Bloom",
  "Glyph",
  "Signal",
  "Pulse",
  "Circuit",
  "Dream",
  "Hive",
  "Studio",
  "Lab",
  "Realm",
  "Canvas",
  "Trove",
  "Runner",
  "Loop",
  "Beacon",
];

const suffixes = [
  "",
  "HQ",
  "Lab",
  "Ops",
  "Dev",
  "Play",
  "Hub",
  "Works",
  "Core",
  "Verse",
];

const separators = ["", "", "", "_", ".", "-"];

const lengthLimits: Record<UsernameLength, number> = {
  short: 8,
  medium: 12,
  long: 18,
};

const clean = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "");

const clip = (value: string, length?: UsernameLength) => {
  if (!length) return value;
  const limit = lengthLimits[length] ?? 12;
  return value.slice(0, limit);
};

const titleCase = (value: string) =>
  value.length ? value[0].toUpperCase() + value.slice(1) : value;

export const generateUsernameCandidates = (options: GeneratorOptions = {}) => {
  const { keyword = "Nova", style = "clean", length = "medium", count = 24 } =
    options;

  const pool: string[] = [];
  const cleanedKeyword = clean(keyword) || "Nova";
  const styleHint = clean(style);

  for (let i = 0; i < count * 2; i++) {
    const adjective = adjectives[(i * 7) % adjectives.length];
    const noun = nouns[(i * 5 + 3) % nouns.length];
    const suffix = suffixes[(i * 11 + 2) % suffixes.length];
    const separator = separators[(i * 13 + 1) % separators.length];

    const parts = [
      titleCase(cleanedKeyword),
      styleHint ? titleCase(styleHint) : adjective,
      noun,
    ]
      .filter(Boolean)
      .slice(0, 2 + Number(Math.random() > 0.35));

    const base = parts.join(separator);
    const withSuffix = suffix ? `${base}${separator}${suffix}` : base;
    const clipped = clip(withSuffix, length);

    if (clipped.length >= 4) {
      pool.push(clipped);
    }
  }

  const unique = Array.from(new Set(pool));
  return unique.slice(0, count);
};

export const suggestedStyles = [
  "minimal",
  "aesthetic",
  "edgy",
  "cyber",
  "gaming",
  "brand",
  "cute",
];

export const suggestedLengths: UsernameLength[] = ["short", "medium", "long"];
