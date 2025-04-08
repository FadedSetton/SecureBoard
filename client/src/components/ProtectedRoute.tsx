import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return Auth.loggedIn() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
