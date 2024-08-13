
import AppRouter from "./router/router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from "./contexts/auth";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider >
    </BrowserRouter>
  )
}

export default App
