import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./app/context/AuthContext";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <p>testando</p>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
