import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — 4 Steps to Your Perfect Tutor",
  description:
    "Register free, get admin-matched with a verified tutor, enjoy 3 free demo classes, then start learning. Zero cost to parents, ever.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
