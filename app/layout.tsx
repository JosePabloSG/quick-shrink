import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Toaster } from "react-hot-toast";

import SessionAuthProvider from "@/context/session-auth.provider";
import ReactQueryProvider from "@/context/tanstack-query.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickShrink",
  description: "QuickShrink is a URL shortener service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning
      >
        <SessionAuthProvider>
          <ReactQueryProvider>
            <Toaster />
            {children}
          </ReactQueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
