// import './globals.css'
// import { Inter } from 'next/font/google'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'
// import { AuthProvider } from '@/components/AuthProvider'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'CraftCorner',
//   description: 'A marketplace for artisans to showcase and sell their products',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <div className="flex flex-col min-h-screen">
//             <Header />
//             <main className="flex-grow">{children}</main>
//             <Footer />
//           </div>
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }






"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import SplashScreen from "@/components/SplashScreen"; // Import SplashScreen
import LoaderScreen from "@/components/LoaderScreen"; // Import LoaderScreen

const inter = Inter({ subsets: ["latin"] });

 const metadata = {
  title: "CraftCorner",
  description: "A marketplace for artisans to showcase and sell their products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
      setIsLoaderVisible(true); // Show loader after splash
    }, 3000);

    // Show loader for 4 seconds
    const loaderTimer = setTimeout(() => {
      setIsLoaderVisible(false);
    }, 7000); // 3s splash + 4s loader = 7s total

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isSplashVisible ? (
          <SplashScreen />
        ) : isLoaderVisible ? (
          <LoaderScreen />
        ) : (
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        )}
      </body>
    </html>
  );
}
