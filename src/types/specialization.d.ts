export type SpecializationData = {
  items: SpecializationItems[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
};

export type SpecializationItems = {
  id: string;
  title: string;
  keywords: KeywordItems[];
};

export type KeywordItems = {
  id: string;
  keyword: string;
};
