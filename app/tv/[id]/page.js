import VideoPlayer from "../../components/VideoPlayer";
import BackButton from "../../components/BackButton";

export const dynamic = 'force-dynamic';

export default async function TVPage({ params }) {
  const resolvedParams = await params;
  const tvId = resolvedParams?.id;
  
  if (!tvId) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-400 mb-4">TV Show not found</h1>
          <BackButton />
        </div>
      </div>
    );
  }

  try {
    // Fetch TV show details
    const tvRes = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
      },
      cache: 'no-store'
    });

    if (!tvRes.ok) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl text-red-400 mb-4">Failed to load TV show</h1>
            <p className="text-gray-400 mb-6">Unable to fetch TV show details. Please try again later.</p>
            <BackButton />
          </div>
        </div>
      );
    }

    const tvShow = await tvRes.json();

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
              tmdbId={tvId}
              mediaType="tv"
              title={tvShow.name}
              poster={tvShow.poster_path ? `https://image.tmdb.org/t/p/w1280${tvShow.poster_path}` : null}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            {/* Hero Section */}
            <div className="relative">
              {/* Background Backdrop */}
              {tvShow.backdrop_path && (
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src={`https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path}`}
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
                      {tvShow.poster_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                          alt={tvShow.name}
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

                  {/* TV Show Info */}
                  <div className="lg:col-span-3 text-white">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {tvShow.name}
                    </h1>
                    
                    {tvShow.tagline && (
                      <p className="text-[#fa6900] text-xl italic mb-6 font-medium">{tvShow.tagline}</p>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-600/30">
                        <div className="text-[#fa6900] text-2xl mb-1">⭐</div>
                        <p className="text-sm text-gray-400 mb-1">Rating</p>
                        <p className="text-xl font-bold">{tvShow.vote_average?.toFixed(1) || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-600/30">
                        <div className="text-[#fa6900] text-2xl mb-1">📅</div>
                        <p className="text-sm text-gray-400 mb-1">First Aired</p>
                        <p className="text-xl font-bold">{tvShow.first_air_date ? tvShow.first_air_date.split('-')[0] : 'N/A'}</p>
                      </div>
                      <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-600/30">
                        <div className="text-[#fa6900] text-2xl mb-1">📺</div>
                        <p className="text-sm text-gray-400 mb-1">Seasons</p>
                        <p className="text-xl font-bold">{tvShow.number_of_seasons || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-600/30">
                        <div className="text-[#fa6900] text-2xl mb-1">🎬</div>
                        <p className="text-sm text-gray-400 mb-1">Episodes</p>
                        <p className="text-xl font-bold">{tvShow.number_of_episodes || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Genres */}
                    {tvShow.genres && tvShow.genres.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-[#fa6900] font-bold text-lg mb-3">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {tvShow.genres.map((genre) => (
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
            {tvShow.overview && (
              <div className="p-8 border-t border-gray-700/50">
                <h3 className="text-[#fa6900] font-bold text-xl mb-4">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{tvShow.overview}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="p-8 border-t border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Creators */}
                {tvShow.created_by && tvShow.created_by.length > 0 && (
                  <div className="bg-gray-700/30 p-6 rounded-xl">
                    <h4 className="text-[#fa6900] font-bold mb-3">Created By</h4>
                    <div className="space-y-2">
                      {tvShow.created_by.map((creator) => (
                        <span key={creator.id} className="block text-gray-300 text-sm">
                          {creator.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Networks */}
                {tvShow.networks && tvShow.networks.length > 0 && (
                  <div className="bg-gray-700/30 p-6 rounded-xl">
                    <h4 className="text-[#fa6900] font-bold mb-3">Networks</h4>
                    <div className="space-y-2">
                      {tvShow.networks.map((network) => (
                        <span key={network.id} className="block text-gray-300 text-sm">
                          {network.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show Info */}
                <div className="bg-gray-700/30 p-6 rounded-xl">
                  <h4 className="text-[#fa6900] font-bold mb-3">Show Info</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="text-gray-400">Status:</span> {tvShow.status || 'N/A'}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Language:</span> {tvShow.original_language?.toUpperCase() || 'N/A'}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Runtime:</span> {tvShow.episode_run_time?.length > 0 ? `${tvShow.episode_run_time[0]}min` : 'N/A'}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Last Aired:</span> {tvShow.last_air_date || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Production */}
                {tvShow.production_companies && tvShow.production_companies.length > 0 && (
                  <div className="bg-gray-700/30 p-6 rounded-xl">
                    <h4 className="text-[#fa6900] font-bold mb-3">Production</h4>
                    <div className="space-y-2">
                      {tvShow.production_companies.slice(0, 3).map((company) => (
                        <span key={company.id} className="block text-gray-300 text-sm">
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="bg-gray-700/30 p-6 rounded-xl">
                  <h4 className="text-[#fa6900] font-bold mb-3">Stats</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="text-gray-400">Vote Count:</span> {tvShow.vote_count?.toLocaleString() || 'N/A'}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Popularity:</span> {tvShow.popularity?.toFixed(1) || 'N/A'}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">In Production:</span> {tvShow.in_production ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TV show page error:', error);
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl text-red-400 mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-6">An error occurred while loading the TV show</p>
          <BackButton />
        </div>
      </div>
    );
  }
}