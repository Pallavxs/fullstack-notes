import { createBrowserRouter} from 'react-router';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <h5>Home</h5>
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    }
])