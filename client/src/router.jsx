import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Watch from './pages/Watch';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Profiles from './pages/Profiles';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContent from './pages/admin/AdminContentPortal';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Home /> },
      { path: 'movies', element: <Browse type="movie" /> },
      { path: 'series', element: <Browse type="series" /> },
      { path: 'movie/:id', element: <MovieDetails /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'history', element: <History /> },
      { path: 'profiles', element: <Profiles /> }
    ]
  },
  { path: '/watch/:id', element: <ProtectedRoute><Watch /></ProtectedRoute> },
  {
    path: '/admin',
    element: <ProtectedRoute admin><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'content', element: <AdminContent /> }
    ]
  },
  { path: '*', element: <Navigate to="/" replace /> }
]);
