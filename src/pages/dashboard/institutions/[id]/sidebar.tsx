import LeftArrow from "@/components/custom/Icons/LeftArrow";
import ConfigurationIcon from "@/components/custom/sidebar-icons/configuration-icon";
import InfoIcon from "@/components/custom/sidebar-icons/information-icon";
import RequestsIcon from "@/components/custom/sidebar-icons/requests-icon";
import TransactionsIcon from "@/components/custom/sidebar-icons/transactions-icon";
import UsersIcon from "@/components/custom/sidebar-icons/users-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGET } from "@/hooks/useGET.hook";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const InstitutionsSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  const { data: institution_details } = useGET({
    url: `institutions/${id}`,
    queryKey: ["GET-INSTITUTION-DETAILS", id],
    enabled: !!id,
  });

  return (
    <aside className="w-full h-full inset-0 bg-[#FCFCFC] flex flex-col items-center justify-start gap-y-12 py-4 md:py-12">
      <Button
        variant="ghost"
        size="lg"
        className="w-full rounded-none space-x-2 bg-black/5"
        onClick={() => navigate("/institutions")}
      >
        <LeftArrow />
        <p>Back to Institutions</p>
      </Button>

      <div className="flex flex-col items-center justify-center space-y-1">
        <Avatar className="rounded-full w-[64px] h-[64px] bg-[#ECEDEE] p-0">
          <AvatarImage src="" alt="institution" />
          <AvatarFallback className="font-bold text-[24px] text-[#333740]">
            {institution_details?.institution_name?.charAt(0) || "N/A"}
          </AvatarFallback>
        </Avatar>

        <h6 className="text-black/60 font-semibold text-base">
          {institution_details?.institution_name || "Loading..."}
        </h6>
        <a
          href={`mailto:${institution_details?.email}`}
          className="text-[#608FEB] font-light text-xs pb-4 underline"
        >
          {institution_details?.email || "N/A"}
        </a>
        <span className="bg-ghost w-full p-1 text-[#868687] text-xs whitespace-nowrap flex gap-2">
          <strong>Contact No:</strong>
          <p>{institution_details?.contact_number || "N/A"}</p>
        </span>
      </div>

      <ul className="flex flex-col justify-start w-[75%] mx-auto gap-5 pb-10">
        {links.map((route) => (
          <Link
            key={route.label}
            to={route.path.replace(":id", id!)}
            className={`${
              pathname === route.path.replace(":id", id!)
                ? "text-[#515152] font-semibold"
                : "text-[#868687]"
            } hover:text-[#515152] font-light flex text-sm items-center justify-start space-x-3`}
          >
            <span>{route.icon}</span>
            <span>{route.label}</span>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default InstitutionsSidebar;

const links = [
  { label: "Information", path: "/institutions/:id", icon: <InfoIcon /> },
  { label: "Users", path: "/institutions/:id/users", icon: <UsersIcon /> },
  {
    label: "Requests",
    path: "/institutions/:id/requests",
    icon: <RequestsIcon />,
  },
  {
    label: "Configuration",
    path: "/institutions/:id/configs",
    icon: <ConfigurationIcon />,
  },
  {
    label: "Transactions",
    path: "/institutions/:id/transactions",
    icon: <TransactionsIcon />,
  },
];
