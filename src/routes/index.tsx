import DashboardLayout from '@/layouts/DashboardLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { renderRoutes } from './generateRoutes';

import Home from '@/pages/dashboard/home';
import Requests from '@/pages/dashboard/requests';
import Specialization from '@/pages/dashboard/create-specializations';
import Pricing from '@/pages/dashboard/pricing';
import LoginPage from '@/pages/auth/log-in';
import CreateOnboardingPage from '@/pages/auth/sign-up';
import NotFound from '@/pages/errors/notfound';
import RecoverPassword from '@/pages/auth/recovery';

const router = [
{
    layout: AuthLayout,
    routes:[
        {
            name: "login",
            path: 'login',
            title: "Login page",
            component: LoginPage
        },
        {
            name: "signup",
            path: 'signup',
            title: "Sign Up page",
            component: CreateOnboardingPage
        },
        {
            name: "recovery-password",
            path: 'password-recovery',
            title: "Password Recovery",
            component: RecoverPassword
        }
    ],
},
{
    layout: DashboardLayout,
    routes: [
        {
            name: "Home",
            path: 'home',
            title: "home",
            component: Home
        },
        {
            name: "Requests",
            path: 'requests',
            title: "Requests",
            component: Requests
        },
        {
            name: "Specialization",
            path: 'specialization',
            title: "Specialization",
            component: Specialization
        },
        {
            name: "Pricing",
            path: 'pricing',
            title: "Pricing",
            component: Pricing 
        },
        {
            path: '*',
            element: NotFound,
        }
    ]
}
]

// function Router() {
//     return (
//         <Suspense fallback={<Loader />}>
//                 <RouterProvider router={router} />
//         </Suspense>
//     );
// }

export const Routes = renderRoutes(router);


// type AuthContextInterface = {
//     isAuthenticated: boolean,
//     login: () => void,
//     logout: () => void;
// }
// const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

// const PrivateRoute = ({ children }:{ children: JSX.Element}) => {
//     const auth = useContext(AuthContext);
//     return auth.isAuthenticated ? children : <Navigate to="/login" />;
// };

// const AuthProvider = ({ children }: {children: JSX.Element}) => {
//     const [isAuthenticated, setIsAuthenticated] = React.useState(false);


//     const login = () => setIsAuthenticated(true);
//     const logout = () => setIsAuthenticated(false);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// routes
// protected route