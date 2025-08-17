import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import {
  Kablammo,
  Danfo,
  Allerta,
  Allerta_Stencil,
  Inter,
} from "next/font/google";
import Mypagination from "./components/Mypagination";
import ConditionalHeader from "./components/ConditionalHeader";
import { ThemeProvider } from "./contexts/ThemeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const danfo = Danfo({
  subsets: ["latin"],
  variable: "--danfo",
});
const allerta = Allerta({
  subsets: ["latin"],
  variable: "--allerta",
  weight: "400",
});
const allerta_stencil = Allerta_Stencil({
  subsets: ["latin"],
  variable: "--allerta_stencil",
  weight: "400",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: "400",
});

export const metadata = {
  title: "YmsHub",
  description: "All in one movie downloading sites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/jerry.png"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body
        className={`${danfo.variable} ${allerta.variable} ${allerta_stencil.variable} ${inter.variable} bg-gray-100 dark:bg-[#374151] text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <ConditionalHeader />
          {children}
          <Analytics />

          <div className="flex mt-8">{/* <Mypagination /> */}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}