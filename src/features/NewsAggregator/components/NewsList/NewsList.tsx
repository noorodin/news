import { Alert, List, Spin } from "antd";
import { Article, ArticlesStatus } from "../../types";
import dayjs from "dayjs";
import { ListEmptyText } from "../../constants";

const NewsList = ({ articles, isLoading, isError }: ArticlesStatus) => (
  <div className="overflow-auto md:h-screen p-4 flex w-full flex-col items-start">
    {isLoading && <Spin className="self-center !my-8" />}
    {isError && (
      <Alert message="Error loading news" type="error" className="w-full" />
    )}
    {!isLoading && !isError && (
      <List
        className="w-full"
        dataSource={articles}
        locale={{ emptyText: ListEmptyText }}
        renderItem={(article: Article) => (
          <List.Item>
            <List.Item.Meta
              title={article.title}
              description={`${article.source} - ${dayjs(article.date).format(
                "YYYY-MM-DD"
              )}${article.author ? ` - ${article.author}` : ""}`}
            />
          </List.Item>
        )}
      />
    )}
  </div>
);

export default NewsList;
