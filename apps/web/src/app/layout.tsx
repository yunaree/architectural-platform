import type { Metadata } from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import {SiteHeader} from "@/components/shared/site-header";
import {SiteFooter} from "@/components/shared/site-footer";
import { SnowProvider } from "@/context/snow-context";
import {SnowOverlay} from "@/components/features/snowfall/snow-overlay";
import {SnowToggle} from "@/components/features/snowfall/snow-toggle";

export const metadata: Metadata = {
  title: "ArchiCompare",
  description: "Architectural comparison platform",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                inter.variable // Додав змінну шрифта, щоб font-sans працював коректно
            )}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SnowProvider>
                <SnowOverlay />
                <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <main className="flex-1">
                        {children}
                    </main>
                    <SiteFooter />
                </div>

                <div className="fixed bottom-6 right-6 z-50 hidden md:block">
                    {/* Можна використати variant="minimal", якщо хочеш просто кружечок */}
                    <SnowToggle variant="full" className="shadow-lg border-primary/20" />
                </div>

                <div className="fixed bottom-4 left-4 z-50 md:hidden">
                    <SnowToggle variant="minimal" className="bg-background/80 backdrop-blur border shadow-md" />
                </div>

            </SnowProvider>
        </ThemeProvider>
        </body>
        </html>
  );
}
