import axios from "axios";
import {
  fetchNYTimesArticles,
  fetchGuardianArticles,
  fetchNewsAPIArticles,
  fetchNews,
} from "./fetchNews";
import { FetchNewsParams } from "../types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchNews functions", () => {
  const mockParams: FetchNewsParams = {
    query: "technology",
    date: "2025-02-20",
    categories: ["tech"],
    authors: ["John Doe"],
    sources: ["nytimes", "guardian", "newsapi"],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchNYTimesArticles - returns formatted articles", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        response: {
          docs: [
            {
              headline: { main: "NYTimes Article" },
              pub_date: "2025-02-20T12:00:00Z",
              byline: { original: "By John Doe" },
            },
          ],
        },
      },
    });

    const articles = await fetchNYTimesArticles(mockParams);
    expect(articles).toEqual([
      {
        title: "NYTimes Article",
        source: "The New York Times",
        date: "2025-02-20T12:00:00Z",
        author: "By John Doe",
      },
    ]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("fetchGuardianArticles - returns formatted articles", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        response: {
          results: [
            {
              webTitle: "Guardian Article",
              webPublicationDate: "2025-02-20T12:00:00Z",
              fields: { byline: "John Doe" },
            },
          ],
        },
      },
    });

    const articles = await fetchGuardianArticles(mockParams);
    expect(articles).toEqual([
      {
        title: "Guardian Article",
        source: "The Guardian",
        date: "2025-02-20T12:00:00Z",
        author: "John Doe",
      },
    ]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("fetchNewsAPIArticles - returns formatted articles", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        articles: [
          {
            title: "NewsAPI Article",
            publishedAt: "2025-02-20T12:00:00Z",
            author: "John Doe",
          },
        ],
      },
    });

    const articles = await fetchNewsAPIArticles(mockParams);
    expect(articles).toEqual([
      {
        title: "NewsAPI Article",
        source: "News API",
        date: "2025-02-20T12:00:00Z",
        author: "John Doe",
      },
    ]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("fetchNews - fetches from multiple sources", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        response: {
          docs: [
            {
              headline: { main: "NYTimes Article" },
              pub_date: "2025-02-20",
              byline: { original: "By John Doe" },
            },
          ],
        },
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        response: {
          results: [
            {
              webTitle: "Guardian Article",
              webPublicationDate: "2025-02-20",
              fields: { byline: "John Doe" },
            },
          ],
        },
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        articles: [
          {
            title: "NewsAPI Article",
            publishedAt: "2025-02-20",
            author: "John Doe",
          },
        ],
      },
    });

    const response = await fetchNews(mockParams);
    expect(response.articles).toHaveLength(3);
    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
  });
});
