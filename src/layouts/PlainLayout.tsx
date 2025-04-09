import { Outlet } from "react-router-dom";

export default function PlainLayout() {
  return (
    <div className="absolute top-0">
      <Outlet />
    </div>
  );
}
