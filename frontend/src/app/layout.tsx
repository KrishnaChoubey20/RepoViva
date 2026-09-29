import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "RepoViva | Your code. Your voice. Your interview.",
  description: "Turn your GitHub repository into a personalized technical interview experience.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans bg-cream-50 text-navy-900 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
