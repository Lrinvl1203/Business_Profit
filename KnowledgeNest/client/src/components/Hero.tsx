import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#263238] mb-6">
              <span className="text-[#48C858]">Lessons and insights</span>
              <br />
              from 8 years
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Where to grow your business as a photographer: site or social media?
            </p>
            <a 
              href="#featured-section" 
              className="btn-primary inline-block px-8 py-3 text-base"
            >
              {t('viewLatest')}
            </a>
          </div>

          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80" 
                alt="Knowledge sharing illustration" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#E8F5E9] rounded-full z-0"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#E8F5E9] rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
