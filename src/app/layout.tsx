import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Specific Industries",
  description: "Specific Industries",
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
