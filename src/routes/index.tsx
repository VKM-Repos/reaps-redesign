import DashboardLayout from '@/layouts/DashboardLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { renderRoutes } from './generateRoutes';

import Home from '@/pages/dashboard/home';
import Requests from '@/pages/dashboard/requests';
import Specialization from '@/pages/dashboard/specialization';
import Pricing from '@/pages/dashboard/pricing';
import LoginPage from '@/pages/auth/log-in';
import OnboardingPage from '@/pages/auth/sign-up';
import NotFound from '@/pages/errors/notfound';
import RecoverPassword from '@/pages/auth/password';

const router = [
{
    layout: AuthLayout,
    routes:[
        {
            name: "login",
            path: 'login',
            title: "Login",
            element: LoginPage
        },
        {
            name: "signup",
            path: 'signup',
            title: "Sign Up page",
            element: OnboardingPage
        },
        {
            name: "recovery",
            path: 'recovery',
            title: "Password Recovery",
            element: RecoverPassword
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
            element: Home
        },
        {
            name: "Requests",
            path: 'requests',
            title: "Requests",
            element: Requests
        },
        {
            name: "Specialization",
            path: 'specialization',
            title: "Specialization",
            element: Specialization
        },
        {
            name: "Pricing",
            path: 'pricing',
            title: "Pricing",
            element: Pricing 
        },
        {
            path: '*',
            element: NotFound,
        }
    ]
}
]

export const Routes = renderRoutes(router);

