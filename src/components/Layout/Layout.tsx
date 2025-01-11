import { Outlet } from '@tanstack/react-router';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  return (
    <div className="flex rounded-sm">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
