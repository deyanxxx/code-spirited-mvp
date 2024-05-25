import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Spirited - P2P Coding Bootcamp",
  description: "A P2P Coding Bootcamp",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
