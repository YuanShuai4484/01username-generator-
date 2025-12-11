export const siteConfig = {
  name: "Username Generator",
  description:
    "Generate unique usernames with style presets and availability hints for gaming, social, and brands.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://username-generator.app",
  twitter: "@usernamegen",
  ogImage: undefined as string | undefined,
};

export const absoluteUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  try {
    return new URL(normalizedPath, siteConfig.url).toString();
  } catch {
    return normalizedPath;
  }
};
