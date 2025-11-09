import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import showError from "../components/toastUI";
export default function BaseLayout() {
  if (!localStorage.access_token) {
    console.error();
    showError("Please login first");
    return <Navigate to="/" />;
  }
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
