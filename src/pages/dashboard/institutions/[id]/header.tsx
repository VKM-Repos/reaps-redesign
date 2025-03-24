import React from "react";

type Props = {
  title: string;
  actions?: React.ReactNode;
};

const Header = ({ title, actions }: Props) => {
  return (
    <nav className=" border-b flex items-center justify-between py-4">
      <h3 className="text-black text-xl font-semibold">{title}</h3>
      <div>{actions}</div>
    </nav>
  );
};

export default Header;
