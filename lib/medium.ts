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

/** Extracts the text in a given XML tag from a string */
function getTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? stripCDATA(m[1]).trim() : "";
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
  if (m) return m[1].replace(/<[^>]+>/g, "").trim();
  // Fallback: strip all HTML tags
  return descriptionHtml.replace(/<[^>]+>/g, "").trim().slice(0, 150);
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
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 }, // revalidate once per hour
    });
    if (!res.ok) return [];
    const xml = await res.text();

    // Split on <item> boundaries
    const itemBlocks = xml.split("<item>").slice(1);

    return itemBlocks.map((block, idx) => {
      const title = getTag(block, "title");
      const link = getTag(block, "link");
      const pubDate = getTag(block, "pubDate");
      const description = getTag(block, "description");
      const tags = getAllTags(block, "category").slice(0, 4);

      const date = pubDate
        ? new Date(pubDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      return {
        id: `medium-${idx}`,
        title,
        subtitle: extractSnippet(description),
        date,
        href: cleanHref(link),
        tags,
      };
    });
  } catch {
    return [];
  }
}
