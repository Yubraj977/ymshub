"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const suggestionTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounced search for suggestions
  useEffect(() => {
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }

    if (searchTerm.trim().length >= 2) {
      suggestionTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchTerm)}&language=en-US&page=1&include_adult=false`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
              },
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            const limitedResults = data.results
              .filter(item => item.title || item.name)
              .slice(0, 5)
              .map(item => ({
                id: item.id,
                title: item.title || item.name,
                mediaType: item.media_type,
                year: item.release_date || item.first_air_date ? 
                  (item.release_date || item.first_air_date).split('-')[0] : '',
                poster: item.poster_path
              }));
            setSuggestions(limitedResults);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(suggestion.title)}`);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-3 lg:mx-auto mt-4 relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-[#fa6900] sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-[#fa6900]"
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
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 dark:text-[#fa6900] border border-gray-300 dark:border-[#fa6900] rounded-lg bg-white dark:bg-gray-800 focus:ring-[#fa6900] focus:border-[#fa6900] transition-colors"
            placeholder="Search Movies, series and ..."
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute end-2.5 bottom-2.5 bg-[#fa6900] hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-[#fa6900] font-medium rounded-lg text-sm px-4 py-2 text-white transition-colors"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
            >
              {suggestion.poster ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${suggestion.poster}`}
                  alt={suggestion.title}
                  className="w-12 h-16 object-cover rounded mr-3 flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-16 bg-gray-300 dark:bg-gray-600 rounded mr-3 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {suggestion.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {suggestion.mediaType === 'movie' ? 'Movie' : 'TV Show'} 
                  {suggestion.year && ` • ${suggestion.year}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}