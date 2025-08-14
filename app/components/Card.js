"use client"
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';

function Card({name, genre, language, duration, thumbnail, date, rating, id, link, mediaType}) {
    const router = useRouter();
    
    function handleClick(e) {
        e.preventDefault();
        // Determine if it's a movie or TV show and navigate accordingly
        if (mediaType === 'tv' || genre === 'TV Show') {
            router.push(`/tv/${id}`);
        } else {
            router.push(`/movie/${id}`);
        }
    }

    return (
        <div 
            className="main lg:w-64 lg:h-[30rem] w-40 h-[19rem] hover:scale-105 bg-slate-400 dark:bg-opacity-10 bg-opacity-20 flex flex-col justify-between relative transition-transform duration-200 rounded-lg overflow-hidden cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex flex-col h-full">
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
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                        <div className="w-16 h-16 bg-[#fa6900] rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 3.8L6.3 3.8c-.2-.1-.4-.1-.6 0C5.5 3.9 5.4 4 5.4 4.2v11.5c0 .2.1.3.3.4.1 0 .2.1.3.1.1 0 .2 0 .3-.1l8.8-5.8c.2-.1.3-.3.3-.4 0-.2-.1-.3-.3-.4L6.3 3.8z"/>
                            </svg>
                        </div>
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
            </div>
        </div>
    )
}

export default Card