export type TranslationKey =
  | "home"
  | "ai"
  | "business"
  | "worldNews"
  | "trends"
  | "search"
  | "viewLatest"
  | "featured"
  | "featuredDesc"
  | "aiSection"
  | "aiDesc"
  | "businessSection"
  | "businessDesc"
  | "worldSection"
  | "worldDesc"
  | "trendsSection"
  | "trendsDesc"
  | "stayUpdated"
  | "subscribe"
  | "yourEmail"
  | "footer.about"
  | "footer.contact"
  | "footer.privacy"
  | "footer.terms"
  | "footer.categories"
  | "footer.quickLinks"
  | "footer.copyright"
  | "addTitle"
  | "addContent"
  | "addDate"
  | "addImage";

type Translations = {
  [key in TranslationKey]: string;
};

type LanguageResources = {
  [lang: string]: Translations;
};

export const translations: LanguageResources = {
  ko: {
    home: "홈",
    ai: "AI 응용",
    business: "비즈니스",
    worldNews: "세계 소식",
    trends: "트렌드",
    search: "지식 검색...",
    viewLatest: "최신 업데이트 보기",
    featured: "주요 업데이트",
    featuredDesc: "모든 카테고리의 주요 지식",
    aiSection: "AI 실용 응용",
    aiDesc: "인공지능 응용 및 구현에 대한 최신 인사이트",
    businessSection: "비즈니스 수익성 향상",
    businessDesc: "비즈니스 성과 및 수익성을 향상시키기 위한 전략과 인사이트",
    worldSection: "세계의 소식",
    worldDesc: "글로벌 이벤트, 개발 및 지역 인사이트",
    trendsSection: "핫 트렌드",
    trendsDesc: "떠오르는 트렌드, 혁신 및 미래 지향적 인사이트",
    stayUpdated: "최신 정보 받기",
    subscribe: "구독하기",
    yourEmail: "이메일 주소",
    "footer.about": "소개",
    "footer.contact": "연락처",
    "footer.privacy": "개인정보 정책",
    "footer.terms": "이용약관",
    "footer.categories": "카테고리",
    "footer.quickLinks": "빠른 링크",
    "footer.copyright": "모든 권리 보유.",
    addTitle: "제목 추가",
    addContent: "내용 추가",
    addDate: "날짜 추가",
    addImage: "이미지 추가(권장: 800x500px)"
  },
  en: {
    home: "Home",
    ai: "AI",
    business: "Business",
    worldNews: "World",
    trends: "Trends",
    search: "Search knowledge...",
    viewLatest: "View Latest Updates",
    featured: "Featured Updates",
    featuredDesc: "Highlighted knowledge from across all categories",
    aiSection: "AI Practical Applications",
    aiDesc: "Latest insights on artificial intelligence applications and implementations",
    businessSection: "Business Profitability Improvement",
    businessDesc: "Strategies and insights to enhance business performance and profitability",
    worldSection: "What's Around the World",
    worldDesc: "Global events, developments, and regional insights",
    trendsSection: "Hot Trends",
    trendsDesc: "Emerging trends, innovations, and future-forward insights",
    stayUpdated: "Stay Updated",
    subscribe: "Subscribe",
    yourEmail: "Your email address",
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.categories": "Categories",
    "footer.quickLinks": "Quick Links",
    "footer.copyright": "All rights reserved.",
    addTitle: "Add Title",
    addContent: "Add Content",
    addDate: "Add Date",
    addImage: "Add Image (800x500px recommended)"
  },
  ja: {
    home: "ホーム",
    ai: "AI",
    business: "ビジネス",
    worldNews: "世界",
    trends: "トレンド",
    search: "知識を検索...",
    viewLatest: "最新の更新を見る",
    featured: "注目の更新",
    featuredDesc: "すべてのカテゴリからの注目の知識",
    aiSection: "AI実践応用",
    aiDesc: "人工知能の応用と実装に関する最新の洞察",
    businessSection: "ビジネス収益性の向上",
    businessDesc: "ビジネスパフォーマンスと収益性を向上させるための戦略と洞察",
    worldSection: "世界の様子",
    worldDesc: "グローバルイベント、開発、地域の洞察",
    trendsSection: "ホットトレンド",
    trendsDesc: "新興トレンド、イノベーション、未来志向の洞察",
    stayUpdated: "最新情報を入手",
    subscribe: "購読する",
    yourEmail: "メールアドレス",
    "footer.about": "会社概要",
    "footer.contact": "お問い合わせ",
    "footer.privacy": "プライバシーポリシー",
    "footer.terms": "利用規約",
    "footer.categories": "カテゴリ",
    "footer.quickLinks": "クイックリンク",
    "footer.copyright": "すべての権利を保有。",
    addTitle: "タイトルを追加",
    addContent: "コンテンツを追加",
    addDate: "日付を追加",
    addImage: "画像を追加（推奨：800x500px）"
  },
  zh: {
    home: "首页",
    ai: "人工智能",
    business: "商业",
    worldNews: "世界",
    trends: "趋势",
    search: "搜索知识...",
    viewLatest: "查看最新更新",
    featured: "精选更新",
    featuredDesc: "来自所有类别的精选知识",
    aiSection: "人工智能实际应用",
    aiDesc: "关于人工智能应用和实施的最新见解",
    businessSection: "商业盈利能力提升",
    businessDesc: "提高商业绩效和盈利能力的策略和见解",
    worldSection: "世界各地情况",
    worldDesc: "全球事件、发展和区域见解",
    trendsSection: "热门趋势",
    trendsDesc: "新兴趋势、创新和面向未来的见解",
    stayUpdated: "保持更新",
    subscribe: "订阅",
    yourEmail: "您的电子邮件地址",
    "footer.about": "关于我们",
    "footer.contact": "联系我们",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
    "footer.categories": "类别",
    "footer.quickLinks": "快速链接",
    "footer.copyright": "版权所有。",
    addTitle: "添加标题",
    addContent: "添加内容",
    addDate: "添加日期",
    addImage: "添加图片（建议：800x500px）"
  }
};