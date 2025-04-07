import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { renderRoutes } from "./generateRoutes";

import Home from "@/pages/dashboard/home";
import Requests from "@/pages/dashboard/requests";
import Specialization from "@/pages/dashboard/specialization";
import Settings from "@/pages/dashboard/settings";
import LoginPage from "@/pages/auth/login";
import OnboardingPage from "@/pages/auth/signup";
import NotFound from "@/pages/errors/notfound";
import RecoverPassword from "@/pages/auth/password";
import CreateRequests from "@/pages/dashboard/requests/create-requests";
import ViewRequests from "@/pages/dashboard/requests/view-requests/researcher";
import InstitutionUsers from "@/pages/dashboard/institution/users";
import InstitutionProfile from "@/pages/dashboard/institution/profile";
import ManageRequestPage from "@/pages/dashboard/requests/pages/admin/manage-request";
import Templates from "@/pages/dashboard/templates";
import ModifyRequest from "@/pages/dashboard/requests/edit-requests";
import Institutions from "@/pages/dashboard/institutions";
import InstitutionInformationPage from "@/pages/dashboard/institutions/[id]/information";
import InstitutionUsersPage from "@/pages/dashboard/institutions/[id]/users";
import InstitutionRequestsPage from "@/pages/dashboard/institutions/[id]/requests";
import InstitutionConfigurationPage from "@/pages/dashboard/institutions/[id]/configuration";
import InstitutionTransactionsPage from "@/pages/dashboard/institutions/[id]/transactions";
import InstitutionCategories from "@/pages/dashboard/institution/categories";
import InstitutionActivities from "@/pages/dashboard/institution/activities";
import InstitutionTransactions from "@/pages/dashboard/institution/transactions";
import CountdownPage from "@/components/custom/CountdownPage";
import InstitutionFinanceOverview from "@/pages/dashboard/institution/finance";
import InstitutionInvoices from "@/pages/dashboard/institution/finance/invoices";

const router = [
  {
    layout: AuthLayout,
    routes: [
      {
        name: "countdown",
        path: 'countdown',
        title: 'countdown',
        element: CountdownPage,
      },
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
            path: "requests",
            title: "My Request",
            element: Requests,
          },
          {
            name: "Manage Request",
            path: "requests/manage-requests",
            title: "Manage Request",
            element: ManageRequestPage,
          },
          // add templates
          {
            name: "Modify Request",
            path: "requests/edit-request",
            title: "Modify Request",
            element: ModifyRequest,
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
            name: "Institution Categories",
            path: "institution/categories",
            title: "Institution Categories",
            element: InstitutionCategories,
          },
          {
            name: "Institution Activities",
            path: "institution/activities",
            title: "Institution Activities",
            element: InstitutionActivities,
          },
          {
            name: "Institution Finance Overview",
            path: "institution/finance-overview",
            title: "Institution Finance Overview",
            element: InstitutionFinanceOverview,
            routes: [
              {
                name: "Institution Finance Overview",
                path: "institution/finance-overview/invoice",
                title: "Institution Invoice",
                element: InstitutionInvoices,
              }
            ]
          },
          {
            name: "Institution Transactions",
            path: "institution/transactions",
            title: "Institution Transactions",
            element: InstitutionTransactions,
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
        name: "Institutions",
        path: "institutions",
        title: "Institutions",
        element: Institutions,
        routes: [
          {
            name: "Information",
            path: "institutions/:id",
            title: "Information",
            element: InstitutionInformationPage,
          },
          {
            name: "Users",
            path: "institutions/:id/users",
            title: "Users",
            element: InstitutionUsersPage,
          },
          {
            name: "Requests",
            path: "institutions/:id/requests",
            title: "Requests",
            element: InstitutionRequestsPage,
          },
          {
            name: "Configuration",
            path: "institutions/:id/configs",
            title: "Configuration",
            element: InstitutionConfigurationPage,
          },
          {
            name: "Transactions",
            path: "institutions/:id/transactions",
            title: "Transactions",
            element: InstitutionTransactionsPage,
          },
        ],
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
