import { createBrowserRouter } from 'react-router-dom';
import BelliesPage from './BelliesPage/BelliesPage';
import BellyPage from './BellyPage/BellyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BelliesPage />,
  },
  {
    path: 'belly/:id',
    element: <BellyPage />,
  },
]);

export default router;
