import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NavBar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackToTop } from "@/components/ui/BackToTop";
import { PageTransition } from "@/components/ui/PageTransition";
import { MagneticGrid } from "@/components/ui/MagneticGrid";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { siteConfig } from "@/lib/data";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.tagline} ${siteConfig.bio}`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
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
          <MagneticGrid />
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
