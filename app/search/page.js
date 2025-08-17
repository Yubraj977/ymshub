import Card from "../components/Card";
import Mypagination from "../components/Mypagination";

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  // In Next.js 15, searchParams is a Promise
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q;
  const page = resolvedSearchParams?.page || 1;
  
  if (!query) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-white text-xl">Please enter a search term</p>
      </div>
    );
  }

  try {
    // Search for movies and TV shows with better error handling
    const [moviesRes, tvShowsRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}&include_adult=false`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: { revalidate: 0 }
      }).catch(err => {
        console.error('Movies fetch error:', err);
        return { ok: false, json: () => ({ results: [] }) };
      }),
      
      fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=en-US&page=${page}&include_adult=false`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: { revalidate: 0 }
      }).catch(err => {
        console.error('TV shows fetch error:', err);
        return { ok: false, json: () => ({ results: [] }) };
      })
    ]);

    // Check if requests were successful
    if (!moviesRes.ok && !tvShowsRes.ok) {
      throw new Error('Both API requests failed');
    }

    const [moviesData, tvShowsData] = await Promise.all([
      moviesRes.ok ? moviesRes.json().catch(() => ({ results: [] })) : { results: [] },
      tvShowsRes.ok ? tvShowsRes.json().catch(() => ({ results: [] })) : { results: [] }
    ]);

    const movies = Array.isArray(moviesData.results) ? moviesData.results : [];
    const tvShows = Array.isArray(tvShowsData.results) ? tvShowsData.results : [];
    
    // Calculate pagination info
    const moviesTotalPages = moviesData.total_pages || 0;
    const tvTotalPages = tvShowsData.total_pages || 0;
    const totalPages = Math.max(moviesTotalPages, tvTotalPages);
    const currentPage = parseInt(page) || 1;
    
    // Combine and sort results by popularity
    const allResults = [
      ...movies.map(movie => ({ ...movie, media_type: 'movie' })),
      ...tvShows.map(show => ({ ...show, media_type: 'tv' }))
    ]
    .filter(item => item.id && (item.title || item.name)) // Filter out invalid items
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    if (allResults.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center mt-10">
          <p className="text-white text-xl mb-4">No results found for &quot;{query}&quot;</p>
          <p className="text-gray-400">Try searching with different keywords</p>
        </div>
      );
    }

    return (
      <div className="px-4">
        <div className="text-center mt-10 mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Search Results for &quot;{query}&quot;
          </h2>
          <p className="text-gray-400 mt-2">
            Found {allResults.length} results
          </p>
        </div>
        
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {allResults.map((item) => {
            const isMovie = item.media_type === 'movie';
            const title = isMovie ? item.title : item.name;
            const releaseDate = isMovie ? item.release_date : item.first_air_date;
            const vidsrcLink = isMovie 
              ? `https://vidsrc.xyz/embed/movie?tmdb=${item.id}`
              : `https://vidsrc.xyz/embed/tv?tmdb=${item.id}`;

            return (
              <Card 
                key={`${item.media_type}-${item.id}`}
                id={item.id}
                thumbnail={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                name={title || 'Unknown Title'}
                genre={item.media_type === 'movie' ? 'Movie' : 'TV Show'}
                rating={item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                duration={'N/A'}
                date={releaseDate ? releaseDate.split('-')[0] : 'N/A'}
                language={item.original_language ? item.original_language.toUpperCase() : 'N/A'}
                link={vidsrcLink}
                mediaType={item.media_type}
                item={item}
              />
            );
          })}
        </div>
        
        {totalPages > 1 && (
          <Mypagination 
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/search"
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('Search error:', error);
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-2">An error occurred while searching</p>
          <p className="text-gray-400">Please try again later</p>
          <details className="mt-4 text-left max-w-md mx-auto">
            <summary className="cursor-pointer text-sm text-gray-500">Error details</summary>
            <pre className="text-xs text-gray-600 mt-2 bg-gray-800 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}