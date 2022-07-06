import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";


const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, isAllow } = useAuth({ roles });
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace state={{ location }} />;
  }
  return <>{isAllow ? children : <div>You are not allowed to access this page</div>}</>;
};
export default PrivateRoute;