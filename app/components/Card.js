"use client"
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';
import ImageWithFallback from './ImageWithFallback';
import { getAvailabilityIndicator, getAvailabilityIcon } from '../utils/availabilityChecker';

function Card({name, genre, language, duration, thumbnail, date, rating, id, link, mediaType, item}) {
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

    // Get availability indicator
    const availability = item ? getAvailabilityIndicator(item) : { status: 'unknown', label: 'HD', color: 'bg-[#fa6900]' };

    return (
        <div 
            className="main lg:w-64 lg:h-[30rem] w-40 h-[19rem] hover:scale-105 bg-slate-400 dark:bg-opacity-10 bg-opacity-20 flex flex-col justify-between relative transition-transform duration-200 rounded-lg overflow-hidden cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex flex-col h-full">
                <div className="image w-full lg:h-5/6 h-4/6 relative">
                    <ImageWithFallback 
                        src={thumbnail} 
                        alt={name || 'Movie poster'} 
                        className='object-cover h-full w-full'
                        fallbackSrc='/placeholder-movie.jpg'
                    />
                    {/* Genre badge */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {genre}
                    </div>
                    
                    {/* Availability indicator */}
                    <div className={`absolute top-2 left-2 ${availability.color} text-white text-xs px-2 py-1 rounded flex items-center gap-1`}>
                        <span>{getAvailabilityIcon(availability.status)}</span>
                        <span>{availability.label}</span>
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
                    <h1 className='dark:text-white font-bold w-full text-center text-sm lg:text-base line-clamp-2 mb-2'>
                        {name || 'Unknown Title'}
                    </h1>

                    {/* Rating on left, Year and Language on right */}
                    <div className='w-full flex justify-between items-center text-xs lg:text-sm'>
                        <div className='flex items-center text-white'>
                            <span className='text-[#fa6900] mr-1'>★</span>
                            <span className="font-semibold">{rating}</span>
                        </div>
                        
                        <div className='flex items-center gap-1'>
                            <div className='bg-[#fa6900] text-white px-2 py-1 rounded text-xs font-semibold'>
                                {date}
                            </div>
                            
                            <div className='bg-gray-700 text-white px-2 py-1 rounded text-xs font-semibold'>
                                {language}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card