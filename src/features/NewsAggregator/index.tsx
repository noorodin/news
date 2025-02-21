import useFetchNews from "./hooks/useFetchNews";
import useNewsFilters from "./hooks/useNewsFilters";
import { FilterPanel, NewsList } from "./components";

const NewsAggregator: React.FC = () => {
  const { filters, updateFilter, savePreferences } = useNewsFilters();
  const { data, isLoading, isError } = useFetchNews(
    filters.query,
    filters.date,
    filters.categories,
    filters.sources,
    filters.authors
  );
  return (
    <div className="flex flex-col md:flex-row gap-1 md:h-full">
      <FilterPanel
        filters={filters}
        updateFilter={updateFilter}
        savePreferences={savePreferences}
      />
      <NewsList
        articles={data?.articles || []}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default NewsAggregator;
