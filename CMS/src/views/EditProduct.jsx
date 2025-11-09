import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../constant/url";
import { showError, showSuccess } from "../components/toastUI";
import FormProduct from "../components/FormData";
import pacmanLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true); // mulai loading
      const { data } = await axios.get(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setProduct(data.data);
    } catch (error) {
      showError(error.response?.data?.message || "Gagal memuat data produk");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function handleSubmit(e, form) {
    e.preventDefault();
    try {
      setLoading(true); // tampilkan loading saat submit
      const { data } = await axios.put(`${url}/products/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showSuccess(data.message || "Produk berhasil diperbarui");
      navigate("/home");
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.message || "Gagal memperbarui produk");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <img
          src={pacmanLoading}
          alt="Loading..."
          className="w-32 h-32 animate-pulse"
        />
      </div>
    );
  }

  return (
    <div>
      <FormProduct
        nameProp="Edit Product"
        handleSubmit={handleSubmit}
        product={product}
      />
    </div>
  );
}
