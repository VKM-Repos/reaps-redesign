import { ReactNode, createContext, useContext } from "react"
import DocumentIcon from "@/components/custom/sidebar-icons/DocumentIcon"
import HomeIcon from "@/components/custom/sidebar-icons/Home"
import InvoiceIcon from "@/components/custom/sidebar-icons/InvoiceIcon"
import More from "@/components/custom/sidebar-icons/More"

type SideBarLink = {
    label: string,
    path: string,
    icon?: ReactNode
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

    let role = "RESEARCHER";

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
        case "INSTITUTIONALADMIN":
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
