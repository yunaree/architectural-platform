import type { Metadata } from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import {SiteHeader} from "@/components/shared/site-header";

export const metadata: Metadata = {
  title: "ArchiCompare",
  description: "Architectural comparison platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
      <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <SiteHeader/>
          {children}
      </ThemeProvider>
      </body>
      </html>
  );
}
