// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
import { Metadata } from "next/types";
import Footer from "@/components/Footer";

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
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />

        {children}

        <Footer />
      </body>
    </html>
  );
}
