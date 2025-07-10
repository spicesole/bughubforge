export interface GlossaryItem {
  id: number;
  term: string;
  definition: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}
