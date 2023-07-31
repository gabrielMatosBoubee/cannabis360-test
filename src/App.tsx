// import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Requests from './pages/Requests'

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout><Requests /></Layout>
  }])

  return (
    <RouterProvider router={router} />
  )
}

export default App
