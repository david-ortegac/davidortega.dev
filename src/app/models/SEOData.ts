export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  defaultImage: string;
  twitterHandle: string;
  facebookAppId?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  language: string;
  locale: string;
  themeColor: string;
}