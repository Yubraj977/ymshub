import VideoPlayer from "../../components/VideoPlayer";
import BackButton from "../../components/BackButton";
import ImageWithFallback from "../../components/ImageWithFallback";

export const dynamic = 'force-dynamic';

export default async function MoviePage({ params }) {
  const resolvedParams = await params;
  const movieId = resolvedParams?.id;
  
  if (!movieId) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-400 mb-4">Movie not found</h1>
          <BackButton />
        </div>
      </div>
    );
  }

  try {
    // Fetch movie details, videos, and credits in parallel
    const [movieRes, videosRes, creditsRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
        },
        cache: 'no-store'
      }),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
        },
        cache: 'no-store'
      }),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
        },
        cache: 'no-store'
      })
    ]);

    // Process movie data, videos, and credits
    let movie = null;
    let videos = [];
    let credits = { cast: [], crew: [] };
    let isTV = false;
    
    if (movieRes.ok) {
      movie = await movieRes.json();
      if (videosRes.ok) {
        const videosData = await videosRes.json();
        videos = videosData.results || [];
      }
      if (creditsRes.ok) {
        const creditsData = await creditsRes.json();
        credits = creditsData;
      }
    } else {
      // Try as TV show
      const [tvRes, tvVideosRes, tvCreditsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/tv/${movieId}?language=en-US`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
          },
          cache: 'no-store'
        }),
        fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
          },
          cache: 'no-store'
        }),
        fetch(`https://api.themoviedb.org/3/tv/${movieId}/credits?language=en-US`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
          },
          cache: 'no-store'
        })
      ]);
      
      if (tvRes.ok) {
        movie = await tvRes.json();
        isTV = true;
        if (tvVideosRes.ok) {
          const videosData = await tvVideosRes.json();
          videos = videosData.results || [];
        }
        if (tvCreditsRes.ok) {
          const creditsData = await tvCreditsRes.json();
          credits = creditsData;
        }
      }
    }

    // Filter and sort videos to get the best trailer
    const trailers = videos
      .filter(video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser'))
      .sort((a, b) => {
        if (a.type === 'Trailer' && b.type === 'Teaser') return -1;
        if (a.type === 'Teaser' && b.type === 'Trailer') return 1;
        return 0;
      });

    if (!movie) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl text-red-400 mb-4">Failed to load content</h1>
            <p className="text-gray-400 mb-6">Unable to fetch movie details. Please try again later.</p>
            <BackButton />
          </div>
        </div>
      );
    }

    const title = isTV ? movie.name : movie.title;
    const releaseDate = isTV ? movie.first_air_date : movie.release_date;
    const mediaType = isTV ? 'tv' : 'movie';

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Back Button */}
        <div className="p-4">
          <BackButton />
        </div>

        {/* Video Player Section */}
        <div className="w-full max-w-7xl mx-auto px-4 mb-8">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <VideoPlayer 
              tmdbId={movieId}
              mediaType={mediaType}
              title={title}
              poster={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : null}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            {/* Hero Section */}
            <div className="relative">
              {/* Background Backdrop */}
              {movie.backdrop_path && (
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="relative z-10 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Poster */}
                  <div className="lg:col-span-1">
                    <div className="relative group">
                      {movie.poster_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={title}
                          className="w-full max-w-sm mx-auto lg:mx-0 rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full max-w-sm mx-auto lg:mx-0 aspect-[2/3] bg-gray-700 rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-400">No Poster</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="lg:col-span-3 text-white">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {title}
                    </h1>
                    
                    {movie.tagline && (
                      <p className="text-[#fa6900] text-xl italic mb-6 font-medium">{movie.tagline}</p>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-600/30">
                        <div className="text-[#fa6900] text-2xl mb-1">⭐</div>
                        <p className="text-sm text-gray-400 mb-1">Rating</p>
                        <p className="text-xl font-bold">{movie.vote_average?.toFixed(1) || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-600/30">
                        <div className="text-[#fa6900] text-2xl mb-1">📅</div>
                        <p className="text-sm text-gray-400 mb-1">Year</p>
                        <p className="text-xl font-bold">{releaseDate ? releaseDate.split('-')[0] : 'N/A'}</p>
                      </div>
                      <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-600/30">
                        <div className="text-[#fa6900] text-2xl mb-1">⏱️</div>
                        <p className="text-sm text-gray-400 mb-1">Duration</p>
                        <p className="text-xl font-bold">{movie.runtime ? `${movie.runtime}m` : isTV ? `${movie.number_of_seasons} Seasons` : 'N/A'}</p>
                      </div>
                      <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-600/30">
                        <div className="text-[#fa6900] text-2xl mb-1">🌐</div>
                        <p className="text-sm text-gray-400 mb-1">Language</p>
                        <p className="text-xl font-bold">{movie.original_language?.toUpperCase() || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Genres */}
                    {movie.genres && movie.genres.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-[#fa6900] font-bold text-lg mb-3">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {movie.genres.map((genre) => (
                            <span key={genre.id} className="bg-gradient-to-r from-[#fa6900] to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            {movie.overview && (
              <div className="p-8 border-t border-gray-700/50">
                <h3 className="text-[#fa6900] font-bold text-xl mb-4">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
              </div>
            )}

            {/* Trailers Section */}
            {trailers.length > 0 && (
              <div className="p-8 border-t border-gray-700/50">
                <h3 className="text-[#fa6900] font-bold text-xl mb-6">Trailers & Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trailers.slice(0, 6).map((trailer) => (
                    <div key={trailer.id} className="bg-gray-700/30 rounded-xl overflow-hidden hover:bg-gray-700/50 transition-colors">
                      <div className="relative aspect-video">
                        <ImageWithFallback 
                          src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
                          alt={trailer.name}
                          className="w-full h-full object-cover"
                          fallbackSrc={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all">
                          <a 
                            href={`https://www.youtube.com/watch?v=${trailer.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors group"
                          >
                            <svg className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 3.8L6.3 3.8c-.2-.1-.4-.1-.6 0C5.5 3.9 5.4 4 5.4 4.2v11.5c0 .2.1.3.3.4.1 0 .2.1.3.1.1 0 .2 0 .3-.1l8.8-5.8c.2-.1.3-.3.3-.4 0-.2-.1-.3-.3-.4L6.3 3.8z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">{trailer.name}</h4>
                        <p className="text-gray-400 text-xs">
                          {trailer.type} • {trailer.size}p
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cast & Crew Section */}
            {(credits.cast?.length > 0 || credits.crew?.length > 0) && (
              <div className="p-8 border-t border-gray-700/50">
                <h3 className="text-[#fa6900] font-bold text-xl mb-6">Cast & Crew</h3>
                
                {/* Cast */}
                {credits.cast?.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-white font-semibold text-lg mb-4">Cast</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {credits.cast.slice(0, 12).map((person) => (
                        <div key={person.id} className="bg-gray-700/30 rounded-xl overflow-hidden hover:bg-gray-700/50 transition-colors">
                          <div className="aspect-[3/4] relative">
                            {person.profile_path ? (
                              <img 
                                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                                alt={person.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h5 className="text-white font-medium text-sm mb-1 line-clamp-2">{person.name}</h5>
                            <p className="text-gray-400 text-xs line-clamp-2">{person.character}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Crew Members */}
                {credits.crew?.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Key Crew</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {credits.crew
                        .filter(person => ['Director', 'Producer', 'Executive Producer', 'Screenplay', 'Writer', 'Director of Photography', 'Original Music Composer'].includes(person.job))
                        .slice(0, 9)
                        .map((person, index) => (
                          <div key={`${person.id}-${index}`} className="flex items-center bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                              {person.profile_path ? (
                                <img 
                                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                  alt={person.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-white font-medium text-sm mb-1 truncate">{person.name}</h5>
                              <p className="text-gray-400 text-xs truncate">{person.job}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Additional Info */}
            <div className="p-8 border-t border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Production Companies */}
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="bg-gray-700/30 p-6 rounded-xl">
                    <h4 className="text-[#fa6900] font-bold mb-3">Production</h4>
                    <div className="space-y-2">
                      {movie.production_companies.slice(0, 3).map((company) => (
                        <span key={company.id} className="block text-gray-300 text-sm">
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Release Info */}
                <div className="bg-gray-700/30 p-6 rounded-xl">
                  <h4 className="text-[#fa6900] font-bold mb-3">Release Info</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="text-gray-400">Release Date:</span> {releaseDate || 'N/A'}
                    </p>
                    {isTV && (
                      <>
                        <p className="text-gray-300">
                          <span className="text-gray-400">Status:</span> {movie.status || 'N/A'}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-gray-400">Last Aired:</span> {movie.last_air_date || 'N/A'}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="bg-gray-700/30 p-6 rounded-xl">
                  <h4 className="text-[#fa6900] font-bold mb-3">Stats</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="text-gray-400">Vote Count:</span> {movie.vote_count?.toLocaleString() || 'N/A'}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Popularity:</span> {movie.popularity?.toFixed(1) || 'N/A'}
                    </p>
                    {isTV && (
                      <p className="text-gray-300">
                        <span className="text-gray-400">Episodes:</span> {movie.number_of_episodes || 'N/A'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Movie page error:', error);
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl text-red-400 mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-6">An error occurred while loading the content</p>
          <BackButton />
        </div>
      </div>
    );
  }
}