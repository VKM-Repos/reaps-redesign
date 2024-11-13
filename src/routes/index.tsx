import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { renderRoutes } from "./generateRoutes";

import Home from "@/pages/dashboard/home";
import Requests from "@/pages/dashboard/requests";
import Specialization from "@/pages/dashboard/specialization";
import Pricing from "@/pages/dashboard/pricing";
import Settings from "@/pages/dashboard/settings";
import LoginPage from "@/pages/auth/login";
import OnboardingPage from "@/pages/auth/signup";
import NotFound from "@/pages/errors/notfound";
import RecoverPassword from "@/pages/auth/password";
import CreateRequests from "@/pages/dashboard/requests/create-requests";
import ViewRequests from "@/pages/dashboard/requests/view-requests/researcher";
import InstitutionUsers from "@/pages/dashboard/institution/users";
import InstitutionProfile from "@/pages/dashboard/institution/profile";
import InstitutionAccount from "@/pages/dashboard/institution/account";
import Transactions from "@/pages/dashboard/institution/account/transactions";
import MyRequest from "@/pages/dashboard/requests/pages/MyRequest";
import ReviewRequest from "@/pages/dashboard/requests/pages/ReviewRequest";
import ManageRequestPage from "@/pages/dashboard/requests/pages/ManageRequestPage";
import Templates from "@/pages/dashboard/templates";

const router = [
  {
    layout: AuthLayout,
    routes: [
      {
        name: "login",
        path: "login",
        title: "Login",
        element: LoginPage,
      },
      {
        name: "signup",
        path: "signup",
        title: "Sign Up page",
        element: OnboardingPage,
      },
      {
        name: "recovery",
        path: "recovery",
        title: "Password Recovery",
        element: RecoverPassword,
      },
    ],
  },
  {
    layout: DashboardLayout,
    routes: [
      {
        name: "Home",
        path: "home",
        title: "home",
        element: Home,
      },
      {
        name: "Requests",
        path: "requests",
        title: "Requests",
        element: Requests,
        routes: [
          {
            name: "Create Requests",
            path: "requests/create",
            title: "Create Requests",
            element: CreateRequests,
          },
          {
            name: "View Request",
            path: "requests/:id",
            title: "View Request",
            element: ViewRequests,
          },
          {
            name: "My Request",
            path: "requests/my-requests",
            title: "My Request",
            element: MyRequest,
          },
          {
            name: "Review Request",
            path: "requests/review-requests",
            title: "Review Request",
            element: ReviewRequest,
          },
          {
            name: "Manage Request",
            path: "requests/manage-requests",
            title: "Manage Request",
            element: ManageRequestPage,
          },
        ],
      },
      {
        name: "Institution",
        path: "institution",
        title: "Institution",
        routes: [
          {
            name: "Institution Users",
            path: "institution/users",
            title: "Institution Users",
            element: InstitutionUsers,
          },
          {
            name: "Institution Profile",
            path: "institution/profile",
            title: "Institution Profile",
            element: InstitutionProfile,
          },
          {
            name: "Institution Account",
            path: "institution/account",
            title: "Institution Account",
            element: InstitutionAccount,
          },
          {
            name: "Institution Account Transactions",
            path: "institution/account/transactions",
            title: "Institution Account Transactions",
            element: Transactions,
          },
        ],
      },
      {
        name: "Specialization",
        path: "specialization",
        title: "Specialization",
        element: Specialization,
      },
      {
        name: "Pricing",
        path: "pricing",
        title: "Pricing",
        element: Pricing,
      },
      {
        name: "Settings",
        path: "settings",
        title: "Settings",
        element: Settings,
      },
      {
        name: "Templates",
        path: "templates",
        title: "Research Templates",
        element: Templates,
      },
      {
        path: "*",
        element: NotFound,
      },
    ],
  },
];

export const Routes = renderRoutes(router);
