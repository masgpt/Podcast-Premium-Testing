
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Castly Premium | AI Podcast Hub",
  description: "Advanced podcast streaming powered by Gemini AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0a090d] text-[#a69db9] antialiased">
        {children}
      </body>
    </html>
  );
}
