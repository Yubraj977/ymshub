"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import ThemeToggle from './ThemeToggle';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
  };

  const handleLanguageClick = (language) => {
    setIsOpen(false);
    setIsMainMenuOpen(false);
    router.push(`/language/${language.toLowerCase()}`);
  };

  const handleMenuClick = () => {
    setIsMainMenuOpen(false);
  };

  return (
    <div className='flex items-center border-b-2 lg:border-b-0 pb-2 border-s-fuchsia-500 border-red-600 justify-between lg:px-10 lg:pt-4'>
      {/* The part for the logos */}
      <Link href='/'>
        <div className='flex items-center lg:gap-4 border-green-600'>
          <Image
            src="/jerry.png"
            width={60}
            height={60}
            alt='Logo of the website'
          />
          <h1 className='font-allerta_stencil font-bold text-xl lg:text-4xl mt-2'>YMS<span className='text-[#fa6900]'>HUB</span></h1>
        </div>
      </Link>

      {/* The menus section of the navigation */}
      <div className='block lg:hidden'>
        {isMainMenuOpen ? <RxCross2 onClick={toggleMainMenu} /> : <HiOutlineMenuAlt3 className='text-2xl' onClick={toggleMainMenu} />}
      </div>

      {/* Mobile Navigation */}
      {isMainMenuOpen && (
        <div className='flex flex-col gap-6 absolute top-16 z-10 items-start bg-white dark:bg-[#1A1D24] w-full p-4 shadow-lg'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col gap-4'>
              <Link href="/" className='text-gray-800 dark:text-white' onClick={handleMenuClick}>Home</Link>
              <Link href="/comedy" className='text-gray-800 dark:text-white' onClick={handleMenuClick}>Comedy</Link>
              <Link href="/action" className='text-gray-800 dark:text-white' onClick={handleMenuClick}>Action</Link>
            </div>
            <ThemeToggle />
          </div>

          <div className="relative flex items-start justify-start">
            <button 
              onClick={toggleMenu}
              className="flex text-center text-sm text-gray-800 dark:text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Language
              <IoIosArrowDown className={`${isOpen ? 'hidden' : 'block'} mt-1`} />
              <IoIosArrowUp className={`${isOpen ? 'block' : 'hidden'} mt-1`} />
            </button>

            {isOpen && (
              <ul
                role="menu"
                className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-300 bg-slate-200 p-1.5 shadow-lg focus:outline-none mt-8"
              >
                <li
                  role="menuitem"
                  className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
                  onClick={() => handleLanguageClick('nepali')}
                >
                  NEPALI
                </li>
                <li
                  role="menuitem"
                  className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
                  onClick={() => handleLanguageClick('hindi')}
                >
                  HINDI
                </li>
                <li
                  role="menuitem"
                  className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
                  onClick={() => handleLanguageClick('english')}
                >
                  ENGLISH
                </li>
              </ul>
            )}
          </div>

          <Link href="/about" className='text-gray-800 dark:text-white' onClick={handleMenuClick}>About</Link>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className='hidden lg:flex gap-2 text-sm font-inter mt-5 font-bold text-center'>
        <Link href="/" className='hover:text-[#fa6900] transition-colors'>Home</Link>
        <Link href="/comedy" className='hover:text-[#fa6900] transition-colors'>Comedy</Link>
        <Link href="/action" className='hover:text-[#fa6900] transition-colors'>Action</Link>

        <div className="relative flex items-start justify-start">
          <button 
            onClick={toggleMenu}
            className="flex text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Language
            <IoIosArrowDown className={`${isOpen ? 'hidden' : 'block'} mt-1`} />
            <IoIosArrowUp className={`${isOpen ? 'block' : 'hidden'} mt-1`} />
          </button>

          {isOpen && (
            <ul
              role="menu"
              className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-300 bg-slate-200 p-1.5 shadow-lg focus:outline-none mt-8"
            >
              <li
                role="menuitem"
                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
                onClick={() => handleLanguageClick('nepali')}
              >
                NEPALI
              </li>
              <li
                role="menuitem"
                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
                onClick={() => handleLanguageClick('hindi')}
              >
                HINDI
              </li>
              <li
                role="menuitem"
                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
                onClick={() => handleLanguageClick('english')}
              >
                ENGLISH
              </li>
            </ul>
          )}
        </div>

        <Link href="/about" className='hover:text-[#fa6900] transition-colors'>About</Link>
      </div>

      <div className='hidden lg:flex items-center gap-4'>
        <ThemeToggle />
        <a 
          className='hover:text-[#fa6900] transition-colors' 
          href='https://github.com/Yubraj977/ymshub' 
          target='_blank' 
          rel='noopener noreferrer'
        >
          Contribute
        </a>
      </div>
    </div>
  )
}

export default Nav