import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zarin Roushan — Designer of experiences, builder of things",
  description:
    "The personal portfolio of Zarin Roushan — a developer exploring creative technology, AI, and interactive experiences.",
  metadataBase: new URL("https://zarin.world"),
  openGraph: {
    title: "Zarin Roushan — zarin.world",
    description: "A little world of ideas, experiments & things I've built.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}