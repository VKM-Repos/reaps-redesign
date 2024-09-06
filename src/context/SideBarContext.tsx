import { ReactNode, createContext, useContext } from "react"
import DocumentIcon from "@/components/custom/sidebar-icons/document-icon"
import HomeIcon from "@/components/custom/sidebar-icons/home-icon"
import InvoiceIcon from "@/components/custom/sidebar-icons/invoice-icon"
import More from "@/components/custom/sidebar-icons/more-icon"
import FileView from "@/components/custom/sidebar-icons/file-view"
import FileManage from "@/components/custom/sidebar-icons/file-management"
import DialPad from "@/components/custom/sidebar-icons/dialpad-square-01"
import School from "@/components/custom/sidebar-icons/school"
import ProfileTwo from "@/components/custom/sidebar-icons/profile-02"
import UserMultiple from "@/components/custom/sidebar-icons/user-multiple-02"
import Bank from "@/components/custom/sidebar-icons/bank"
import { useRole } from "@/hooks/useRole"

type SideBarLink = {
    label: string,
    path: string,
    icon?: ReactNode
    subLinks?: {
        label: string,
        path: string,
        icon?: ReactNode
    }[]
}

type SideBarContextValue = {
    links: SideBarLink[]
}

const SideBarContext = createContext<SideBarContextValue | undefined>(undefined);

type SideBarProviderProps = {
    children: ReactNode
}

export default function SideBarProvider({ children }: SideBarProviderProps) {
    const sideBarLinks = [];

    const { role } = useRole();

// type Record: Array(sidebarlink)
// export 

    switch (role) {
        case "RESEARCHER":
            sideBarLinks.push(
                {
                    label: "Home",
                    path: "/home",
                    icon: <HomeIcon />
                },
                {
                    label: "Requests",
                    path: "/requests",
                    icon: <DocumentIcon />
                },
                {
                    label: "Specialization",
                    path: "/specialization",
                    icon: <More />
                },
                {
                    label: "Pricing",
                    path: "/pricing",
                    icon: <InvoiceIcon />
                },

            );
            break;
        case "REVIEWER":
            sideBarLinks.push(
                {
                    label: "Home",
                    path: "/home",
                    icon: <HomeIcon />
                },
                {
                    label: "Requests",
                    path: "/requests",
                    icon: <DocumentIcon />
                },
                {
                    label: "Specialization",
                    path: "/specialization",
                    icon: <More />
                },
                {
                    label: "Pricing",
                    path: "/pricing",
                    icon: <InvoiceIcon />
                },

            );
            break;
        case "INSTITUTION_ADMIN":
            sideBarLinks.push(
                {
                    label: "Home",
                    path: "/home",
                    icon: <HomeIcon />
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
                            path: "/requests/my-requests",
                            icon: <DocumentIcon />
                        },
                        {
                            label: "Review Requests",
                            path: "/requests/review-requests",
                            icon: <FileView />
                        },
                        {
                            label: "Manage Requests",
                            path: "/requests/manage-requests",
                            icon: <FileManage />
                        },
                        {
                            label: "Templates",
                            path: "/requests/templates",
                            icon: <DialPad />
                        }
                    ]
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
                            label: "Institution",
                            path: "/institution/account",
                            icon: <Bank />,
                        }
                    ]
                },

            );
            break;
            default: null;
            break;
    }

    return (
        <SideBarContext.Provider value={{links: sideBarLinks}}>
            {children}
        </SideBarContext.Provider>
    )
}

export function useSideBar() {
    const context = useContext(SideBarContext);
    if(!context) {
        throw new Error("useSideBar must be used within SideBarProvider")
    }
    return context;
}
