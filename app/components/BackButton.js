"use client"
import { useRouter } from 'next/navigation';

const BackButton = ({ className = "" }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200 ${className}`}
    >
      <svg 
        className="w-5 h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
      Back
    </button>
  );
};

export default BackButton;