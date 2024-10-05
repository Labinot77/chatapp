import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Shared/asideNav";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className="h-screen flex max-w-7xl mx-auto text-primary bg-background overflow-hidden">
        {children}
        </main>
  );
}
