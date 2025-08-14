"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form className="max-w-3xl mx-3 lg:mx-auto mt-4" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-[#fa6900] sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-[#fa6900]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-[#fa6900] border-[#fa6900] rounded-lg bg-[[#fa6900]] focus:ring-[#fa6900] focus:border-[#fa6900]"
          placeholder="Search Movies series and ..."
          required
        />
        <button
          type="submit"
          className="absolute end-2.5 bottom-2.5 bg-[#fa6900] hover:bg-[#fa6900] focus:ring-4 focus:outline-none focus:ring-[#fa6900] font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}