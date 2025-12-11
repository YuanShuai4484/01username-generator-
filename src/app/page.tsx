import { UsernameGenerator } from "@/components/username-generator";
import { absoluteUrl, siteConfig } from "@/lib/config";

const features = [
  {
    title: "Style presets",
    description:
      "Pick aesthetic, gaming, edgy, or brand styles. Add your own vibe to guide username generator results.",
  },
  {
    title: "Length control",
    description: "Short, medium, or long usernames that fit platform limits without losing brand clarity.",
  },
  {
    title: "Availability hints",
    description:
      "Quick-screen social and domain availability hints to avoid taken usernames before deep checks.",
  },
  {
    title: "Copy & save",
    description: "Copy a username idea with one tap. Future: bookmarks and CSV export for team sharing.",
  },
];

const faqs = [
  {
    q: "Is availability guaranteed?",
    a: "The username generator shows quick availability hints to help you scan fast, but no tool can guarantee a handle or domain is free. Always check the platform, registrar, and trademarks directly before launching a brand or creator profile.",
  },
  {
    q: "Can I use these names commercially?",
    a: "Generated usernames are creative suggestions. If you plan to use a handle for business, register domains, or publish on social platforms, perform trademark searches and check for similar brands to avoid conflicts.",
  },
  {
    q: "Do you store my inputs?",
    a: "Inputs are processed in the username generator to create suggestions and are not stored long term. No sign-up is required, and you can refresh or clear your keyword and style at any time.",
  },
  {
    q: "How do I improve results?",
    a: "Add a niche keyword plus a style, then regenerate until you see unique usernames you like. Try short length for TikTok and Instagram, medium for YouTube and Twitch, and keep brand words consistent across social profiles.",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/username-generator")}?keyword={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, faqSchema]) }}
      />
      <section className="mt-4 grid gap-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-10 shadow-sm md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            username generator
          </span>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Versatile username generator for social, gaming, and brands.
          </h1>
          <p className="text-lg text-slate-700">
            Generate usernames with style presets, control length, and screen availability hints for
            social platforms and domains. This username generator is built for creators, gamers, and
            founders who need unique, brandable handles fast.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#generator"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Generate now
            </a>
            <a
              href="#faq"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-200 hover:text-indigo-700"
            >
              How it works
            </a>
          </div>
          <p className="text-sm text-slate-600">
            Built for fast ideation: smart presets, tuned copy, and instant suggestions.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <ul className="space-y-3">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"
              >
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold uppercase tracking-tight text-white">
                  OK
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    {feature.title}
                  </p>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <UsernameGenerator />

      <section
        id="faq"
        className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-[1fr,2fr]"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Launch-ready details
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Built for clarity and conversions: thoughtful copy, links, and user-first answers.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="font-semibold text-slate-900">{item.q}</p>
              <p className="text-sm text-slate-700">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
