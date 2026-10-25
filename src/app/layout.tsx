import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Container from "@mui/material/Container";
import { ThemeRegistry } from "@/shared/theme/ThemeRegistry";
import { AppNav } from "@/shared/components/AppNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokémon Sleep Cookbook",
  description: "Track ingredients, recipes, and which dishes you've cooked in Pokémon Sleep.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeRegistry>
          <AppNav />
          <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
            {children}
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
