import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';

// On définit les routes sous forme d'objets
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // On utilise notre Layout comme parent
        children: [
            {
                path: "/", // Page d'accueil (index)
                element: <SearchPage />,
            },
            {
                path: "/details/:id", // Page de détail
                element: <DetailPage />,
            },
        ],
    },
]);

function App() {
    // Plus de logique ici, tout est dans le Layout ou le router
    return <RouterProvider router={router} />;
}

export default App;