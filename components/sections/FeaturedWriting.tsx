import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getMediumPosts } from "@/lib/medium";

export async function FeaturedWriting() {
  const posts = await getMediumPosts();
  const featured = posts.slice(0, 3); // show 3 most recent

  return (
    <section
      id="featured-writing"
      className="py-12 border-t border-[var(--border)]"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Writing</h2>
        <Link
          href="/writing"
          id="featured-writing-view-all"
          className="group inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] transition-[transform,color] duration-200 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:text-[var(--foreground)] active:translate-y-0 active:scale-95"
        >
          All writing
          <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-col">
        {featured.map((post) => (
          <Link
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            id={`featured-writing-${post.id}`}
            className="group -mx-3 flex items-start justify-between gap-4 rounded-lg px-3 py-4 transition-[transform,background-color] duration-200 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] active:translate-y-0"
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
              className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)] transition-all duration-150 group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
