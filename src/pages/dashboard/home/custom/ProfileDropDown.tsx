import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import User from '@/components/custom/Icons/User';
import SettingsIcon from '@/components/custom/Icons/SettingsIcon';
import HelpCircle from '@/components/custom/Icons/HelpCircle';
import LogOutIcon from '@/components/custom/Icons/LogOutIcon';
import Logout from '@/components/custom/LogOut';
import { Link } from 'react-router-dom';
import BackButton from '@/components/custom/BackButton';
import Loader from '@/components/custom/Loader';
import ArrowDown from '/icons/arrow-down-01.svg';
import useUserStore from '@/store/user-store';

type ProfileDropdownProps = {
  profile: {
    name: string;
    role: JSX.Element;
    email: string;
  };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
};

export default function ProfileDropDown() {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { activeRole, user } = useUserStore();

  const fullName = user?.first_name + ' ' + user?.last_name;

  const normalizeRole = (value: string): string => {
    return value?.replace(/_/g, ' ').trim().toLowerCase();
  };

  const profile = {
    name: fullName || 'John Doe',
    role: <span>{activeRole}</span>,
    email: user?.email || 'johndoe@gmail.com',
  };

  const handleClose = () => setOpen(false);

  if (loading) return <Loader />;

  return isDesktop ? (
    <DesktopProfileDropDown
      open={open}
      setOpen={setOpen}
      profile={profile}
      setLoading={setLoading}
      handleClose={handleClose}
    />
  ) : (
    <MobileProfileSheet
      open={open}
      setOpen={setOpen}
      profile={profile}
      setLoading={setLoading}
      handleClose={handleClose}
    />
  );
}

// Desktop dropdown for profile
function DesktopProfileDropDown({
  open,
  setOpen,
  profile,
  setLoading,
  handleClose,
}: ProfileDropdownProps) {
  return (
    <div className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <div className="flex max-w-fit items-center">
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-accent bg-inherit notransition flex items-center border-none px-2 py-2 hover:rounded-2xl hover:border focus:outline-none">
              <User className="bg-inherit border-none p-2 hover:rounded-full hover:bg-[#14155E14]" />
              <img
                src={ArrowDown}
                alt="arrow-down"
                className={`h-6 w-6 ${open ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="mr-[6rem] flex w-full max-w-[24rem] flex-col gap-6 rounded-3xl px-4 py-8">
          <ProfileHeader profile={profile} />
          <ProfileCard setLoading={setLoading} setOpen={handleClose} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Mobile sheet for profile
function MobileProfileSheet({
  open,
  setOpen,
  profile,
  setLoading,
  handleClose,
}: ProfileDropdownProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex max-w-fit items-center">
        <SheetTrigger asChild>
          <button className="hover:bg-accent bg-inherit notransition flex items-center border-none px-2 py-2 hover:rounded-2xl hover:border focus:outline-none">
            <User className="bg-inherit border-none p-2 hover:rounded-full hover:bg-[#14155E14]" />
            <img
              src={ArrowDown}
              alt="arrow-down"
              className={`h-6 w-6 ${open ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </SheetTrigger>
      </div>
      <SheetContent side="right" className="w-full">
        <div className="mx-auto w-[90%]">
          <SheetHeader>
            <div className="justify-left flex w-full px-4">
              <SheetClose>
                <BackButton
                  goBack={handleClose}
                  className="!mt-0 !gap-0 !rounded-full !bg-[#14155E14] !p-2"
                />
              </SheetClose>
            </div>
            <ProfileHeader profile={profile} />
          </SheetHeader>
          <div className="flex flex-col gap-6 py-8">
            <ProfileCard setLoading={setLoading} setOpen={handleClose} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Profile Header Component
function ProfileHeader({
  profile,
}: {
  profile: { name: string; role: JSX.Element; email: string };
}) {
  return (
    <div className="justify-left flex items-center gap-4 px-4 py-3">
      <div className="rounded-full bg-[#14155E14] p-2">
        <User />
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="inter text-sm text-[#0C0D0F]">{profile.name}</p>
        <p className="inter text-sm text-[#868687]">
          <span>({profile.role})</span>{' '}
          <span className="font-[400]">{profile.email}</span>
        </p>
      </div>
    </div>
  );
}

// Profile options card
function ProfileCard({
  setOpen,
  setLoading,
}: {
  setOpen: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const profileOptions = [
    {
      label: 'Settings',
      path: '/settings',
      icon: <SettingsIcon />,
    },
    {
      label: 'Help',
      path: '/help',
      icon: <HelpCircle />,
    },
    {
      label: 'Logout',
      path: <Logout setLoading={setLoading} />,
      icon: <LogOutIcon />,
    },
  ];

  return (
    <ul className="flex flex-col gap-1">
      {profileOptions.map(({ label, path, icon }, index) => (
        <li
          key={index}
          className="hover:text-black z-50 flex items-center justify-between space-x-4 px-4 py-3"
        >
          {typeof path === 'string' ? (
            <Link
              to={path}
              className="hover:text-black flex gap-2 text-[#868687]"
              onClick={setOpen}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          ) : (
            <Sheet>
              <SheetTrigger className="hover:text-black flex gap-2 text-[#868687]">
                <span>{icon}</span>
                <span>{label}</span>
              </SheetTrigger>
              <Logout setLoading={setLoading} />
            </Sheet>
          )}
        </li>
      ))}
    </ul>
  );
}
