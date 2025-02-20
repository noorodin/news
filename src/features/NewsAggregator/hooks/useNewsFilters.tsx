import { useEffect, useState } from "react";
import { UpdateFilter } from "../types";

const useNewsFilters = () => {
  const [filters, setFilters] = useState({
    query: "",
    date: "",
    categories: [],
    sources: [],
    authors: [],
  });

  useEffect(() => {
    const savedPrefs = JSON.parse(
      localStorage.getItem("newsPreferences") ?? "{}"
    );
    setFilters((prev) => ({ ...prev, ...savedPrefs }));
  }, []);

  const updateFilter: UpdateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const savePreferences = () => {
    localStorage.setItem("newsPreferences", JSON.stringify(filters));
  };

  return { filters, updateFilter, savePreferences };
};

export default useNewsFilters;
