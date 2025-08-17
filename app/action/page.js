import InfiniteScroll from "../components/InfiniteScroll";

export const dynamic = 'force-dynamic';

export default function ActionPage() {
  return (
    <InfiniteScroll
      fetchUrl="https://api.themoviedb.org/3/discover/movie?with_genres=28&language=en-US&sort_by=popularity.desc"
      title="Action Movies"
      subtitle="Heart-pounding action and thrilling adventures"
      contentType="movie"
    />
  );
}