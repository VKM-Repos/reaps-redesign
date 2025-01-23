import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserStore from "@/store/user-store";

type Props = {
  isAuthorized: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ isAuthorized, children }: Props) => {
  const location = useLocation();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    } else {
      setUserEmail(null);
    }
  }, [user]);

  if (!isAuthorized) {
    const redirectPath = encodeURIComponent(
      location.pathname + location.search
    );
    return (
      <Navigate
        to={`/login?email=${userEmail || ""}&redirect=${redirectPath}`}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
