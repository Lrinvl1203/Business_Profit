import { useState, useEffect } from "react";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" }
];

interface LanguageSelectorProps {
  onLanguageChange: (lang: string) => void;
}

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]); // 기본 언어: 한국어

  useEffect(() => {
    // 브라우저의 localStorage에서 언어 설정을 가져옴
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
      const foundLang = languages.find(lang => lang.code === savedLang);
      if (foundLang) {
        setCurrentLang(foundLang);
        onLanguageChange(foundLang.code);
      }
    } else {
      // 기본 언어 설정 및 저장
      localStorage.setItem("preferredLanguage", currentLang.code);
      onLanguageChange(currentLang.code);
    }
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);
    localStorage.setItem("preferredLanguage", lang.code);
    onLanguageChange(lang.code);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm border border-[#E0E0E0] hover:border-[#48C858] transition-all"
      >
        <span className="mr-1">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg z-50 w-48 py-1 border border-[#E0E0E0]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-[#F5F7FA] ${
                currentLang.code === lang.code ? 'bg-[#E8F5E9] text-[#43A046]' : ''
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}