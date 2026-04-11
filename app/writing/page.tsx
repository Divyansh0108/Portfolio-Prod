import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TagPill } from "@/components/ui/TagPill";
import { getMediumPosts } from "@/lib/medium";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays, guides, and technical deep-dives — published on Medium.",
  alternates: {
    types: {
      "application/rss+xml": "https://medium.com/feed/@divyanshpandey0108",
    },
  },
};

// ISR: revalidate page every 30 minutes — Medium posts don't update frequently
export const revalidate = 1800;

export default async function WritingPage() {
  const posts = await getMediumPosts();

  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  const articlesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Writing by Divyansh Pandey",
    url: `${baseUrl}/writing`,
    itemListElement: posts.map((post, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Article",
        headline: post.title,
        description: post.subtitle,
        datePublished: post.date,
        url: post.href,
        author: {
          "@type": "Person",
          name: "Divyansh Pandey",
          url: baseUrl,
        },
      },
    })),
  };

  return (
    <div className="pt-32 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesJsonLd) }}
      />
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          Essays &amp; Guides
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Writing
        </h1>
        <p className="mt-2 text-[0.925rem] text-[var(--muted-foreground)] max-w-lg">
          Technical deep-dives and build logs, published on{" "}
          <Link
            href="https://medium.com/@divyanshpandey0108"
            target="_blank"
            rel="noopener noreferrer"
            className="colored-link underline underline-offset-2"
          >
            Medium
          </Link>
          .
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-[var(--muted-foreground)]">
          No posts found. Check back soon.
        </p>
      ) : (
        <div>
          {posts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <Link
                key={post.id}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                id={`writing-${post.id}`}
                className="group flex items-start justify-between gap-4 py-5 border-b border-[var(--border)] last:border-0 hover:opacity-75 transition-opacity duration-150"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="text-xs text-[var(--muted-foreground)] font-medium">
                    {formattedDate}
                  </span>
                  <h2 className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                    {post.title}
                  </h2>
                  {post.subtitle && (
                    <p className="text-sm text-[var(--muted-foreground)] leading-snug">
                      {post.subtitle}
                    </p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {post.tags.map((tag) => (
                        <TagPill key={tag} label={tag} />
                      ))}
                    </div>
                  )}
                </div>
                <ArrowUpRight
                  size={14}
                  className="mt-1 flex-shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-150"
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
