'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Card from './Card';

const InfiniteScroll = ({ 
  fetchUrl, 
  title, 
  subtitle,
  contentType = 'mixed' // 'mixed', 'movie', 'tv'
}) => {
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
      const url = fetchUrl.includes('?') 
        ? `${fetchUrl}&page=${page}` 
        : `${fetchUrl}?page=${page}`;
        
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      // Extract items based on content type
      let newItems = data.results || [];
      if (contentType === 'movie') {
        newItems = newItems.map(item => ({ ...item, media_type: 'movie' }));
      } else if (contentType === 'tv') {
        newItems = newItems.map(item => ({ ...item, media_type: 'tv' }));
      }
      
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
  }, [fetchUrl, contentType]);

  useEffect(() => {
    setItems([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchItems(1);
  }, [fetchUrl]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchItems(currentPage);
    }
  }, [currentPage, fetchItems]);

  if (error && items.length === 0) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Failed to load content</p>
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
      {title && (
        <div className="text-center mt-10 mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {items.map((item, index) => {
          const isMovie = item.media_type === 'movie' || !item.media_type;
          const title = isMovie ? item.title : item.name;
          const releaseDate = isMovie ? item.release_date : item.first_air_date;
          const vidsrcLink = isMovie 
            ? `https://vidsrc.xyz/embed/movie?tmdb=${item.id}`
            : `https://vidsrc.xyz/embed/tv?tmdb=${item.id}`;

          const isLastItem = index === items.length - 1;

          return (
            <div 
              key={`${item.id}-${index}`}
              ref={isLastItem ? lastItemRef : null}
            >
              <Card 
                id={item.id}
                thumbnail={item.poster_path ? `https://image.tmdb.org/t/p/w1280${item.poster_path}` : '/placeholder-movie.jpg'}
                name={title || 'Unknown Title'}
                genre={isMovie ? 'Movie' : 'TV Show'}
                rating={item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                duration={'N/A'}
                date={releaseDate ? releaseDate.split('-')[0] : 'N/A'}
                language={item.original_language ? item.original_language.toUpperCase() : 'N/A'}
                link={vidsrcLink}
                mediaType={item.media_type || 'movie'}
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
            <span className="text-gray-600 dark:text-gray-400">Loading more content...</span>
          </div>
        </div>
      )}

      {/* End of content message */}
      {!hasMore && items.length > 0 && (
        <div className="text-center mt-8 mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            🎬 You&apos;ve reached the end! Explore other categories for more content.
          </p>
        </div>
      )}

      {/* Error message for failed loads */}
      {error && items.length > 0 && (
        <div className="text-center mt-8 mb-8">
          <p className="text-red-400 mb-2">Failed to load more content</p>
          <button 
            onClick={() => fetchItems(currentPage)}
            className="bg-[#fa6900] hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;