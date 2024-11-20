"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";



const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
    const toggleMainMenu = () => {
      setIsMainMenuOpen(!isMainMenuOpen);
    };
    
  return (
    <div className=' flex  items-center border-b-2 lg:border-b-0 pb-2  border-s-fuchsia-500 border-red-600 justify-between lg:px-10 lg:pt-4 '>
        {/* THe part for the logos */}

        <Link href='/'>
      <div className='flex items-center lg:gap-4  border-green-600'>
        <Image
         src="/jerry.png"
         width={60}
         height={60}
         alt='Logo of the website'
        />
        <h1 className='font-allerta_stencil font-bold  text-xl lg:text-4xl mt-2'>YMS<span className='text-[#fa6900]'>HUB</span></h1>

      </div>
      </Link>



{/* The menus section of the navigatioin */}
<div className='block lg:hidden'>
{isMainMenuOpen?<RxCross2 onClick={toggleMainMenu}/>:<HiOutlineMenuAlt3 className=' text-2xl' onClick={toggleMainMenu}/>}
</div>


{/* my Special Navigatioin for the mobile devices */}
{isMainMenuOpen?<div className=' flex flex-col gap-6  absolute  top-16 z-10 items-start bg-[#1A1D24] w-full  '> 
        <Link href="/" className='' onClick={toggleMainMenu}>Home</Link>
        <Link href={''}>Comedy</Link>
        <Link href={''} className='' onClick={toggleMainMenu}>Action</Link>
        
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
      </div>:<div className='hidden'></div>}





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
      


      <div className='hidden lg:flex'>
        <a className='' href='https://github.com/Yubraj977/ymshub' target='_blank'>
            Contribute
        </a>
      </div>


    </div>
  )
}

export default Nav
