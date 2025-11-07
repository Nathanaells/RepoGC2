import { Outlet } from "react-router";
import Navbar from "../components/";

export default function BaseLayout() {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
