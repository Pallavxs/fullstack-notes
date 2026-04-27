import { createBrowserRouter} from 'react-router';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import CreateProduct from './features/products/pages/CreateProduct.jsx';
import Dashboard from './features/products/pages/dashboard.jsx';
import Protected from './features/auth/components/Protected.jsx';
import Home from './features/products/pages/home.jsx';
import ProductDetail from './features/products/pages/productDetail.jsx';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/product/:productId',
        element: <ProductDetail />
    },
    {
        path: '/seller',
        children: [
            {
                path: 'create-product',
                element: <Protected role='seller'> <CreateProduct /> </Protected>
            },
            {
                path: 'dashboard',
                element:  <Protected role='seller'> <Dashboard /> </Protected>
            }
        ]
    }
])