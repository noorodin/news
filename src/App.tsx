import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewsAggregator from "./features/NewsAggregator";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsAggregator />
    </QueryClientProvider>
  );
}

export default App;
