import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (!user && !loading) {
    return <Navigate to="/login" state={pathname} />;
  }

  return children;
};

export default PrivetRoute;
