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
  description: "All in one movie dowinloaing sites",
};
const handlePageChange = () => {};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/jerry.png"
          type="image/<generated>"
          sizes="<generated>"

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

          <form className="max-w-3xl mx-3 lg:mx-auto mt-4  ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-[#fa6900] sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#fa6900] "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-[#fa6900]  border-[#fa6900] rounded-lg bg-[[#fa6900]] focus:ring-[#fa6900] focus:border-[#fa6900] "
                placeholder="Search Movies series and ..."
                required
              />
              <button
                type="submit"
                className=" absolute end-2.5 bottom-2.5 bg-[#fa6900] hover:bg-[#fa6900] focus:ring-4 focus:outline-none focus:ring-[#fa6900] font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
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
