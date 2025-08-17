"use client"
import React, { useState, useRef, useEffect } from 'react';
import { getAllStreamingUrls, getSourceById } from '../utils/streamingSources';

const VideoPlayer = ({ tmdbId, mediaType, title, poster }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [showSourceMenu, setShowSourceMenu] = useState(false);
  const [sources, setSources] = useState([]);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const loadTimeoutRef = useRef(null);

  // Initialize sources
  useEffect(() => {
    if (tmdbId && mediaType) {
      const availableSources = getAllStreamingUrls(mediaType, tmdbId);
      setSources(availableSources);
    }
  }, [tmdbId, mediaType]);

  const handleIframeLoad = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    console.log(`Source ${sources[currentSourceIndex]?.name} failed to load`);
    tryNextSource();
  };

  const tryNextSource = () => {
    if (currentSourceIndex < sources.length - 1) {
      setCurrentSourceIndex(prev => prev + 1);
      setIsLoading(true);
      setHasError(false);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const switchToSource = (index) => {
    setCurrentSourceIndex(index);
    setIsLoading(true);
    setHasError(false);
    setShowSourceMenu(false);
    
    // Clear any existing timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
  };

  // Set timeout for detecting failed loads
  useEffect(() => {
    if (isLoading && sources.length > 0) {
      loadTimeoutRef.current = setTimeout(() => {
        console.log(`Source ${sources[currentSourceIndex]?.name} timed out`);
        tryNextSource();
      }, 10000); // 10 second timeout
    }

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [isLoading, currentSourceIndex, sources]);

  const getCurrentSource = () => sources[currentSourceIndex];

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    // Hide controls after 3 seconds of inactivity
    setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full bg-black ${isFullscreen ? 'h-screen' : 'aspect-video'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Loading Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#fa6900]"></div>
            <p className="text-white mt-4">Loading {title}...</p>
            {getCurrentSource() && (
              <p className="text-gray-400 text-sm mt-2">
                Trying {getCurrentSource().name}...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Video Player Title Bar */}
      {showControls && !isLoading && !hasError && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-white text-lg font-bold truncate">{title}</h2>
              {getCurrentSource() && (
                <span className="bg-[#fa6900] text-white text-xs px-2 py-1 rounded">
                  {getCurrentSource().name}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-[#fa6900] transition-colors p-2"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 01-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 01-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Video Frame */}
      {!hasError && getCurrentSource() && (
        <iframe
          key={`source-${currentSourceIndex}-${getCurrentSource().id}`}
          ref={iframeRef}
          src={getCurrentSource().url}
          title={title}
          className="w-full h-full border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}

      {/* Bottom Controls Overlay */}
      {showControls && !isLoading && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <p className="text-sm opacity-75">Now Playing</p>
                <p className="font-medium">{title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {getCurrentSource() && (
                <span className="text-white text-sm bg-[#fa6900] px-2 py-1 rounded">
                  {getCurrentSource().quality}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center text-white max-w-md px-6">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl mb-4 font-bold">Video Not Available</h3>
            <p className="text-gray-400 mb-6">
              We tried all available sources but couldn&apos;t load this content. 
              This might be due to geo-restrictions or the content not being available on our streaming partners.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentSourceIndex(0);
                  setHasError(false);
                  setIsLoading(true);
                }}
                className="w-full bg-[#fa6900] hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🔄 Try Again
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://www.imdb.com/find?q=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  📖 IMDb Info
                </a>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' trailer')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  🎬 YouTube
                </a>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              <p>Sources tried: {sources.map(s => s.name).join(', ')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Source Switcher Below Video */}
      {sources.length > 1 && (
        <div className="mt-4 bg-gray-900 rounded-lg p-4">
          <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#fa6900]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Available Sources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sources.map((source, index) => (
              <button
                key={source.id}
                onClick={() => switchToSource(index)}
                className={`p-3 rounded-lg text-left transition-all duration-200 border-2 ${
                  index === currentSourceIndex
                    ? 'bg-[#fa6900] border-[#fa6900] text-white shadow-lg'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{source.name}</span>
                  {index === currentSourceIndex && (
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-75">{source.quality}</span>
                  <span className="text-xs opacity-60">{source.description || 'Streaming'}</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3">
            💡 Try different sources if the current one doesn&apos;t work or loads slowly
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;