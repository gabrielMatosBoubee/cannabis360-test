import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Requests from './pages/Requests'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout><Requests /></Layout>
  }])

  const queryClient = new QueryClient();

  return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  )
}

export default App
