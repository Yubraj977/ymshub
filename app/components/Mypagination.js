
"use client";
import { useRouter, useSearchParams } from "next/navigation";

const Mypagination = ({ currentPage, totalPages, baseUrl }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const url = new URL(baseUrl, window.location.origin);
    
    // Preserve existing search params (like query for search page)
    searchParams.forEach((value, key) => {
      if (key !== 'page') {
        url.searchParams.set(key, value);
      }
    });
    
    if (page > 1) {
      url.searchParams.set('page', page.toString());
    }
    
    router.push(url.toString());
  };

  const renderPageButtons = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 text-sm leading-tight text-gray-300 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-white rounded-l-lg transition-colors"
        >
          Previous
        </button>
      );
    }

    // First page if not visible
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm leading-tight text-gray-300 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-white transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2 text-sm leading-tight text-gray-400 bg-gray-800 border border-gray-600">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm leading-tight border border-gray-600 transition-colors ${
            i === currentPage
              ? 'text-white bg-[#fa6900] border-[#fa6900]'
              : 'text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2 text-sm leading-tight text-gray-400 bg-gray-800 border border-gray-600">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm leading-tight text-gray-300 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-white transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 text-sm leading-tight text-gray-300 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-white rounded-r-lg transition-colors"
        >
          Next
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 mb-4">
      <nav aria-label="Page navigation">
        <div className="flex -space-x-px">
          {renderPageButtons()}
        </div>
      </nav>
      <div className="text-center mt-4 text-gray-400 text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Mypagination;
