import { useState } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import { AUTHORS, CATEGORIES, SOURCES } from "../constants";
import dayjs from "dayjs";
import { UpdateFilter, FetchNewsParams } from "../types";

const { Option } = Select;

type FilterPanelProps = {
  filters: FetchNewsParams;
  updateFilter: UpdateFilter;
  savePreferences: () => void;
};

const FilterPanel = ({
  filters,
  updateFilter,
  savePreferences,
}: FilterPanelProps) => {
  const [saveText, setSaveText] = useState<string>("Save Preferences");

  const onSave = () => {
    savePreferences();
    setSaveText("Saved!");

    setTimeout(() => {
      setSaveText("Save Preferences");
    }, 2000);
  };

  return (
    <div className="w-full md:w-md flex flex-col gap-4 bg-gray-50 h-full p-4 border-b-1 md:border-b-0 md:border-r-1 border-gray-200">
      <h3 className="p-4 bg-gray-200">News Aggregator!</h3>

      <Input.Search
        placeholder="Enter keyword ..."
        onSearch={(value) => updateFilter("query", value)}
        enterButton
        allowClear
      />

      <Select
        mode="multiple"
        placeholder="Select categories"
        value={filters.categories}
        onChange={(value) => updateFilter("categories", value)}
        allowClear
      >
        {CATEGORIES.map((cat) => (
          <Option key={cat.value} value={cat.value}>
            {cat.label}
          </Option>
        ))}
      </Select>

      <DatePicker
        onChange={(date) =>
          updateFilter("date", date ? dayjs(date).format("YYYY-MM-DD") : "")
        }
        placeholder="Select Date"
      />

      <Select
        mode="multiple"
        placeholder="Select sources"
        value={filters.sources}
        onChange={(value) => updateFilter("sources", value)}
        allowClear
      >
        {SOURCES.map((src) => (
          <Option key={src.value} value={src.value}>
            {src.label}
          </Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        placeholder="Select authors"
        value={filters.authors}
        onChange={(value) => updateFilter("authors", value)}
        allowClear
      >
        {AUTHORS.map((author) => (
          <Option key={author.value} value={author.value}>
            {author.label}
          </Option>
        ))}
      </Select>

      <Button type="primary" onClick={onSave}>
        {saveText}
      </Button>
    </div>
  );
};

export default FilterPanel;
