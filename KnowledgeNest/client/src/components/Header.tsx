import { useState } from "react";
import { Link } from "wouter";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, setLanguage } = useLanguage();
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/">
              <h1 className="text-2xl md:text-3xl font-bold mr-10 text-[#263238] hover:text-[#48C858] transition-colors">
                Knowledge Hub
              </h1>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><Link href="/" className="hover:text-[#48C858] font-medium text-[#263238]">{t('home')}</Link></li>
                <li><a href="#ai-section" className="hover:text-[#48C858] font-medium text-[#263238]">{t('ai')}</a></li>
                <li><a href="#business-section" className="hover:text-[#48C858] font-medium text-[#263238]">{t('business')}</a></li>
                <li><a href="#world-section" className="hover:text-[#48C858] font-medium text-[#263238]">{t('worldNews')}</a></li>
                <li><a href="#trends-section" className="hover:text-[#48C858] font-medium text-[#263238]">{t('trends')}</a></li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 mr-2">
              <input 
                type="text" 
                placeholder={t('search')} 
                className="border border-gray-200 py-2 px-4 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#48C858] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-[#48C858]" aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
            </div>
            
            <LanguageSelector onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden container mx-auto px-4 pb-2">
        <nav>
          <ul className="flex justify-between">
            <li><Link href="/" className="text-sm hover:text-[#48C858] text-[#263238]">{t('home')}</Link></li>
            <li><a href="#ai-section" className="text-sm hover:text-[#48C858] text-[#263238]">{t('ai')}</a></li>
            <li><a href="#business-section" className="text-sm hover:text-[#48C858] text-[#263238]">{t('business')}</a></li>
            <li><a href="#world-section" className="text-sm hover:text-[#48C858] text-[#263238]">{t('worldNews')}</a></li>
            <li><a href="#trends-section" className="text-sm hover:text-[#48C858] text-[#263238]">{t('trends')}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
