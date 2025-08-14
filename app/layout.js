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
import Nav from "./components/Nav";
import Mypagination from "./components/Mypagination";
import SearchForm from "./components/SearchForm";

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
        className={`${
          (danfo.variable, allerta.variable, allerta_stencil.variable)
        } bg-[#374151] text-white`}
      >
        <Nav />
        <div className="font-bold text-md lg:text-4xl text-center mt-10">
          <h1>Find Movies TV shows Download and enjoy</h1>
          
          <SearchForm />
          
          <h1 className=" text-sm lg:text-lg font-bold font-allerta_stencil mt-4">
            This is the website where you can download any kind of movies as per
            your preference happy entertainment
          </h1>
          <h1 className="text-lg font-allerta_stencil hidden lg:block">
            This is the website where you can download any kind of movies as per
            your preference happy entertainment
          </h1>
        </div>
        {children}
        <Analytics />

        <div className="flex mt-8">{/* <Mypagination /> */}</div>
      </body>
    </html>
  );
}