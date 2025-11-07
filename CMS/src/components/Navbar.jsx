import logo from "../assets/react.svg";
import { useNavigate, useLocation } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm fixed z-50 top-0">
      <div className="w-full mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-lg font-semibold tracking-tight text-gray-800">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/addUser")}
            className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition"
          >
            + Add User
          </button>

          <button
            onClick={() => navigate("/addProduct")}
            className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition"
          >
            + Add Product
          </button>

          <button
            onClick={() => navigate("/category")}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
          >
            List Category
          </button>

          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
          >
            List Product
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
