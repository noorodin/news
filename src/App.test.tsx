import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

test("renders App component", () => {
  render(<App />);
  expect(screen.getByText("News Aggregator")).toBeInTheDocument();
});
