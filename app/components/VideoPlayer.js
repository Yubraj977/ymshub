"use client"
import React, { useState, useRef } from 'react';

const VideoPlayer = ({ src, title, poster }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#fa6900]"></div>
            <p className="text-white mt-4">Loading {title}...</p>
          </div>
        </div>
      )}

      {/* Video Player Title Bar */}
      {showControls && !isLoading && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-20">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-lg font-bold truncate">{title}</h2>
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
      )}

      {/* Main Video Frame */}
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="w-full h-full border-0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={handleIframeLoad}
      />

      {/* Bottom Controls Overlay */}
      {showControls && !isLoading && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <p className="text-sm opacity-75">Now Playing</p>
                <p className="font-medium">{title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm bg-[#fa6900] px-2 py-1 rounded">
                HD
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50" style={{display: 'none'}} id="error-state">
        <div className="text-center text-white">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-lg mb-2">Unable to load video</p>
          <p className="text-sm text-gray-400">Please check your connection and try again</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;