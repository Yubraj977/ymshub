"use client"
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';

function Card({name, genre, language, duration, thumbnail, date, rating, id, link}) {
    const router = useRouter();
    
    function handleClick(e) {
        // Only navigate if not clicking the link directly
        if (e.target.tagName !== 'A') {
            router.push(`/movie/${id}`);
        }
    }

    return (
        <div className="main lg:w-64 lg:h-[30rem] w-40 h-[19rem] hover:scale-105 bg-slate-400 dark:bg-opacity-10 bg-opacity-20 flex flex-col justify-between relative transition-transform duration-200 rounded-lg overflow-hidden">
            <a href={link} target='_blank' rel='noopener noreferrer' className="flex flex-col h-full">
                <div className="image w-full lg:h-5/6 h-4/6 relative">
                    <img 
                        src={thumbnail} 
                        alt={name || 'Movie poster'} 
                        className='object-cover h-full w-full'
                        onError={(e) => {
                            e.target.src = '/placeholder-movie.jpg'; // You should add a placeholder image
                        }}
                    />
                    {/* Genre badge */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {genre}
                    </div>
                </div>

                <div className='info p-2 flex flex-col justify-center items-center flex-grow'>
                    <h1 className='dark:text-white font-bold w-full text-center text-sm lg:text-base line-clamp-2'>
                        {name || 'Unknown Title'}
                    </h1>

                    <div className='w-full justify-between flex py-2 dark:text-white text-xs lg:text-sm'>
                        <h1 className='dark:text-white font-allerta flex items-center'> 
                            <span className='text-[#fa6900]'>★</span>
                            <span className="ml-1">{rating}</span>
                        </h1>
                        <h2 className='font-allereta bg-slate-900 px-2 py-1 text-white rounded-lg'>
                            {date}
                        </h2>
                    </div>
                    
                    <div className='text-white flex justify-center font-inter text-xs bg-slate-800 px-2 py-1 rounded mt-1'>
                        {language}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Card