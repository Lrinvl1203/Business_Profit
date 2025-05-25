import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#263238] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Knowledge Hub</h3>
            <p className="text-gray-300 mb-4">Your source for daily updates on AI, Business, World News, and Hot Trends.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#48C858] transition-colors" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#48C858] transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#48C858] transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#48C858] transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.categories')}</h4>
            <ul className="space-y-2">
              <li><a href="#ai-section" className="text-gray-300 hover:text-[#48C858] transition-colors">{t('ai')}</a></li>
              <li><a href="#business-section" className="text-gray-300 hover:text-[#48C858] transition-colors">{t('business')}</a></li>
              <li><a href="#world-section" className="text-gray-300 hover:text-[#48C858] transition-colors">{t('worldNews')}</a></li>
              <li><a href="#trends-section" className="text-gray-300 hover:text-[#48C858] transition-colors">{t('trends')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#48C858] transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#48C858] transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#48C858] transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#48C858] transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-[#48C858]"></i>
                <span className="text-gray-300">info@knowledgehub.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#48C858]"></i>
                <span className="text-gray-300">123 Knowledge Street, Information City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Knowledge Hub. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
