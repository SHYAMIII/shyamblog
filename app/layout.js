import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"
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
  title: "Shyam_Blog",
  description: "Shyam's Blog",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          >
          <Navbar/><div className="min-h-screen">

          {children}
          </div>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}

