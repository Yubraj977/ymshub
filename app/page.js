import InfiniteScroll from "./components/InfiniteScroll";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <InfiniteScroll
      fetchUrl="https://api.themoviedb.org/3/trending/all/day?language=en-US"
      title="Trending Now"
      contentType="mixed"
    />
  );
}