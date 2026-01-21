import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontDisplay, fontSans } from "@/config/fonts";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontDisplay.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col">
            <header className="w-full border-b border-default-200/60 bg-content1/70 backdrop-blur sticky top-0 left-0 right-0 z-50">
              <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                <Link
                  className="font-display text-lg font-bold tracking-tight leading-none text-foreground flex flex-col"
                  href="/"
                >
                  <span className="block">Rick &amp; Morty</span>
                  <span className="block">Explorer</span>
                </Link>
                <ThemeSwitch />
              </div>
            </header>
            <main className="container mx-auto max-w-7xl flex-grow p-0 sm:px-6 sm:py-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
