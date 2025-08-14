export default function AboutPage() {
  return (
    <div className="px-4 max-w-4xl mx-auto">
      <div className="text-center mt-10 mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          About YMS<span className="text-[#fa6900]">HUB</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Your ultimate destination for movies and TV shows
        </p>
      </div>

      <div className="space-y-8 text-white">
        <section className="bg-slate-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#fa6900]">What is YmsHub?</h2>
          <p className="text-gray-300 leading-relaxed">
            YmsHub is a comprehensive movie and TV show discovery platform that helps you find and enjoy your favorite entertainment content. We provide access to a vast library of movies and series across different genres, languages, and release years.
          </p>
        </section>

        <section className="bg-slate-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#fa6900]">Features</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-[#fa6900] mr-3">•</span>
              <span>Extensive collection of movies and TV shows</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#fa6900] mr-3">•</span>
              <span>Advanced search functionality</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#fa6900] mr-3">•</span>
              <span>Genre-based categorization (Comedy, Action, and more)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#fa6900] mr-3">•</span>
              <span>Multi-language content support</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#fa6900] mr-3">•</span>
              <span>Trending and popular content discovery</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#fa6900] mr-3">•</span>
              <span>User-friendly responsive design</span>
            </li>
          </ul>
        </section>

        <section className="bg-slate-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#fa6900]">Language Support</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We support content in multiple languages to cater to diverse audiences:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg text-center">
              <h3 className="font-bold text-[#fa6900]">NEPALI</h3>
              <p className="text-sm text-gray-400 mt-2">Nepali movies and shows</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg text-center">
              <h3 className="font-bold text-[#fa6900]">HINDI</h3>
              <p className="text-sm text-gray-400 mt-2">Bollywood and Hindi content</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg text-center">
              <h3 className="font-bold text-[#fa6900]">ENGLISH</h3>
              <p className="text-sm text-gray-400 mt-2">Hollywood and international</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#fa6900]">Open Source</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            YmsHub is an open-source project, and we welcome contributions from the community. 
            Whether youre a developer, designer, or content enthusiast, there are many ways to get involved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://github.com/Yubraj977/ymshub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#fa6900] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              Contribute on GitHub
            </a>
          </div>
        </section>

        <section className="bg-slate-800 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#fa6900]">Contact & Support</h2>
          <p className="text-gray-300 leading-relaxed">
            Have questions, suggestions, or need help? Feel free to reach out to us through our GitHub repository 
            or contribute to making YmsHub even better for everyone.
          </p>
        </section>
      </div>
    </div>
  );
}