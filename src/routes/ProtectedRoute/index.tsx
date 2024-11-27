import { Navigate, useLocation } from "react-router-dom";

type Props = {
  isAuthorized: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ isAuthorized, children }: Props) => {
  const location = useLocation();

  if (!isAuthorized) {
    const redirectPath = encodeURIComponent(
      location.pathname + location.search
    );
    return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
