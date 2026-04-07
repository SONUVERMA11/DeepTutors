import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DEEPTUTORS — 3 Free Demo Classes | Find Verified Home Tutors",
    template: "%s | DeepTutors",
  },
  description:
    "Get 3 FREE demo classes with verified expert tutors. Zero charges to parents, ever. Admin-matched home tuition & online tutoring for CBSE, IB, JEE, NEET, SAT & more across 30+ countries.",
  keywords: [
    "free demo class",
    "home tutor",
    "online tutor",
    "verified tutors",
    "home tuition",
    "CBSE tutor",
    "IB tutor",
    "JEE coaching",
    "NEET tutor",
    "SAT prep",
    "free trial tutor",
    "affordable tutoring",
  ],
  openGraph: {
    title: "DEEPTUTORS — 3 Free Demo Classes | Verified Expert Tutors",
    description:
      "Free for Students. Fair for Tutors. Trusted by Families. Get 3 FREE demo classes with admin-matched verified tutors.",
    type: "website",
    siteName: "DeepTutors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
