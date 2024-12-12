/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import flattenDeep from "lodash/flattenDeep";
import useUserStore from "@/store/user-store";
import DashboardLayout from "@/layouts/DashboardLayout";

// Define a type for individual route configurations
interface RouteConfig {
  name?: string;
  path: string;
  element?: React.ComponentType<any>;
  title?: string;
  routes?: RouteConfig[];
}

// Define a type for layout configurations
interface LayoutConfig {
  layout: React.ComponentType<any>;
  routes: RouteConfig[];
}

const generateFlattenRoutes = (
  routes: RouteConfig[] | undefined
): RouteConfig[] => {
  if (!routes) return [];
  return flattenDeep(
    routes.map(({ routes: subRoutes = [], ...rest }) => [
      rest,
      generateFlattenRoutes(subRoutes),
    ])
  );
};

export const renderRoutes = (mainRoutes: LayoutConfig[]) => {
  const Routes = () => {
    const { accessToken } = useUserStore((state) => ({
      accessToken: state.accessToken,
    }));

    const isAuthorized = !!accessToken;

    const layouts = mainRoutes.map(
      ({ layout: Layout, routes }: LayoutConfig, index: number) => {
        const subRoutes = generateFlattenRoutes(routes);

        return (
          <Route key={`layout-${index}`} element={<Layout />}>
            {subRoutes.map(({ element: Element, path, name }: RouteConfig) => {
              const isProtected = Layout === DashboardLayout;

              return Element && path ? (
                isProtected ? (
                  <Route
                    key={name || `route-${path || index}`}
                    element={
                      <ProtectedRoute isAuthorized={isAuthorized}>
                        <Element />
                      </ProtectedRoute>
                    }
                    path={path}
                  />
                ) : (
                  <Route key={`route-${index}`} element={<Element />} path={path} />
                )
              ) : null;
            })}
          </Route>
        );
      }
    );

    return (
      <ReactRoutes>
        {layouts}
        <Route
          path="/"
          element={<Navigate to={isAuthorized ? "/home" : "/login"} />}
        />
      </ReactRoutes>
    );
  };

  return Routes;
};
