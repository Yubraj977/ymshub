import VideoPlayer from "../../components/VideoPlayer";

export const dynamic = 'force-dynamic';

export default async function TVPage({ params }) {
  const resolvedParams = await params;
  const tvId = resolvedParams?.id;
  
  if (!tvId) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-400 text-xl">TV Show not found</p>
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
        <div className="flex justify-center items-center mt-10">
          <p className="text-red-400 text-xl">Failed to load TV show details</p>
        </div>
      );
    }

    const tvShow = await tvRes.json();
    const vidsrcUrl = `https://vidsrc.xyz/embed/tv?tmdb=${tvId}`;

    return (
      <div className="min-h-screen">
        {/* Video Player Section */}
        <div className="w-full">
          <VideoPlayer 
            src={vidsrcUrl}
            title={tvShow.name}
            poster={tvShow.poster_path ? `https://image.tmdb.org/t/p/w1280${tvShow.poster_path}` : null}
          />
        </div>

        {/* TV Show Details Section */}
        <div className="px-4 py-8 max-w-6xl mx-auto">
          <div className="bg-slate-800 bg-opacity-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* TV Show Poster */}
              <div className="md:col-span-1">
                <div className="sticky top-4">
                  {tvShow.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                      alt={tvShow.name}
                      className="w-full rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No Poster</span>
                    </div>
                  )}
                </div>
              </div>

              {/* TV Show Info */}
              <div className="md:col-span-2 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">{tvShow.name}</h1>
                
                {tvShow.tagline && (
                  <p className="text-[#fa6900] text-lg italic mb-4">{tvShow.tagline}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="text-[#fa6900] font-bold">Rating</p>
                    <p className="text-xl">⭐ {tvShow.vote_average?.toFixed(1) || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="text-[#fa6900] font-bold">First Aired</p>
                    <p className="text-xl">{tvShow.first_air_date ? tvShow.first_air_date.split('-')[0] : 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="text-[#fa6900] font-bold">Seasons</p>
                    <p className="text-xl">{tvShow.number_of_seasons || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="text-[#fa6900] font-bold">Episodes</p>
                    <p className="text-xl">{tvShow.number_of_episodes || 'N/A'}</p>
                  </div>
                </div>

                {tvShow.genres && tvShow.genres.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[#fa6900] font-bold mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {tvShow.genres.map((genre) => (
                        <span key={genre.id} className="bg-[#fa6900] text-white px-3 py-1 rounded-full text-sm">
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tvShow.overview && (
                  <div className="mb-6">
                    <h3 className="text-[#fa6900] font-bold mb-2">Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{tvShow.overview}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-[#fa6900] font-bold">Status</p>
                    <p>{tvShow.status || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-[#fa6900] font-bold">Language</p>
                    <p>{tvShow.original_language?.toUpperCase() || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-[#fa6900] font-bold">Episode Runtime</p>
                    <p>{tvShow.episode_run_time?.length > 0 ? `${tvShow.episode_run_time[0]}min` : 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-[#fa6900] font-bold">Last Aired</p>
                    <p>{tvShow.last_air_date || 'N/A'}</p>
                  </div>
                </div>

                {tvShow.created_by && tvShow.created_by.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[#fa6900] font-bold mb-2">Created By</h3>
                    <div className="flex flex-wrap gap-2">
                      {tvShow.created_by.map((creator) => (
                        <span key={creator.id} className="bg-slate-700 text-white px-3 py-1 rounded text-sm">
                          {creator.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tvShow.networks && tvShow.networks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[#fa6900] font-bold mb-2">Networks</h3>
                    <div className="flex flex-wrap gap-2">
                      {tvShow.networks.map((network) => (
                        <span key={network.id} className="bg-slate-700 text-white px-3 py-1 rounded text-sm">
                          {network.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tvShow.production_companies && tvShow.production_companies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[#fa6900] font-bold mb-2">Production Companies</h3>
                    <div className="flex flex-wrap gap-2">
                      {tvShow.production_companies.slice(0, 5).map((company) => (
                        <span key={company.id} className="bg-slate-700 text-white px-3 py-1 rounded text-sm">
                          {company.name}
                        </span>
                      ))}
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
    console.error('TV show page error:', error);
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-400 text-xl">An error occurred while loading the TV show</p>
      </div>
    );
  }
}
