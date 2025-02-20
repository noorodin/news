import axios from "axios";
import {
  Article,
  FetchNewsParams,
  FetchNewsResponse,
  GuardianArticle,
  NYTimesArticle,
  NewsAPIArticle,
} from "../types";
import { SOURCES } from "../constants";

const API_KEYS = {
  nytimes: "CmwPq8KWEGfG0QiGDlK6vXG0Y7RJGInA",
  guardian: "983dab9d-057a-4aa6-bc1b-f840e621dcd3",
  newsapi: "88a6284054d640aa8af114b40ba1dac9",
};

const fetchNYTimesArticles = async ({
  query,
  date,
  categories,
  authors,
}: FetchNewsParams): Promise<Article[]> => {
  const authorQuery = authors.length
    ? `byline:(${authors.map((a) => `"By ${a}"`).join(" OR ")})`
    : undefined;

  const response = await axios.get(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    {
      params: {
        "api-key": API_KEYS.nytimes,
        fq:
          [
            categories.length
              ? `news_desk:(${categories.map((c) => `"${c}"`).join(" OR ")})`
              : undefined,
            authorQuery,
          ]
            .filter(Boolean)
            .join(" AND ") || null,
        begin_date: date || null,
        end_date: date || null,
        q: query || null,
      },
    }
  );

  return response.data.response.docs.map((doc: NYTimesArticle) => ({
    title: doc.headline.main,
    source: "The New York Times",
    date: doc.pub_date,
    author: doc.byline?.original,
  }));
};

const fetchGuardianArticles = async ({
  query,
  date,
  categories,
  authors,
}: FetchNewsParams): Promise<Article[]> => {
  const requests = categories.length
    ? categories.map((category) =>
        axios.get("https://content.guardianapis.com/search", {
          params: {
            "api-key": API_KEYS.guardian,
            section: category,
            "from-date": date || null,
            "to-date": date || null,
            q:
              [
                query ?? undefined,
                authors.length ? authors.join(" OR ") : undefined,
              ]
                .filter(Boolean)
                .join(" AND ") || null,
          },
        })
      )
    : [
        axios.get("https://content.guardianapis.com/search", {
          params: {
            "api-key": API_KEYS.guardian,
            "from-date": date || null,
            "to-date": date || null,
            q:
              [
                query ?? undefined,
                authors.length ? authors.join(" OR ") : undefined,
              ]
                .filter(Boolean)
                .join(" AND ") || null,
          },
        }),
      ];

  const responses = await Promise.all(requests);
  return responses.flatMap((response) =>
    response.data.response.results.map((result: GuardianArticle) => ({
      title: result.webTitle,
      source: "The Guardian",
      date: result.webPublicationDate,
      author: result.fields?.byline,
    }))
  );
};

const fetchNewsAPIArticles = async ({
  query,
  date,
  categories,
  authors,
}: FetchNewsParams): Promise<Article[]> => {
  const response = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      apiKey: API_KEYS.newsapi,
      q: [
        query ?? undefined,
        categories.length ? categories.join(" OR ") : undefined,
        authors.length
          ? authors.map((a) => `author:${a}`).join(" OR ")
          : undefined,
      ]
        .filter(Boolean)
        .join(" AND "),
      from: date,
      to: date,
    },
  });

  return response.data.articles.map((article: NewsAPIArticle) => ({
    title: article.title,
    source: "News API",
    date: article.publishedAt,
    author: article.author,
  }));
};

const fetchers: Record<
  string,
  (params: FetchNewsParams) => Promise<Article[]>
> = {
  nytimes: fetchNYTimesArticles,
  guardian: fetchGuardianArticles,
  newsapi: fetchNewsAPIArticles,
};

export const fetchNews = async (
  params: FetchNewsParams
): Promise<FetchNewsResponse> => {
  const { sources } = params;

  const currentSources = sources.length ? sources : SOURCES.map((s) => s.value);

  const requests = currentSources.map((source) => fetchers[source]?.(params));
  const responses = await Promise.all(requests);
  const articles = responses.flat();

  return {
    articles,
  };
};
