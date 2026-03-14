import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Chat Widget",
  description: "Open Chat Widget landing page ported to Next.js with OpenChatWidget installed.",
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
