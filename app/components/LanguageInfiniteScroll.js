'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Card from './Card';

const LanguageInfiniteScroll = ({ languageCode, languageName, languageFlag }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchItems = useCallback(async (page) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_original_language=${languageCode}&language=en-US&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
          },
          cache: 'no-store'
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${languageName} movies`);
      }

      const data = await response.json();
      const newItems = (data.results || []).map(item => ({ ...item, media_type: 'movie' }));
      const totalPages = Math.min(data.total_pages || 1, 500);

      if (page === 1) {
        setItems(newItems);
      } else {
        setItems(prevItems => [...prevItems, ...newItems]);
      }

      setHasMore(page < totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [languageCode, languageName]);

  useEffect(() => {
    setItems([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchItems(1);
  }, [languageCode]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchItems(currentPage);
    }
  }, [currentPage, fetchItems]);

  if (error && items.length === 0) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Failed to load {languageName} movies</p>
          <button 
            onClick={() => fetchItems(1)}
            className="bg-[#fa6900] hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="text-center mt-10 mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          {languageFlag} {languageName} Movies
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Discover amazing {languageName} cinema
        </p>
      </div>
      
      {items.length === 0 && !loading ? (
        <div className="text-center mt-20">
          <p className="text-gray-400 text-lg">No {languageName} movies found.</p>
          <p className="text-gray-500 text-sm mt-2">Try checking other languages or genres.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {items.map((item, index) => {
              const isLastItem = index === items.length - 1;

              return (
                <div 
                  key={`${item.id}-${index}`}
                  ref={isLastItem ? lastItemRef : null}
                >
                  <Card 
                    id={item.id}
                    thumbnail={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                    name={item.title || 'Unknown Title'}
                    genre={languageName}
                    rating={item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                    duration={'N/A'}
                    date={item.release_date ? item.release_date.split('-')[0] : 'N/A'}
                    language={item.original_language ? item.original_language.toUpperCase() : 'N/A'}
                    link={`https://vidsrc.xyz/embed/movie?tmdb=${item.id}`}
                    mediaType="movie"
                    item={item}
                  />
                </div>
              );
            })}
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center items-center mt-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-[#fa6900] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 dark:text-gray-400">Loading more {languageName} movies...</span>
              </div>
            </div>
          )}

          {/* End of content message */}
          {!hasMore && items.length > 0 && (
            <div className="text-center mt-8 mb-8">
              <p className="text-gray-600 dark:text-gray-400">
                🎬 You&apos;ve seen all available {languageName} movies! Check out other languages for more content.
              </p>
            </div>
          )}

          {/* Error message for failed loads */}
          {error && items.length > 0 && (
            <div className="text-center mt-8 mb-8">
              <p className="text-red-400 mb-2">Failed to load more {languageName} movies</p>
              <button 
                onClick={() => fetchItems(currentPage)}
                className="bg-[#fa6900] hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Retry
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LanguageInfiniteScroll;