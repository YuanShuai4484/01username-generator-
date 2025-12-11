"use client";

import { useEffect, useMemo, useState } from "react";
import {
  GeneratorOptions,
  generateUsernameCandidates,
  suggestedLengths,
  suggestedStyles,
} from "@/lib/generator";

type UsernameGeneratorProps = {
  heading?: string;
  defaultKeyword?: string;
  defaultStyle?: string;
  defaultLength?: GeneratorOptions["length"];
};

const availabilityLabels = [
  "IG",
  "TikTok",
  "YouTube",
  "X",
  "Twitch",
  "Domain",
];

export function UsernameGenerator({
  heading = "Username Generator",
  defaultKeyword = "",
  defaultStyle = "minimal",
  defaultLength = "medium",
}: UsernameGeneratorProps) {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [style, setStyle] = useState(defaultStyle);
  const [length, setLength] = useState(defaultLength);
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<string>("");

  const displayedHeading = useMemo(
    () => (keyword ? `${heading}: ${keyword}` : heading),
    [heading, keyword],
  );

  const regenerate = (
    keywordValue = keyword,
    styleValue = style,
    lengthValue = length,
  ) => {
    setResults(
      generateUsernameCandidates({
        keyword: keywordValue || defaultKeyword || "Nova",
        style: styleValue || defaultStyle,
        length: lengthValue,
        count: 16,
      }),
    );
  };

  // Post-hydration generation to avoid server/client mismatch from randomness.
  useEffect(() => {
    regenerate(defaultKeyword, defaultStyle, defaultLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultKeyword, defaultStyle, defaultLength]);

  const copyName = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      setCopied("");
    }
  };

  return (
    <section
      id="generator"
      className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-slate-100"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Instant ideas
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {displayedHeading}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Add a keyword, pick a style, choose a length. Results refresh on
            click. Availability hints are for quick screening.
          </p>
        </div>
        <button
          type="button"
          onClick={() => regenerate()}
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Regenerate
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Keyword
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="brand, vibe, or niche"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Style
          <div className="flex flex-wrap gap-2">
            {suggestedStyles.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setStyle(item)}
                className={`rounded-full border px-3 py-2 text-sm capitalize transition ${
                  style === item
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
            <input
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="custom style"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Length
          <div className="flex flex-wrap gap-2">
            {suggestedLengths.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setLength(item)}
                className={`rounded-full border px-3 py-2 text-sm capitalize transition ${
                  length === item
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {results.map((name) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900">{name}</span>
              <span className="text-xs text-slate-500">
                Availability hints: {availabilityLabels.join(" | ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                Suggested
              </span>
              <button
                type="button"
                onClick={() => copyName(name)}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
              >
                {copied === name ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
