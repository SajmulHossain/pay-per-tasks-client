/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const BuyerRoute = ({ children }) => {
  const [role] = useRole();

  if (role !== "buyer") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default BuyerRoute;
