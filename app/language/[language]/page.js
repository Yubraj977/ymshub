import LanguageInfiniteScroll from "../../components/LanguageInfiniteScroll";

export const dynamic = 'force-dynamic';

const languageConfig = {
  nepali: { code: 'ne', name: 'Nepali', flag: '🇳🇵' },
  hindi: { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  english: { code: 'en', name: 'English', flag: '🇺🇸' }
};

export default async function LanguagePage({ params }) {
  const resolvedParams = await params;
  const language = resolvedParams?.language?.toLowerCase();
  
  if (!language || !languageConfig[language]) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-400 text-xl">Language not supported</p>
      </div>
    );
  }

  const config = languageConfig[language];

  return (
    <LanguageInfiniteScroll
      languageCode={config.code}
      languageName={config.name}
      languageFlag={config.flag}
    />
  );
}