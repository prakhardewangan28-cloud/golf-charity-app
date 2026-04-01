import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "@/components/layout/NavigationWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GolfCharity | Premium Subscription Platform",
  description: "Play your rounds, track your scores, and contribute to meaningful causes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationWrapper>
          {children}
        </NavigationWrapper>
      </body>
    </html>
  );
}
