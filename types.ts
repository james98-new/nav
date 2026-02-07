
export interface Bookmark {
  id: string;
  title: string;
  url: string;
  icon?: string;
  description: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export type SearchEngine = 'google' | 'baidu';
