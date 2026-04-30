import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Islamic-grip",
  description: "Unity is power",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <SessionWrapper>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        
        {children}
        <Footer />
      
      </body>
      </SessionWrapper>
    </html>
  );
}
