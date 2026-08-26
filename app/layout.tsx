import type { Metadata } from "next";
import { Work_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISSDA4PH",
  description: "WEB APP MONITORING FOR ISSDA4PH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${geistMono.variable} antialiased bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100`}
    >
      <body className="bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100">{children}</body>
    </html>
  );
}
