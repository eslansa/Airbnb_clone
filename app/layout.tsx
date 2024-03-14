import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adrenalina y Turismo",
  description: "Clone Airbnb llamado Adrenalina y Turismo",
};

export const runtime = 'edge';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/imagotipo.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
