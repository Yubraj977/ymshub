import Card from "../components/Card";

export const dynamic = 'force-dynamic';

export default async function ComedyPage() {
  try {
    const res = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=35&language=en-US&page=1&sort_by=popularity.desc', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch comedy movies');
    }

    const data = await res.json();
    const movies = data.results || [];

    return (
      <div className="px-4">
        <div className="text-center mt-10 mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Comedy Movies
          </h1>
          <p className="text-gray-400 mt-2">
            Laugh out loud with these hilarious movies
          </p>
        </div>
        
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {movies.map((movie) => (
            <Card 
              key={movie.id}
              id={movie.id}
              thumbnail={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
              name={movie.title || 'Unknown Title'}
              genre="Comedy"
              rating={movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              duration={'N/A'}
              date={movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
              language={movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}
              link={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Comedy page error:', error);
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-400 text-xl">Failed to load comedy movies. Please try again later.</p>
      </div>
    );
  }
}