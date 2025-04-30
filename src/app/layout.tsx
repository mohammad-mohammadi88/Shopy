import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import IndexLayout from "@/Components/index/IndexLayout";
import { Bounce, ToastContainer } from "react-toastify";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@Context/authentication";
import type { Metadata } from "next";
// import "@Styles/globals.css";
import "@Public/output.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Shopy",
  description: "This is the main page of Shopy website",
};
export default async function RootLayout({
  children
}: any) {
  return (
    <html lang="en" dir="ltr">
      <body className={`overflow-x-hidden ${geistSans.variable} ${geistMono.variable}`}>
        <IndexLayout>
          <AuthProvider>
            {children}
          </AuthProvider>
          <ReactQueryDevtools />
        </IndexLayout>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
