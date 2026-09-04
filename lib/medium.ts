export interface MediumPost {
  id: string;
  title: string;
  subtitle: string;       // feed snippet / first sentence
  date: string;           // ISO date string
  href: string;           // canonical Medium URL (stripped of ?source=rss query)
  tags: string[];
}

const FEED_URL = "https://medium.com/feed/@divyanshpandey0108";

/** Strips CDATA wrappers from RSS text nodes */
function stripCDATA(raw: string): string {
  return raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘",
  rdquo: "”", ldquo: "“",
};

/** Decodes numeric (&#x2019; / &#8217;) and common named HTML entities */
function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

/** Extracts the text in a given XML tag from a string */
function getTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? decodeEntities(stripCDATA(m[1]).trim()) : "";
}

/** Extracts all values for a repeated tag (e.g. <category>) */
function getAllTags(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const val = stripCDATA(m[1]).trim();
    if (val) results.push(val);
  }
  return results;
}

/** Extracts the snippet text from Medium's HTML description blob */
function extractSnippet(descriptionHtml: string): string {
  // Medium wraps a <p class="medium-feed-snippet">…</p> in the description
  const m = descriptionHtml.match(
    /class="medium-feed-snippet"[^>]*>([\s\S]*?)<\/p>/i
  );
  if (m) return decodeEntities(m[1].replace(/<[^>]+>/g, "").trim());
  // Fallback: strip all HTML tags
  return decodeEntities(descriptionHtml.replace(/<[^>]+>/g, "").trim()).slice(0, 150);
}

/** Strips UTM/source query params from Medium links */
function cleanHref(href: string): string {
  try {
    const url = new URL(href);
    url.search = "";
    return url.toString();
  } catch {
    return href;
  }
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 }, // revalidate once per hour
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) return [];
    const xml = await res.text();

    // Split on <item> boundaries
    const itemBlocks = xml.split("<item>").slice(1);

    const posts = itemBlocks
      .map((block, idx) => {
        const title = getTag(block, "title");
        const link = getTag(block, "link");
        const pubDate = getTag(block, "pubDate");
        const description = getTag(block, "description");
        const tags = getAllTags(block, "category").slice(0, 4);

        // Skip malformed items missing the essentials.
        if (!title || !link) return null;

        const parsed = pubDate ? new Date(pubDate) : null;
        const date =
          parsed && !Number.isNaN(parsed.getTime())
            ? parsed.toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0];

        return {
          id: `medium-${idx}`,
          title,
          subtitle: extractSnippet(description),
          date,
          href: cleanHref(link),
          tags,
        } as MediumPost;
      })
      .filter((p): p is MediumPost => p !== null);

    // Sort newest-first defensively — RSS feeds usually do this but not always.
    return posts.sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}
