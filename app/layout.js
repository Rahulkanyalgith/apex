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
  copyright: "Copyright © 2024 · All Rights Reserved",
  title: {
    template: '%s | Apex Mun',
    default: "Shaping Tomorrow's Leaders | Apex Mun",
  },
  keywords: [
    "Apex MUN",
    "Apex MUN Website",
    "MUN Website",
    "Top Mun Of India",
    "Model United Nations",
    "Delhi MUN Circuit",
    "Youth Leadership Conference",
    "Diplomacy Skills Training",
    "Public Speaking Event",
    "Debate Conference 2024",
    "Global Issues Debate",
    "College MUN 2024",
    "School MUN",
    "United Nations Simulation",
    "Youth Empowerment Program",
    "Consensus Building Workshop",
    "International Relations Summit",
    "MUN Debate Event",
    "Youth Conference in Delhi",
    "Crisis Management Simulation",
    "UN Committees Discussion",
    "Leadership Development Forum",
    "Policy Making Workshop",
    "MUN Delhi Event",
    "Model United Nations 2024",
    "MUN Delhi Schools",
    "Apex MUN Registration",
    "Global Diplomacy Skills",
    "Debate and Public Speaking",
    "MUN Training Workshops",
    "Delegate Skills Development",
    "MUN Delegate Opportunities",
    "Global Leadership Program",
    "International Diplomacy Event",
    "Youth Leadership Summit",
    "Apex MUN Delegate Registration",
    "Youth Diplomacy Event",
    "Debate and Consensus Building",
    "MUN Global Issues Forum",
    "Public Speaking Training",
    "Global Policy Debate",
    "UN Model Conference 2024",
    "MUN Youth Leadership",
    "International Youth Summit",
    "Apex MUN 2024 Delhi",
    "Leadership Workshops Delhi",
    "Diplomacy Training Delhi",
    "Youth Diplomacy Workshop",
    "Global Leadership Training",
    "Apex MUN Delhi",
    "MUN Delegates 2024",
    "Youth Conference Delhi",
    "Student Leadership Training",
    "Apex MUN Debate Circuit",
    "Youth Leadership Development",
    "MUN Delegate Training 2024",
    "Global Policy Summit",
    "Diplomacy and Leadership Skills",
    "Crisis Simulation Delhi",
    "Global Leadership Summit 2024",
    "MUN 2024 Delhi",
    "Youth Leadership Opportunities",
    "Apex MUN Schools and Colleges",
    "Youth Summit on Global Issues",
    "MUN Conference Registration",
    "Model UN for Schools",
    "Model UN for Colleges",
    "Debate Circuit 2024",
    "Apex MUN Youth Leaders",
    "Apex MUN Diplomatic Summit",
    "Global Issues and Diplomacy",
    "MUN Delegate Registration 2024",
    "Diplomacy Masterclass",
    "UN Simulation Training",
    "Global Policy Workshop",
    "Public Speaking Mastery",
    "Youth Diplomacy Summit",
    "Leadership Summit for Students",
    "Debate Training for Youth",
    "Global Affairs and Leadership",
    "MUN Crisis Management",
    "Student Leadership Opportunities",
    "Apex MUN Leadership Conference",
    "Apex MUN Delegate Forum",
    "MUN Youth Leaders",
    "Global Debate Conference",
    "MUN Circuit Delhi",
    "Diplomacy and Negotiation Skills",
    "Apex MUN Global Leadership",
    "Global Leadership Forum",
    "Youth Policy Debate",
    "Apex MUN Event Registration",
    "MUN Public Speaking Event",
    "MUN for Students Delhi",
    "Apex MUN Youth Empowerment",
    "Global Issues Leadership",
    "MUN 2024 Delegate Summit",
    "Youth Leadership Skills",
    "MUN Global Affairs Conference",
    "Apex MUN Delegate Training",
    "MUN Youth Diplomacy",
    "Apex MUN Registration Delhi",
    "MUN Leadership Workshops",
    "Public Speaking and Diplomacy",
    "Debate and Negotiation Event",
    "MUN Delegate Skills Development",
    "Global Affairs Summit",
    "Apex MUN for Schools and Colleges",
    "Leadership and Diplomacy Skills",
    "MUN Global Leadership",
    "Student Leadership Opportunities",
    "Youth Policy Leadership",
    "Apex MUN Public Speaking",
    "MUN Registration 2024",
    "Model UN Event for Students",
    "Diplomacy Workshop Delhi",
    "Youth Leadership and Debate",
    "MUN Delegate Forum Delhi",
    "Apex MUN Schools Event",
    "International Relations Training",
    "Global Affairs Workshop",
    "MUN Delegate Leadership",
    "Student Diplomacy Event",
    "Debate and Diplomacy Mastery",
    "Global Diplomacy Training",
    "Apex MUN Student Registration",
    "MUN Youth Debate 2024",
    "Apex MUN Leadership Summit 2024",
    "Youth Public Speaking Summit",
    "Model United Nations Event",
    "Diplomacy and Consensus Training",
    "Global Leadership Conference",
    "MUN Delegate Skills Workshop",
    "Apex MUN Global Debate",
    "MUN for Schools in Delhi",
    "Public Speaking Contest",
    "Youth Debate Event",
    "MUN Schools and Colleges",
    "Leadership and Public Speaking",
    "Apex MUN Global Summit",
    "MUN Leadership Forum",
    "Global Affairs and Diplomacy",
    "MUN Delegate Masterclass",
    "Student Diplomacy Forum",
    "Youth Leadership Forum",
    "Apex MUN Global Issues Debate",
    "Diplomacy and Public Speaking",
    "Global Leadership and Diplomacy",
    "Youth Leadership Event",
    "MUN Delegate Leadership Training",
    "Apex MUN 2024 Delegate Summit",
    "Youth Leadership Conference Delhi",
    "Model UN for Colleges in Delhi",
    "Global Leadership and Debate",
    "MUN Event Registration 2024",
    "Diplomacy and Global Leadership",
    "MUN Negotiation Skills",
    "Apex MUN 2024 Conference",
    "Youth Leadership and Diplomacy Event",
    "Apex MUN Global Policy Summit",
    "MUN Public Speaking Training",
    "Student Diplomacy and Debate",
    "Global Leadership Training Event",
    "Youth Diplomacy and Debate",
    "Leadership and Consensus Skills",
    "MUN Delegate Training Event",
    "Apex MUN Debate Summit",
    "Youth Leadership Forum 2024",
    "MUN for Schools and Colleges",
    "Apex MUN Policy Debate",
    "Global Leadership Skills Summit",
    "MUN Public Speaking Summit 2024",
    "Apex MUN Leadership Workshop",
    "Model UN 2024 Event",
    "Youth Leadership Workshop Delhi",
    "Global Diplomacy and Leadership",
    "MUN Global Leadership Summit 2024",
    "Apex MUN Delegate Mastery",
    "MUN Debate Summit 2024",
    "Youth Leadership Opportunities Delhi",
    "Apex MUN Event for Schools",
    "Youth Diplomacy Mastery",
    "MUN 2024 Global Issues Debate",
    "Global Leadership Event Delhi"
  ],
  description: "Apex Model United Nations (MUN) is a prestigious conference designed to encourage debate and discussion on pressing global issues. Bringing together students from schools and colleges across the Delhi Circuit, the event simulates the workings of the United Nations, providing a dynamic platform for youth to hone essential skills such as diplomacy, public speaking, negotiation, and consensus-building. This initiative within the Delhi MUN circuit aims to empower young minds, equipping them with the tools to become thoughtful leaders and effective communicators.",
  twitter: {
    card: "summary_large_image",
    title: "Shaping Tomorrow's Leaders | Apex Mun",
    description: "Apex Model United Nations (MUN) is a prestigious conference designed to encourage debate and discussion on pressing global issues. Bringing together students from schools and colleges across the Delhi Circuit, the event simulates the workings of the United Nations, providing a dynamic platform for youth to hone essential skills such as diplomacy, public speaking, negotiation, and consensus-building. This initiative within the Delhi MUN circuit aims to empower young minds, equipping them with the tools to become thoughtful leaders and effective communicators.",
    url: "https://apexmun.vercel.app",
    images: [
      "https://apexmun.vercel.app/favicon.ico",
      "https://apexmun.vercel.app/android-chrome-192x192.png",
      "https://apexmun.vercel.app/android-chrome-512x512.png",
      "https://apexmun.vercel.app/apple-touch-icon.png",
      "https://apexmun.vercel.app/apple-touch-icon-precomposed.png",
      "https://apexmun.vercel.app/favicon-16x16.png",
      "https://apexmun.vercel.app/favicon-32x32.png",
      "https://apexmun.vercel.app/LogoBlack.png",
      "https://apexmun.vercel.app/LogoWhite.png",
      "https://apexmun.vercel.app/1.png",
      "https://apexmun.vercel.app/2.png",
      "https://apexmun.vercel.app/3.png",
      "https://apexmun.vercel.app/4.png",
      "https://apexmun.vercel.app/5.png",
      "https://apexmun.vercel.app/6.png",
      "https://apexmun.vercel.app/7.png",
      "https://apexmun.vercel.app/Team/Harshit.png",
      "https://apexmun.vercel.app/Team/Aviral.jpeg",
      "https://apexmun.vercel.app/Team/Anshika.jpeg",
      "https://apexmun.vercel.app/Team/Mayank.jpeg",
      "https://apexmun.vercel.app/Team/Mokshu.jpeg",
      "https://apexmun.vercel.app/Team/Group.jpg",
      "https://apexmun.vercel.app/Team/Kashvi.jpeg",
      "https://apexmun.vercel.app/Logo.jpeg",
    ],
    site: "@ApexMun",
    creator: "@ApexMun"
  },
  openGraph: {
    title: "Shaping Tomorrow's Leaders | Apex Mun",
    description: "Apex Model United Nations (MUN) is a prestigious conference designed to encourage debate and discussion on pressing global issues. Bringing together students from schools and colleges across the Delhi Circuit, the event simulates the workings of the United Nations, providing a dynamic platform for youth to hone essential skills such as diplomacy, public speaking, negotiation, and consensus-building. This initiative within the Delhi MUN circuit aims to empower young minds, equipping them with the tools to become thoughtful leaders and effective communicators.",
    url: "https://apexmun.vercel.app",
    images: [
      "https://apexmun.vercel.app/favicon.ico",
      "https://apexmun.vercel.app/android-chrome-192x192.png",
      "https://apexmun.vercel.app/android-chrome-512x512.png",
      "https://apexmun.vercel.app/apple-touch-icon.png",
      "https://apexmun.vercel.app/apple-touch-icon-precomposed.png",
      "https://apexmun.vercel.app/favicon-16x16.png",
      "https://apexmun.vercel.app/favicon-32x32.png",
      "https://apexmun.vercel.app/LogoBlack.png",
      "https://apexmun.vercel.app/LogoWhite.png",
      "https://apexmun.vercel.app/1.png",
      "https://apexmun.vercel.app/2.png",
      "https://apexmun.vercel.app/3.png",
      "https://apexmun.vercel.app/4.png",
      "https://apexmun.vercel.app/5.png",
      "https://apexmun.vercel.app/6.png",
      "https://apexmun.vercel.app/7.png",
      "https://apexmun.vercel.app/Team/Harshit.png",
      "https://apexmun.vercel.app/Team/Aviral.jpeg",
      "https://apexmun.vercel.app/Team/Anshika.jpeg",
      "https://apexmun.vercel.app/Team/Mayank.jpeg",
      "https://apexmun.vercel.app/Team/Mokshu.jpeg",
      "https://apexmun.vercel.app/Team/Group.jpg",
      "https://apexmun.vercel.app/Team/Kashvi.jpeg",
      "https://apexmun.vercel.app/Logo.jpeg",
    ],
    siteName: "Shaping Tomorrow's Leaders | Apex Mun",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
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