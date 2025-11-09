import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { showError, showSuccess } from "../components/toastUI";
import url from "../constant/url";
import pacmanLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import loadingGif from "../assets/Spinner@1x-1.0s-200px-200px.svg";

export default function ProductTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingId, setUploadingId] = useState(null); // id produk yang sedang diupload
  const navigate = useNavigate();

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setData(data.data);
    } catch (error) {
      showError(error.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      showSuccess("Product deleted successfully");
      fetchData();
    } catch (error) {
      showError(error.response.data.message || "Error deleting data");
    }
  }

  async function handleUpload(e, id) {
    try {
      const file = e.target.files[0];
      if (!file) return;
      setUploadingId(id);
      const formData = new FormData();
      formData.append("image", file);

      const { data: res } = await axios.patch(
        `${url}/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      showSuccess(res.message || "Image uploaded successfully");
      fetchData();
    } catch (error) {
      showError(error.response.data.message || "Error uploading image");
    } finally {
      setUploadingId(null);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <img
            src={pacmanLoading}
            alt="Loading..."
            className="w-32 h-32 animate-pulse"
          />
        </div>
      ) : (
        <div className="min-h-screen bg-white p-8">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
            Product Table
          </h1>

          <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
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
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((el, i) => (
                  <tr key={el.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {el.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {el.description}
                    </td>
                    <td className="px-6 py-4">
                      Rp.{el.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">{el.stock}</td>
                    <td className="px-6 py-4">
                      <img
                        src={el.imgUrl}
                        alt={el.name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                    </td>
                    <td className="px-5 py-4 text-center space-x-2">
                      <div className="flex flex-row gap-2 justify-center items-center">
                        {uploadingId === el.id ? (
                          <img
                            src={loadingGif}
                            alt="Uploading..."
                            className="w-8 h-8"
                          />
                        ) : (
                          <label className="px-3 py-2 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition cursor-pointer">
                            Add Image
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleUpload(e, el.id)}
                            />
                          </label>
                        )}
                        <button
                          onClick={() => navigate(`/product/${el.id}`)}
                          className="px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(el.id)}
                          className="px-3 py-2 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
