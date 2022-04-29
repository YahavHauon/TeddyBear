import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "./Navigation";
import { ChampionsContextProvider } from "./store/champions-context";
import { NotificationContextProvider } from "./store/notification-context";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChampionsContextProvider>
        <Navigation />
      </ChampionsContextProvider>
    </QueryClientProvider>
  );
}
