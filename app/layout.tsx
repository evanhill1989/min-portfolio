import type { Metadata } from "next";
import { Be_Vietnam_Pro, Barlow } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Add the weights you need
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // Add the weights you need
});

export const metadata: Metadata = {
  title: "Evan Hill - Web Developer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${beVietnamPro.variable} ${barlow.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
