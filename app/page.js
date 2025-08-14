import Card from "./components/Card";

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    const res = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch trending content');
    }

    const movies = await res.json();
    const moviesResult = movies.results || [];
    
    console.log(`Loaded ${moviesResult.length} trending items`);

    return (
      <div className="px-4">
        <div className="text-center mt-10 mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Trending Now
          </h2>
        </div>
        
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {moviesResult.map((item) => {
            const isMovie = item.media_type === 'movie';
            const title = isMovie ? item.title : item.name;
            const releaseDate = isMovie ? item.release_date : item.first_air_date;
            const vidsrcLink = isMovie 
              ? `https://vidsrc.xyz/embed/movie?tmdb=${item.id}`
              : `https://vidsrc.xyz/embed/tv?tmdb=${item.id}`;

            return (
              <Card 
                key={item.id}
                id={item.id}
                thumbnail={item.poster_path ? `https://image.tmdb.org/t/p/w1280${item.poster_path}` : '/placeholder-movie.jpg'}
                name={title || 'Unknown Title'}
                genre={item.media_type === 'movie' ? 'Movie' : 'TV Show'}
                rating={item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                duration={'N/A'}
                date={releaseDate ? releaseDate.split('-')[0] : 'N/A'}
                language={item.original_language ? item.original_language.toUpperCase() : 'N/A'}
                link={vidsrcLink}
                mediaType={item.media_type} // Add this line
              />
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading trending content:', error);
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-400 text-xl">Failed to load content. Please try again later.</p>
      </div>
    );
  }
}