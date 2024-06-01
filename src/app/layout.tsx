import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "./font";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Wherehouse",
  description: "Google Sheet reader and writer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
