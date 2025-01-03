import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/context/WishlistProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  variable: "--font-poppins", 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <WishlistProvider>
        <Navigation/>
        {children}
        <Footer/>
        </WishlistProvider>
      </body>
    </html>
  );
}
