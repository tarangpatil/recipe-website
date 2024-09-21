import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const dancingScript = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen`}>
        <header className="flex justify-between items-center py-4 px-8 bg-[#ffddd5]">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="Logo - Food item"
              className="h-12 w-auto mx-4"
            />
            <h1 className="text-3xl font-dancing-script">CookerSpot</h1>
          </div>
          <div className="flex items-center">
            <Link
              href={"/recipe/create"}
              className="mx-8 text-black underline hover:text-blue-600"
            >
              Post a Recipe
            </Link>
            <button className=" bg-custom-peach-dark text-white h-min px-4 py-2 rounded-full">
              Login / Signup
            </button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
