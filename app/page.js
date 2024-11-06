// "use client"
import Image from "next/image";
import Card from "./components/Card";
import { Pagination } from "flowbite-react";

export default async function Home() {
  const res = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg2NDM3ZmNlOGVkNTNlMGZmOTAxNjk4ZmZjYmUyMyIsIm5iZiI6MTcyNzg4NjE1My44MDcyMDcsInN1YiI6IjY2ZmMzMDQyZTc4MTFlZjZjYmE2OGJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSHTZ451kreqaeW8mwu4k216v27RuRmTJmxx2DkdmsQ`,
    },
  });
  const movies = await res.json();
  const moviesResult=await movies.results;
  return (
    <div className="flex justify-center items-center mt-10 gap-4 flex-wrap">
     {
      moviesResult.map((movie)=>{
        return (<Card key={movie.id}
           thumbnail={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
          // thumbnail={'https://image.tmdb.org/t/p/w1280/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg'}
           name={`${movie.title}`} genre={'comedy'} rating={`${movie.vote_average}`} duration={'40'} date={`${movie.release_date}`} link={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}/>
)
      })
     }

    </div>
  );
}
