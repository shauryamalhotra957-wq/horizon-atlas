import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://horizon-atlas-lab.shauryamalhotra957.chatgpt.site"),
  title: "Horizon Atlas — Design What Happens Next",
  description: "An interactive planetary intelligence lab for exploring how today's decisions reshape tomorrow's world.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Horizon Atlas — Design What Happens Next",
    description: "Move a lever. Watch the world respond.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 936, alt: "Horizon Atlas planetary intelligence lab" }],
  },
  twitter: { card: "summary_large_image", title: "Horizon Atlas", description: "Design what happens next.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
