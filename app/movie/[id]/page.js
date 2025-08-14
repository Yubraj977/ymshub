import VideoPlayer from "../../components/VideoPlayer";

export const dynamic = 'force-dynamic';

export default async function MoviePage({ params }) {
  const resolvedParams = await params;
  const movieId = resolvedParams?.id;
  
  if (!movieId) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-400 text-xl">Movie not found</p>
      </div>
    );
  }

  try {
    // Fetch movie details
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
      },
      cache: 'no-store'
    });

    // Also try TV show if movie fails
    let movie = null;
    let isTV = false;
    
    if (movieRes.ok) {
      movie = await movieRes.json();
    } else {
      // Try as TV show
      const tvRes = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?language=en-US`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
        },
        cache: 'no-store'
      });
      
      if (tvRes.ok) {
        movie = await tvRes.json();
        isTV = true;
      }
    }

    if (!movie) {
      return (
        <div className="flex justify-center items-center mt-10">
          <p className="text-red-400 text-xl">Failed to load movie details</p>
        </div>
      );
    }

    const title = isTV ? movie.name : movie.title;
    const releaseDate = isTV ? movie.first_air_date : movie.release_date;
    const vidsrcUrl = isTV 
      ? `https://vidsrc.xyz/embed/tv?tmdb=${movieId}`
      : `https://vidsrc.xyz/embed/movie?tmdb=${movieId}`;

    return (
      <div className="min-h-screen">
        {/* Video Player Section */}
        <div className="w-full">
          <VideoPlayer 
            src={vidsrcUrl}
            title={title}
            poster={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : null}
          />
        </div>

        {/* Movie Details Section */}
        <div className="px-4 py-8 max-w-6xl mx-auto">
          <div className="bg-slate-800 bg-opacity-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Movie Poster */}
              <div className="md:col-span-1">
                <div className="sticky top-4">
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={title}
                      className="w-full rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No Poster</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Movie Info */}
              <div className="md:col-span-2 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h1>
                
                {movie.tagline && (
                  <p className="text-[#fa6900] text-lg italic mb-4">{movie.tagline}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="text-[#fa6900] font-bold">Rating</p>
                    <p className="text-xl">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="text-[#fa6900] font-bold">Year</p>
                    <p className="text-xl">{releaseDate ? releaseDate.split('-')[0] : 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="text-[#fa6900] font-bold">Duration</p>
                    <p className="text-xl">{movie.runtime ? `${movie.runtime}min` : isTV ? `${movie.number_of_seasons} Seasons` : 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="text-[#fa6900] font-bold">Language</p>
                    <p className="text-xl">{movie.original_language?.toUpperCase() || 'N/A'}</p>
                  </div>
                </div>

                {movie.genres && movie.genres.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[#fa6900] font-bold mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span key={genre.id} className="bg-[#fa6900] text-white px-3 py-1 rounded-full text-sm">
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {movie.overview && (
                  <div className="mb-6">
                    <h3 className="text-[#fa6900] font-bold mb-2">Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                  </div>
                )}

                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[#fa6900] font-bold mb-2">Production Companies</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.production_companies.slice(0, 5).map((company) => (
                        <span key={company.id} className="bg-slate-700 text-white px-3 py-1 rounded text-sm">
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {isTV && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-700 p-3 rounded-lg">
                      <p className="text-[#fa6900] font-bold">First Air Date</p>
                      <p>{movie.first_air_date || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-700 p-3 rounded-lg">
                      <p className="text-[#fa6900] font-bold">Status</p>
                      <p>{movie.status || 'N/A'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Movie page error:', error);
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-400 text-xl">An error occurred while loading the movie</p>
      </div>
    );
  }
}