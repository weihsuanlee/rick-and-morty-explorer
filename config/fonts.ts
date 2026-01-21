import { Space_Grotesk as FontSans, Syne as FontDisplay } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontDisplay = FontDisplay({
  subsets: ["latin"],
  variable: "--font-display",
});
