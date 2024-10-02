import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Shared/navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className="h-screen flex max-w-7xl mx-auto text-gray-900 overflow-hidden">
        {children}
        </main>
  );
}
