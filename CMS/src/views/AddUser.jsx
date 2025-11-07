import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { showError, showSuccess } from "../components/toastUI";
import url from "../constant/url";
import pacmanLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";

export default function AddUser() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${url}/add-user`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showSuccess(data.message || "User created successfully");
      navigate("/home");
    } catch (error) {
      showError(error.response?.data?.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 mt-30">
      {loading ? (
        <img
          src={pacmanLoading}
          alt="Loading..."
          className="w-32 h-32 animate-pulse"
        />
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add New User
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter user email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter user password"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="2"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter address"
              ></textarea>
            </div>

            <PrimaryButton text="Add User" type="submit" />
          </form>

          <SecondaryButton
            text="Back to Home"
            onClick={() => navigate("/home")}
          />
        </div>
      )}
    </div>
  );
}
