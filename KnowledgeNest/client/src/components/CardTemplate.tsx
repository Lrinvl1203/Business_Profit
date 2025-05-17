import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import ArticleModal from "./ArticleModal";

interface CardTemplateProps {
  category: string;
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

export default function CardTemplate({ category }: CardTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  
  // 카테고리별 타이틀 플레이스홀더
  const titlePlaceholders: Record<string, string> = {
    ai: t('addTitle'),
    business: t('addTitle'),
    world: t('addTitle'),
    trends: t('addTitle'),
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
        className="grid-card cursor-pointer hover:border-[#48C858] border border-transparent"
        onClick={openModal}
      >
        <div className="relative">
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            {/* Image placeholder with instructions */}
            <div className="text-center p-4">
              <i className="fas fa-image text-4xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-500">{t('addImage')}</p>
            </div>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className={`${categoryClasses[category]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              {categoryDisplayNames[category]}
            </span>
          </div>
        </div>
        <div className="p-4">
          {/* Title area with instructions */}
          <h3 className="text-lg font-bold mb-2 text-[#263238] hover:text-[#48C858] transition-colors">
            {/* <!-- @EDITABLE: Title --> */}
            {titlePlaceholders[category]}
            {/* <!-- @END_EDITABLE --> */}
          </h3>
          
          <div className="flex justify-between items-center mt-3">
            {/* Date area with instructions */}
            <span className="text-sm text-gray-500">
              {/* <!-- @EDITABLE: Date --> */}
              {t('addDate')}
              {/* <!-- @END_EDITABLE --> */}
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
        title={titlePlaceholders[category]}
        content={t('addContent')}
        date={t('addDate')}
        imageUrl="https://images.unsplash.com/photo-1497296690583-da0147e0f19a?w=800&auto=format&fit=crop&q=80"
        imageAlt="Empty template"
        category={category}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
