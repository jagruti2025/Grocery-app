import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleRoute = ({ allowed }: { allowed: string[] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  return allowed.includes(user?.role || '') ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default RoleRoute;
