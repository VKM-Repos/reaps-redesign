import { Navigate } from "react-router-dom";

type Props = {
  isAuthorized: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ isAuthorized, children }: Props) => {
  return isAuthorized ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
