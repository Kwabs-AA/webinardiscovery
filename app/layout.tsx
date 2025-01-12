"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 const metadata: Metadata = {
  title: "Webinar",
  description: "Teach the world.",
  icons: {
    icon: [
      { url: '/webinarlogo.png', type: 'image/png' },
    ],
    shortcut: ['/webinarlogo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noHeaderRoutes=['/signin','/signup','/success']
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/webinarlogo.png" type="image/png" />
        <title>Webinar</title>
        <meta name="description" content="Teach the world." />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!noHeaderRoutes.includes(pathname)? (
          <Navbar>
          {children}
          <Toaster/>
          </Navbar>
        
        ): <main>{children}</main>}
       
      </body>
    </html>
  );
}
