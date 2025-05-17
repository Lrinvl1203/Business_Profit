import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    if (email) {
      console.log("Subscribing email:", email);
      // Additional logic would go here
      setEmail("");
    }
  };
  
  return (
    <section className="py-16 bg-[#F5F7FA]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#263238]">{t('stayUpdated')}</h2>
          <p className="mb-8 text-gray-600">Subscribe to receive the latest insights directly in your inbox.</p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <input 
              type="email" 
              placeholder={t('yourEmail')} 
              className="px-4 py-3 rounded-md border border-gray-200 flex-grow focus:outline-none focus:ring-2 focus:ring-[#48C858] focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="btn-primary px-6 py-3 rounded-md font-medium"
            >
              {t('subscribe')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
