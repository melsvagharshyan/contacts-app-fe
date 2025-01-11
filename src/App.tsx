import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { routeTree } from './routes/routes';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
