import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../utils/fetchNews";
import { FetchNewsResponse } from "../types";

export const useFetchNews = (
  query: string,
  date: string,
  categories: string[],
  sources: string[],
  authors: string[]
) => {
  return useQuery<FetchNewsResponse>({
    queryKey: ["news", query, date, categories, sources, authors],
    queryFn: () =>
      fetchNews({
        query,
        date,
        categories,
        sources,
        authors,
      }),
  });
};

export default useFetchNews;
