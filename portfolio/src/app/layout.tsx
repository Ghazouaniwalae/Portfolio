import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PortalProvider } from "@/lib/portal-context";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MarginRail } from "@/components/ui/MarginRail";
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://walaghazouani.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Wala Eddine Ghazouani — AI Systems & Automation",
  description:
    "Workflow automation, document processing, AI integration, and forecasting — multi-agent systems built end to end for real business problems.",
  openGraph: {
    title: "Wala Eddine Ghazouani — AI Systems & Automation",
    description:
      "Workflow automation, document processing, AI integration, and forecasting — multi-agent systems built end to end for real business problems.",
    url: siteUrl,
    siteName: "Wala Eddine Ghazouani",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wala Eddine Ghazouani — AI Systems & Automation",
    description:
      "Workflow automation, document processing, AI integration, and forecasting — multi-agent systems built end to end.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <PortalProvider>
          <ScrollProgress />
          <MarginRail />
          {children}
        </PortalProvider>
      </body>
    </html>
  );
}
