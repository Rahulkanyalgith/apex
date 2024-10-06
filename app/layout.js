import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"

export const gilroy = localFont({
  src: [
    { path: "./fonts/Gilroy-Thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/Gilroy-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Gilroy-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gilroy-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Gilroy-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Gilroy-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--Gilroy",
});

export const metadata = {
  author: "Apex Mun",
  copyright: "Copyright © Apex Mun | All Rights Reserved.",
  title: {
    template: '%s | Apex Mun',
    default: 'India’s Biggest Hackathon Community | Apex Mun',
  },
  twitter: {
    card: "summary_large_image",
    title: "India’s Biggest Hackathon Community | Apex Mun",
    description: "Join Apex Mun for live hackathons challenging your skills in web and app development, programming, and technology. Learn, grow, and innovate.",
    images: ["https://apexmun.vercel.app/Logo.jpeg"],
    site: "@ApexMun",
    creator: "@ApexMun"
  },
  openGraph: {
    title: "India’s Biggest Hackathon Community | Apex Mun",
    description:
      "Welcome to Apex Mun - your gateway to cutting-edge coding hackathons and contests! Join us for live hackathons that challenge your skills in web development, app development, programming, and technology. As the official website of HackwithIndia, we offer online coding contests that push the boundaries of innovation. Whether you're a seasoned coder or just starting, our contests provide a platform for learning and growth. Don't miss out on the Machine Learning Hackathon, Ai Hackathon, and ML Hackathon events that are sure to inspire. Join us and be part of a community dedicated to education, creativity, and technology advancement..",
    url: "https://apexmun.vercel.app",
    images:
      "https://apexmun.vercel.app/Logo.jpeg",
    siteName: "India’s Biggest Hackathon Community | Apex Mun",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={`${gilroy.variable} font-Gilroy flex flex-col min-h-screen`}>

        {/* Navbar */}
        <Navbar />

        <div className="flex-1">
          {children}
        </div>

        {/* Footer */}
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}