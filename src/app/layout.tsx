import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/nextui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaraNext",
  description: "This is a Nextjs UI for authentication with laravel breeze.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
