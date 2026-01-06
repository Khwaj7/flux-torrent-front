import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './Layout';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <SearchPage/>,
            },
            {
                path: "/details/:id",
                element: <DetailPage/>,
            },
        ],
    },
], {
    basename: import.meta.env.BASE_URL
});

function App() {
    return <RouterProvider router={router}/>;
}

export default App;