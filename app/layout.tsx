import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Headers from "@/components/Headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TickRush",
  description:
    "Crypto screener app with a built-in high frequency terminal & Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Headers />
        {children}
      </body>
    </html>
  );
}
