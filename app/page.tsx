import type { Metadata } from "next";

import { ExplorerPage } from "@/components/explorer/ExplorerPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Rick & Morty Explorer",
  description: siteConfig.description,
  openGraph: {
    title: "Rick & Morty Explorer",
    description: siteConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rick & Morty Explorer",
    description: siteConfig.description,
  },
};

export default function Home() {
  return <ExplorerPage />;
}
