import "./globals.css";
import Navigation from "../components/Navigation";
import BottomNavigation from "../components/BottomNavigation";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "Portfolio - Hocine IRATNI",
  description: "Portfolio professionnel - BTS SIO SISR",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  other: {
    // Préchargement des ressources critiques pour performance
    &apos;dns-prefetch&apos;: &apos;https://fonts.googleapis.com&apos;,
    &apos;preconnect&apos;: &apos;https://fonts.gstatic.com&apos;,
  }
};

export const viewport = {
  width: &apos;device-width&apos;,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: &apos;cover&apos;,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-theme text-theme">
        <ThemeProvider>
          <Navigation />
          <ThemeToggle />
          <main className="pt-0 md:pt-16 pb-20 md:pb-0 bg-theme min-h-screen relative overflow-x-hidden">
            {children}
          </main>
          <BottomNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}