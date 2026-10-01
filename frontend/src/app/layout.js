import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import GlobalActionButtons from "./components/GlobalActionButtons";
import ScrollToTop from "./components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Saini Manjit Singh Bhondhi | Building a Better Caledon",
  description:
    "With a focus on responsible growth, better infrastructure, safer communities, local businesses, and accountable government, Saini Manjit Singh Bhondhi is working to build a stronger and more connected future for Caledon.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#092b66] text-white">
        <SmoothScroll />

        {/* Global Sticky Action Buttons */}
        <GlobalActionButtons />

        {/* Scroll To Top */}
        <ScrollToTop />

        {children}
      </body>
    </html>
  );
}