import { useState } from "react";
import ArticleModal from "./ArticleModal";
import { useLanguage } from "../i18n/LanguageContext";

interface NewsCardProps {
  category: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
}

// Map of category to its class name for category badge styling
const categoryClasses: Record<string, string> = {
  ai: "category-ai",
  business: "category-business",
  world: "category-world",
  trends: "category-trends",
};

// Map of category to its display name
const categoryDisplayNames: Record<string, string> = {
  ai: "AI",
  business: "Business",
  world: "World",
  trends: "Trends",
};

export default function NewsCard({ category, title, content, date, imageUrl, imageAlt }: NewsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  
  // 언어에 따라 날짜 포맷 변경 (간단한 예시)
  const getFormattedDate = () => {
    if (language === 'ko') {
      return date.replace(/(\w+) (\d+), (\d+)/, '$3년 $2일 $1월');
    }
    return date;
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <div 
        className="grid-card cursor-pointer"
        onClick={openModal}
      >
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-3 left-3">
            <span className={`${categoryClasses[category]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              {categoryDisplayNames[category]}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 text-[#263238] line-clamp-2 hover:text-[#48C858] transition-colors">
            {title}
          </h3>
          
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">
              {getFormattedDate()}
            </span>
            
            <div className="flex space-x-2">
              <button 
                className="text-gray-400 hover:text-[#48C858] transition-colors"
                aria-label="Bookmark"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="far fa-bookmark"></i>
              </button>
              <button 
                className="text-gray-400 hover:text-[#48C858] transition-colors"
                aria-label="Share"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="far fa-share-square"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ArticleModal
        title={title}
        content={content}
        date={getFormattedDate()}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        category={category}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
