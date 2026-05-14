// src/routes/index.js
import { lazy } from 'react';

// Using dynamic imports
export const UserRoutes = lazy(() => import('./user.routes.jsx'));
export const BookRoutes = lazy(() => import('./book.routes.jsx'));
export const ComputerRoutes = lazy(() => import('./computer.routes.jsx'));
export const CategoryRoutes = lazy(() => import('./category.routes.jsx'));
export const ImageRoutes = lazy(() => import('./image.routes.jsx'));
export const YoutubeRoutes = lazy(() => import('./youtube.routes.jsx'));
export const PortfolioRoutes = lazy(() => import('./portfolio.routes.jsx'));
export const TodoRoutes = lazy(()=>import('./todo.routes.jsx'));