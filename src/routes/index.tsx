import DashboardLayout from '@/layouts/DashboardLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { renderRoutes } from './generateRoutes';

import Home from '@/pages/dashboard/home';
import Requests from '@/pages/dashboard/requests';
import Specialization from '@/pages/dashboard/specialization';
import Pricing from '@/pages/dashboard/pricing';
import Settings from '@/pages/dashboard/settings';
import LoginPage from '@/pages/auth/login';
import OnboardingPage from '@/pages/auth/signup';
import NotFound from '@/pages/errors/notfound';
import RecoverPassword from '@/pages/auth/password';
import CreateRequests from '@/pages/dashboard/requests/create-requests';
import ViewRequests from '@/pages/dashboard/requests/view-requests';


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
            element: Requests,
            routes: [
                {
                    name: "Create Requests",
                    path: 'requests/create', 
                    title: "Create Requests",
                    element: CreateRequests, 
                },
                {
                    name: "View Request",
                    path: 'requests/:id', 
                    title: "View Request",
                    element: ViewRequests, 
                },
                {
                    name: "Review Requests",
                    path: 'review-requests', 
                    title: "Review Requests",
                    element: Requests, 
                },
            ],
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
            name: "Settings",
            path: 'settings',
            title: "Settings",
            element: Settings
        },
        {
            path: '*',
            element: NotFound,
        }
    ]
}
]

export const Routes = renderRoutes(router);

