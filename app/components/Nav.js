"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";



const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div className=' flex justify-between px-10 pt-4'>
        {/* THe part for the logos */}

        <Link href='/'>
      <div className='flex items-center gap-4'>
        <Image
         src="/jerry.png"
         width={60}
         height={60}
         alt='Logo of the website'
        />
        <h1 className='font-allerta_stencil font-bold text-4xl mt-2'>YMS<span className='text-[#fa6900]'>HUB</span></h1>

      </div>
      </Link>

      <div className='hidden lg:flex gap-2 text-sm font-inter mt-5 font-bold text-center '> 
        <Link href="/" className=''>Home</Link>
        <Link href={''}>Comedy</Link>
        <Link href={''} className=''>Action</Link>
        
        <div className="relative  flex  items-start justify-start">
      <button 
        onClick={toggleMenu}
        className=" flex  text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
        type="button"
      >
Language

<IoIosArrowDown className={`${isOpen?'hidden':'block'} mt-1`}/>
<IoIosArrowUp  className={`${isOpen?'block':'hidden'} mt-1`}/>
      </button>
     
    

      {isOpen && (
        <ul
          role="menu"
          className="absolute  z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-300 bg-slate-200 p-1.5 shadow-lg focus:outline-none mt-8"
        >
          <li
            role="menuitem"
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
          >
            NEPALI
          </li>
          <li
            role="menuitem"
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
          >
            HINDI
          </li>
          <li
            role="menuitem"
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-400 focus:bg-slate-100 active:bg-slate-100"
          >
            ENGLISH
          </li>
        </ul>
      )}
    </div>
  

    

        <Link href="about" className=''>About</Link>
      </div>
      <div>
        <p className='hidden lg:flex'>
            Contribute
        </p>
      </div>
    </div>
  )
}

export default Nav
