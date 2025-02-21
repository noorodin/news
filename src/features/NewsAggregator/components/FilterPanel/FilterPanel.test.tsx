import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FetchNewsParams } from "../../types";
import { CATEGORIES, SOURCES, AUTHORS } from "../../constants";
import FilterPanel from "./FilterPanel";

const mockUpdateFilter = jest.fn();
const mockSavePreferences = jest.fn();

const defaultFilters: FetchNewsParams = {
  query: "",
  date: "",
  categories: [],
  sources: [],
  authors: [],
};

describe("FilterPanel Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all inputs and button", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
        savePreferences={mockSavePreferences}
      />
    );

    expect(
      screen.getByPlaceholderText("Enter keyword ...")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select Date")).toBeInTheDocument();
    expect(screen.getByText("Select categories")).toBeInTheDocument();
    expect(screen.getByText("Select sources")).toBeInTheDocument();
    expect(screen.getByText("Select authors")).toBeInTheDocument();
    expect(screen.getByText("Save Preferences")).toBeInTheDocument();
  });

  test("updates query on search", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
        savePreferences={mockSavePreferences}
      />
    );

    const searchInput = screen.getByPlaceholderText("Enter keyword ...");
    fireEvent.change(searchInput, { target: { value: "Breaking News" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    expect(mockUpdateFilter).toHaveBeenCalledWith("query", "Breaking News");
  });

  test("updates categories", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
        savePreferences={mockSavePreferences}
      />
    );

    const categorySelect = screen.getByText("Select categories");
    fireEvent.mouseDown(categorySelect);
    fireEvent.click(screen.getByText(CATEGORIES[0].label));

    expect(mockUpdateFilter).toHaveBeenCalledWith("categories", [
      CATEGORIES[0].value,
    ]);
  });

  test("updates date", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
        savePreferences={mockSavePreferences}
      />
    );

    const datePicker = screen.getByPlaceholderText("Select Date");
    fireEvent.mouseDown(datePicker);
    fireEvent.change(datePicker, { target: { value: "2024-02-20" } });
    fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[0]);

    expect(mockUpdateFilter).toHaveBeenCalledWith("date", "2024-02-20");
  });

  test("updates sources", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
        savePreferences={mockSavePreferences}
      />
    );

    const sourcesSelect = screen.getByText("Select sources");
    fireEvent.mouseDown(sourcesSelect);
    fireEvent.click(screen.getByText(SOURCES[0].label));

    expect(mockUpdateFilter).toHaveBeenCalledWith("sources", [
      SOURCES[0].value,
    ]);
  });

  test("updates authors", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
        savePreferences={mockSavePreferences}
      />
    );

    const authorsSelect = screen.getByText("Select authors");
    fireEvent.mouseDown(authorsSelect);
    fireEvent.click(screen.getByText(AUTHORS[0].label));

    expect(mockUpdateFilter).toHaveBeenCalledWith("authors", [
      AUTHORS[0].value,
    ]);
  });

  test("calls savePreferences on button click", async () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
        savePreferences={mockSavePreferences}
      />
    );

    const saveButton = screen.getByText("Save Preferences");
    fireEvent.click(saveButton);

    expect(mockSavePreferences).toHaveBeenCalledTimes(1);
    expect(saveButton).toHaveTextContent("Saved!");

    await waitFor(
      () => {
        expect(saveButton).toHaveTextContent("Save Preferences");
      },
      { timeout: 1500 }
    );
  });
});
