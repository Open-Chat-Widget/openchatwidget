import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Chat Widget",
  description: "Open Chat Widget is the Open Source AI Chat Widget for your website. Use it for customer service (free Intercom Fin alternative), knowledge base / documentation search, onboarding assistant, and more. Build great AI chat experiences for your users.",
  icons: {
    icon: "/helpfulchat-logo.svg",
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
