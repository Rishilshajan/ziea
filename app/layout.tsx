import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZIEA - Premium Kerala Nightwear",
  description: "Discover the intersection of natural heritage and everyday luxury with our latest handcrafted linen series.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light antialiased">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
