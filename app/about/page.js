import React from 'react';
import Card from '../components/Card';

export default async function About() {
  // Fetch the list of movies
  const res = await fetch('https://vidsrc.xyz/movies/latest/page-1.json');
  const movies = await res.json();
  const moviesResult = movies.result;

  // Fetch additional details for each movie using its ID
  const detailedMovies = await Promise.all(
    moviesResult.map(async (movie) => {
     
      const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}?language=en-US`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyOTg3NTc1Mi4xNDI2OTYsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VeJrevImAytcFBxav44M1s4mS1zdr73hkwjCCI5AOMg`,
        },
      });
      const details = await tmdbRes.json();
     
    
      return {
        ...movie,
        posterPath: details.poster_path, // Additional data from TMDB
      };
    })
  );


  return (
    <div className="flex justify-center items-center mt-10 gap-4 flex-wrap">
      {movies?detailedMovies.map((movie) => (
        <Card
          key={movie.id}
          thumbnail={`https://image.tmdb.org/t/p/w1280/${movie.posterPath}`}
          name={movie.title}
          genre={'comedy'} // Adjust this if genre info is available
          rating={movie.vote_average}
          duration={'40'} // Adjust this if duration info is available
          date={movie.release_date}
          link={movie.embed_url_tmdb}
        />
      ))
      :
      <div>
        hello
        </div>}
      
    </div>
  );
}