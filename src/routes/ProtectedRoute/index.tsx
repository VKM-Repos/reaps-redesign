import { Navigate, Outlet } from "react-router-dom";

type Props = {
    isPublic?: boolean, 
    isAuthorized: boolean
}

const ProtectedRoute = ({ isPublic, isAuthorized }: Props) => {
    return isPublic || isAuthorized ? (
        <>
            <Outlet />
        </>

    ): (
        <>
            <Navigate to="/login" />
            <Outlet />
        </>
    )
}

export default ProtectedRoute;