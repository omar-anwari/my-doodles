import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omar's Doodles",
  description: "My doodles, sporadically updated",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col selection:bg-(--accent) selection:text-white">{children}</body>
    </html>
  );
}
