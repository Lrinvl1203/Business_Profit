import { useEffect, useRef } from 'react';

interface ArticleModalProps {
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleModal({
  title,
  content,
  date,
  imageUrl,
  imageAlt,
  category,
  isOpen,
  onClose
}: ArticleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 카테고리 스타일 매핑
  const categoryClasses: { [key: string]: string } = {
    ai: "bg-[#43A046] text-white",
    business: "bg-[#388E3B] text-white",
    world: "bg-[#237D31] text-white",
    trends: "bg-[#1B5E1F] text-white"
  };

  // 카테고리 이름 매핑
  const categoryNames: { [key: string]: string } = {
    ai: "AI",
    business: "Business",
    world: "World",
    trends: "Trends"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`${categoryClasses[category]} text-xs font-semibold px-3 py-1 rounded-full`}>
              {categoryNames[category]}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-3 text-[#263238]">{title}</h2>
          <p className="text-gray-500 text-sm mb-6">{date}</p>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {content}
            </p>
            {/* 콘텐츠가 더 많으면 여기에 더 추가 */}
            <p className="text-gray-700 leading-relaxed mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum, ligula at feugiat dictum, metus nulla ultricies eros, ac tincidunt quam mauris in lorem. Sed feugiat, metus at maximus posuere, velit ante commodo nibh, ac dapibus tortor mi vel sapien.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Quisque nec massa ac enim posuere efficitur. Donec semper nisl nec libero ultrices, vel euismod ante mattis. Aenean id pellentesque eros. Maecenas non fringilla nisl, ac egestas diam. Donec elementum nulla vel enim hendrerit, et congue elit tempus.
            </p>
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-[#48C858] flex items-center">
                <i className="far fa-bookmark mr-2"></i>
                <span className="text-sm">Save</span>
              </button>
              <button className="text-gray-500 hover:text-[#48C858] flex items-center">
                <i className="far fa-share-square mr-2"></i>
                <span className="text-sm">Share</span>
              </button>
            </div>
            
            <button 
              className="btn-secondary flex items-center"
              onClick={onClose}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}