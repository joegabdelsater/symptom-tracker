import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useAuth } from "./contexts/auth";
import { BASE_URL } from "./api/constants/urls";
const queryClient = new QueryClient()

function App() {
  const { token } = useAuth();

  queryClient.setDefaultOptions({
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url] = queryKey;
        const response = await fetch(url as string, {
          headers: {
            Authorization: `Bearer ${token || ''}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
