import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import SessionWrapper from "./components/SessionWrapper";
import { Toaster } from "react-hot-toast";

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hire Haven",
  description: "Your friendly job board app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${noto.className} min-h-screen`}>
          <div className="">
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </div>
        </body>
      </SessionWrapper>
    </html>
  );
}
