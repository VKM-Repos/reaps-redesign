import HomeIcon from "@/components/custom/sidebar-icons/home-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const InstitutionsSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="w-full h-full inset-0 bg-[#FCFCFC] flex flex-col items-center justify-start gap-y-12 py-4 md:py-12">
      <Button
        variant="ghost"
        size="lg"
        className="w-full rounded-none"
        onClick={() => navigate("/institutions")}
      >
        Back to Institutions
      </Button>

      <div className="flex flex-col items-center justify-center space-y-1">
        <Avatar className="rounded-full w-[64px] h-[64px] bg-ghost p-0">
          <AvatarImage src="" alt="institution" />
          <AvatarFallback className="font-bold text-[24px]">UA</AvatarFallback>
        </Avatar>

        <h6 className=" text-black/60 font-semibold text-base">
          University Of Abuja
        </h6>
        <p className=" text-black/60 font-light text-xs pb-4">
          info@uniabuja.edu.ng
        </p>
        <span className="bg-ghost w-full p-1  text-xs whitespace-nowrap flex gap-2">
          <strong>Onboarded on:</strong>
          <p>19/01/2024</p>
        </span>
      </div>

      <ul className="flex flex-col justify-start w-[75%] mx-auto gap-5 pb-10">
        {links.map((route) => (
          <>
            <Link
              key={route.label}
              to={route.path}
              className={`${
                route.path.includes(pathname) || route.label === "Information"
                  ? "text-black"
                  : "text-black/30"
              } hover:text-black flex text-sm items-center justify-start space-x-3`}
            >
              <span>{route.icon}</span>
              <span>{route.label}</span>
            </Link>
          </>
        ))}
      </ul>
    </aside>
  );
};

export default InstitutionsSidebar;

const links = [
  {
    label: "Information",
    path: "",
    icon: <HomeIcon />,
  },
  {
    label: "Users",
    path: "users",
    icon: <HomeIcon />,
  },
  {
    label: "Requests",
    path: "requests",
    icon: <HomeIcon />,
  },
  {
    label: "Configuration",
    path: "configuration",
    icon: <HomeIcon />,
  },
  {
    label: "Transactions",
    path: "transactions",
    icon: <HomeIcon />,
  },
];
