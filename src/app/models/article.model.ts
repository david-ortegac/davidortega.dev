export interface Article {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'devops' | 'architecture';
  imageUrl?: string;
  author: string;
  createdAt: any; // Firebase Timestamp
  updatedAt: any;
  status: 'draft' | 'published';
  slug: string;
}
