import flattenDeep from "lodash/flattenDeep";
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute/index.tsx"

const generateFlattenRoutes = (routes: any) => {
    if (!routes) return [];
    return flattenDeep(
        routes.map(({ routes: subRoutes = [], ...rest }) => [
            rest,
            generateFlattenRoutes(subRoutes),
        ])
    );
};

export const renderRoutes = (mainRoutes: any) => {
    const Routes = ({ isAuthorized, isPublic }: any) => {
        const layouts = mainRoutes.map(
            ({ layout: Layout, routes }: any, index: any) => {
                const subRoutes = generateFlattenRoutes(routes);
                return (
                    <Route key={index} element={<Layout />}>
                        <Route 
                            element={
                                <ProtectedRoute
                                isPublic={isPublic}
                                isAuthorized={isAuthorized}
                                />
                            }>
                                {
                                    subRoutes.map(({ element: Element, path, name }: any) => {
                                        return (
                                            Element && path && (
                                                <Route key={`route-${name}-${path}`} element={<Element />} path={path} />
                                            )
                                        )
                                        
                                    })
                                }
                            </Route>
                    </Route>
                )
            }
        );
        return (
        <ReactRoutes>
            {layouts}
            <Route path="/" element={<Navigate to={isAuthorized ? "/home" : "/login"} />} />
        </ReactRoutes>
        )
    };
    return Routes;
}