import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getMediumPosts } from "@/lib/medium";

export async function FeaturedWriting() {
  const posts = await getMediumPosts();
  const featured = posts.slice(0, 3); // show 3 most recent

  return (
    <section
      id="featured-writing"
      className="py-16 border-t border-[var(--border)]"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Writing</h2>
        <Link
          href="/writing"
          id="featured-writing-view-all"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150"
        >
          All writing
          <ArrowRight size={13} />
        </Link>
      </div>

      <div>
        {featured.map((post) => (
          <Link
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            id={`featured-writing-${post.id}`}
            className="group flex items-start justify-between gap-4 py-4 border-b border-[var(--border)] last:border-0 hover:opacity-75 transition-opacity duration-150"
          >
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                {post.title}
              </h3>
              {post.subtitle && (
                <p className="text-sm text-[var(--muted-foreground)] leading-snug">
                  {post.subtitle}
                </p>
              )}
            </div>
            <ArrowUpRight
              size={14}
              className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-150"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
