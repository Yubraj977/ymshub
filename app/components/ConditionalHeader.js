'use client';

import { usePathname } from 'next/navigation';
import Nav from './Nav';
import SearchForm from './SearchForm';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide Nav and SearchForm on movie and TV detail pages
  const isDetailPage = pathname.startsWith('/movie/') || pathname.startsWith('/tv/');
  
  if (isDetailPage) {
    return null;
  }

  return (
    <>
      <Nav />
      <div className="font-bold text-md lg:text-4xl text-center mt-10">
        <h1 className="text-gray-900 dark:text-white">Find Movies TV shows Download and enjoy</h1>
        
        <SearchForm />
        
        <h1 className="text-sm lg:text-lg font-bold font-allerta_stencil mt-4 text-gray-700 dark:text-gray-300">
          This is the website where you can download any kind of movies as per
          your preference happy entertainment
        </h1>
        <h1 className="text-lg font-allerta_stencil hidden lg:block text-gray-700 dark:text-gray-300">
          This is the website where you can download any kind of movies as per
          your preference happy entertainment
        </h1>
      </div>
    </>
  );
}