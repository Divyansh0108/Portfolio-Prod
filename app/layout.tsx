import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NavBar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackToTop } from "@/components/ui/BackToTop";
import { PageTransition } from "@/components/ui/PageTransition";
import { ParticleConstellation } from "@/components/ui/ParticleConstellation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { siteConfig, getBaseUrl } from "@/lib/data";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

// Keep description under ~160 chars for SEO snippets — concatenating the full
// bio overflows and gets truncated awkwardly in search results.
const SEO_DESCRIPTION = `${siteConfig.tagline} ML Engineer & Researcher with 2+ years building production-grade ML, NLP, CV, and AI Agent systems.`;

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "ML Engineer",
    "Machine Learning",
    "AI Researcher",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "AI Agents",
    "LLM",
    "Federated Learning",
    "Neurosymbolic AI",
    "Divyansh Pandey",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: SEO_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: SEO_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to main content — keyboard accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-[var(--background)] focus:border focus:border-[var(--border)] focus:rounded-md focus:text-sm focus:font-medium focus:text-[var(--foreground)] focus:shadow-sm"
          >
            Skip to content
          </a>
          <ParticleConstellation />
          <ScrollProgress />
          <GrainOverlay />
          <CustomCursor />
          <NavBar />
          <main id="main-content" className="mx-auto max-w-3xl px-6">
            <PageTransition>{children}</PageTransition>
          </main>
          <div className="mx-auto max-w-3xl px-6">
            <Footer />
          </div>
          <BackToTop />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
