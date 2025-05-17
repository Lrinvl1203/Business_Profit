import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import CategorySection from "@/components/CategorySection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <FeaturedSection />
      
      <CategorySection 
        id="ai-section"
        title="AI Practical Applications"
        description="Latest insights on artificial intelligence applications and implementations"
        category="ai"
        bgColor="bg-[#F8F9FA]"
      />
      
      <CategorySection 
        id="business-section"
        title="Business Profitability Improvement"
        description="Strategies and insights to enhance business performance and profitability"
        category="business"
        bgColor="bg-white"
      />
      
      <CategorySection 
        id="world-section"
        title="What's Around the World"
        description="Global events, developments, and regional insights"
        category="world"
        bgColor="bg-[#F8F9FA]"
      />
      
      <CategorySection 
        id="trends-section"
        title="Hot Trends"
        description="Emerging trends, innovations, and future-forward insights"
        category="trends"
        bgColor="bg-white"
      />
      
      <Newsletter />
      <Footer />
    </div>
  );
}
