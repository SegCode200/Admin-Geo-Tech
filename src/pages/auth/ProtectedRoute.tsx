import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector(selectUser);
   user ? <Navigate to="/dashboard" replace/> :  <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
