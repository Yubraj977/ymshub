import InfiniteScroll from "../components/InfiniteScroll";

export const dynamic = 'force-dynamic';

export default function ComedyPage() {
  return (
    <InfiniteScroll
      fetchUrl="https://api.themoviedb.org/3/discover/movie?with_genres=35&language=en-US&sort_by=popularity.desc"
      title="Comedy Movies"
      subtitle="Laugh out loud with these hilarious movies"
      contentType="movie"
    />
  );
}