import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const robotoMono = localFont({
  src: [
    {
      path: "./fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kassandra",
  description: "Predict Stock Movements Using Real-World Sentiment",
  icons: {
    icon: "/stock.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
