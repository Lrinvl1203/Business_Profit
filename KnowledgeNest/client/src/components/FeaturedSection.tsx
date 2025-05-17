import NewsCard from "./NewsCard";
import { useLanguage } from "../i18n/LanguageContext";

export default function FeaturedSection() {
  const { t } = useLanguage();
  
  // Featured cards data
  const featuredCards = [
    {
      id: 1,
      category: "ai",
      title: "The Future of Generative AI in Content Creation",
      content: "Exploring how generative AI is transforming content creation across industries with unprecedented capabilities for producing text, images, and more.",
      date: "June 22, 2023",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      imageAlt: "AI computing visualization"
    },
    {
      id: 2,
      category: "business",
      title: "5 Strategies to Increase Business Profitability",
      content: "Practical approaches to optimize operations, enhance customer experience, and leverage data analytics for improved business profitability in competitive markets.",
      date: "June 20, 2023",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      imageAlt: "Business meeting"
    },
    {
      id: 3,
      category: "world",
      title: "Global Supply Chain Transformations in 2023",
      content: "How global businesses are adapting to new challenges in supply chain management with innovative solutions and technology integration.",
      date: "June 18, 2023",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      imageAlt: "Global city connectivity"
    },
    {
      id: 4,
      category: "trends",
      title: "Emerging Digital Trends That Will Shape the Future",
      content: "Discover the latest digital trends that are transforming industries and how they'll impact businesses in the coming years.",
      date: "June 15, 2023",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      imageAlt: "Digital trends visualization"
    }
  ];

  return (
    <section id="featured-section" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#263238] mb-2">{t('featured')}</h2>
          <p className="text-gray-500">{t('featuredDesc')}</p>
        </div>
        
        <div className="grid-card-container">
          {featuredCards.map(card => (
            <NewsCard 
              key={card.id}
              category={card.category}
              title={card.title}
              content={card.content}
              date={card.date}
              imageUrl={card.imageUrl}
              imageAlt={card.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
