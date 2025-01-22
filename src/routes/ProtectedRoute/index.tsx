import { useGET } from "@/hooks/useGET.hook";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  isAuthorized: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ isAuthorized, children }: Props) => {
  const location = useLocation();
  const { data: user } = useGET({
    url: "auth/me",
    queryKey: ["GET_USER"],
  });

  if (!isAuthorized) {
    const redirectPath = encodeURIComponent(
      location.pathname + location.search
    );
    const userRole = user.user_type;
    return (
      <Navigate
        to={`/login?redirect=${redirectPath}&role=${userRole!}`}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
