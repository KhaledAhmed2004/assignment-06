import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/utils/Provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "TecQue",
  description: "A platform for tech knowledge sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-full bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col h-screen">
          <Provider>
            <Navbar />
            <main className="flex-1 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
              <Suspense fallback={<Spinner />}>{children}</Suspense>
            </main>
            <Footer />
          </Provider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
