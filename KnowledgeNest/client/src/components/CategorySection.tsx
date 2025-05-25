import CardTemplate from "./CardTemplate";
import { useLanguage } from "../i18n/LanguageContext";

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  category: "ai" | "business" | "world" | "trends";
  bgColor: string;
}

export default function CategorySection({ id, title, description, category, bgColor }: CategorySectionProps) {
  const { t } = useLanguage();
  
  // 카테고리별 아이콘 클래스 매핑
  const categoryIcons: Record<string, string> = {
    ai: "fas fa-robot",
    business: "fas fa-chart-line",
    world: "fas fa-globe-americas",
    trends: "fas fa-chart-bar"
  };
  
  return (
    <section id={id} className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-start md:items-center mb-10">
          <div className={`text-[#48C858] mr-4 hidden md:block`}>
            <i className={`${categoryIcons[category]} text-3xl`}></i>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#263238] mb-2">{title}</h2>
            <p className="text-gray-500">{description}</p>
          </div>
        </div>
        
        <div className="grid-card-container">
          {/* Three empty card templates for this category */}
          <CardTemplate category={category} />
          <CardTemplate category={category} />
          <CardTemplate category={category} />
          <CardTemplate category={category} />
        </div>
      </div>
    </section>
  );
}
