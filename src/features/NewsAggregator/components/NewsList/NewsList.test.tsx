import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsList from "./NewsList";
import { Article } from "../../types";

describe("NewsList Component", () => {
  const mockArticles: Article[] = [
    {
      title: "Article 1",
      source: "Source A",
      date: "2023-01-01",
      author: "Author A",
    },
    {
      title: "Article 2",
      source: "Source B",
      date: "2023-01-02",
      author: "Author B",
    },
  ];

  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  test("displays loading spinner when loading", () => {
    const { container } = render(
      <NewsList articles={[]} isLoading={true} isError={false} />
    );

    const spinner = container.getElementsByClassName(
      "ant-spin ant-spin-spinning"
    );
    expect(spinner.length).toBeGreaterThan(0);
  });

  test("displays error message when there is an error", () => {
    render(<NewsList articles={[]} isLoading={false} isError={true} />);

    expect(screen.getByText("Error loading news")).toBeInTheDocument();
  });

  test("displays articles when not loading and no error", () => {
    render(
      <NewsList articles={mockArticles} isLoading={false} isError={false} />
    );

    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();

    expect(
      screen.getByText("Source A - 2023-01-01 - Author A")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Source B - 2023-01-02 - Author B")
    ).toBeInTheDocument();
  });
});
