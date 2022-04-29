import { colors } from './util/colors';
import { ChampionsContextProvider } from './store/champions-context';
import Navigation from './Navigation';
import { NotificationContextProvider } from './store/notification-context';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <ChampionsContextProvider>
          <Navigation />
        </ChampionsContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  );
}
