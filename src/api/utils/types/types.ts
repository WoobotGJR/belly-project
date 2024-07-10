interface Paginable<T> {
  items: T[];
  currentPage: number;
  totalCount: number;
  pageSize: number;
  totalPages: number;
}

interface Bean {
  backgroundColor: string;
  beanId: number;
  colorGroup: string;
  description: string;
  flavorName: string;
  glutenFree: boolean;
  groupName: string[];
  imageUrl: string;
  ingredients: string[];
  kosher: boolean;
  seasonal: boolean;
  sugarFree: boolean;
}

export type { Paginable, Bean };
