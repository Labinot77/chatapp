import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Shared/asideNav";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  if (!session) {
    return redirect("/authentication/sign-in")
  }

  return (
 
        <main className="h-screen bg-background text-gray-900 overflow-hidden p-1">
          <div className="h-full flex max-w-7xl mx-auto bg-secondary rounded-lg shadow-2xl p-1">
        <Navbar  />
        <div className="p-3 w-full">
        {children}
        </div>
          </div>
        </main>
  );
}
