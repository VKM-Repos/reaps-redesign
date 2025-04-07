import { ReactNode, createContext, useContext } from "react";
import DocumentIcon from "@/components/custom/sidebar-icons/document-icon";
import HomeIcon from "@/components/custom/sidebar-icons/home-icon";
import More from "@/components/custom/sidebar-icons/more-icon";
import FileManage from "@/components/custom/sidebar-icons/file-management";
import DialPad from "@/components/custom/sidebar-icons/dialpad-square-01";
import School from "@/components/custom/sidebar-icons/school";
import ProfileTwo from "@/components/custom/sidebar-icons/profile-02";
import UserMultiple from "@/components/custom/sidebar-icons/user-multiple-02";
import Bank from "@/components/custom/sidebar-icons/bank";
import useUserStore from "@/store/user-store";
import AuditLog from "@/components/custom/sidebar-icons/auditlog-icon";
import TransactionsIcon from "@/components/custom/sidebar-icons/transactions-icon";
import Puzzle2 from "@/components/custom/sidebar-icons/puzzle2";
import Activities from "@/components/custom/sidebar-icons/activities";

type SideBarLink = {
  label: string;
  path: string;
  icon?: ReactNode;
  subLinks?: {
    label: string;
    path: string;
    icon?: ReactNode;
  }[];
};

type SideBarContextValue = {
  links: SideBarLink[];
};

const SideBarContext = createContext<SideBarContextValue | undefined>(
  undefined
);

type SideBarProviderProps = {
  children: ReactNode;
};

export default function SideBarProvider({ children }: SideBarProviderProps) {
  const sideBarLinks = [];

  const { activeRole } = useUserStore();

  switch (activeRole) {
    case "user":
      sideBarLinks.push(
        {
          label: "Home",
          path: "/home",
          icon: <HomeIcon />,
        },
        {
          label: "Requests",
          path: "/requests",
          icon: <DocumentIcon />,
        },
        {
          label: "Specialization",
          path: "/specialization",
          icon: <More />,
        }
      );
      break;
    case "reviewer":
      sideBarLinks.push(
        {
          label: "Home",
          path: "/home",
          icon: <HomeIcon />,
        },
        {
          label: "Requests",
          path: "/requests",
          icon: <DocumentIcon />,
        },
        {
          label: "Specialization",
          path: "/specialization",
          icon: <More />,
        }
      );
      break;
    case "admin":
      sideBarLinks.push(
        {
          label: "Home",
          path: "/home",
          icon: <HomeIcon />,
        },

        {
          label: "Specialization",
          path: "/specialization",
          icon: <More />,
        },
        {
          label: "Requests",
          path: "/requests",
          icon: <DocumentIcon />,
          subLinks: [
            {
              label: "My Requests",
              path: "/requests",
              icon: <DocumentIcon />,
            },
            {
              label: "Manage Request",
              path: "/requests/manage-requests",
              icon: <FileManage />,
            },
            {
              label: "Templates",
              path: "/templates",
              icon: <DialPad />,
            },
          ],
        },
        {
          label: "Institution",
          path: "/institution",
          icon: <School />,
          subLinks: [
            {
              label: "Users",
              path: "/institution/users",
              icon: <UserMultiple />,
            },
            {
              label: "Profile",
              path: "/institution/profile",
              icon: <ProfileTwo />,
            },
            {
              label: "Categories",
              path: "/institution/categories",
              icon: <Puzzle2 size="24" />,
            },
            {
              label: "Activities",
              path: "/institution/activities",
              icon: <Activities size="24" />,
            },
            {
              label: "Transactions",
              path: "/institution/transactions",
              icon: <TransactionsIcon size="24" />,
            },
            {
              label: "Finance Overview",
              path: "/institution/finance-overview",
              icon: <TransactionsIcon size="24" />,
            },
          ],
        }
      );
      break;
    case "super admin":
      sideBarLinks.push(
        {
          label: "Home",
          path: "/home",
          icon: <HomeIcon />,
        },
        {
          label: "Institutions",
          path: "/institutions",
          icon: <School />,
        },
        {
          label: "Audit Log",
          path: "/audit-log",
          icon: <AuditLog />,
        },
        {
          label: "Account",
          path: "/account",
          icon: <Bank />,
        }
      );
      break;
    default:
      null;
      break;
  }

  return (
    <SideBarContext.Provider value={{ links: sideBarLinks }}>
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBar() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBar must be used within SideBarProvider");
  }
  return context;
}
