export type Article = {
  title: string;
  source: string;
  date: string;
  author: string;
};

export type FetchNewsResponse = {
  articles: Article[];
};

export type FetchNewsParams = {
  query: string;
  date?: string;
  categories: string[];
  sources: string[];
  authors: string[];
};

export type NYTimesArticle = {
  headline: { main: string };
  pub_date: string;
  byline?: { original?: string };
};

export type GuardianArticle = {
  webTitle: string;
  webPublicationDate: string;
  fields?: { byline?: string };
};

export type NewsAPIArticle = {
  title: string;
  publishedAt: string;
  author?: string;
};

export type ArticlesStatus = {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
};

export type UpdateFilter = (key: string, value: string | string[]) => void;
