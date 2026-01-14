import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import Top100Page from "./pages/Top100Page";
import AddTorrentPage from "./pages/AddTorrentPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <SearchPage />,
        },
        {
          path: "/details/:id",
          element: <DetailPage />,
        },
        {
          path: "/top-100",
          element: <Top100Page />,
        },
        { path: "/upload", element: <AddTorrentPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
