import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { showError, showSuccess } from "../components/toastUI";
import url from "../constant/url";
import pacmanLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";

export default function CategoryTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setData(data.data);
    } catch (error) {
      navigate("/");
      showError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
        Product Table
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <img
            src={pacmanLoading}
            alt="Loading..."
            className="w-32 h-32 animate-pulse"
          />
        </div>
      ) : (
        <div className=" overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((el, i) => {
                return (
                  <tr key={el.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {el.name}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(el.createdAt).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
