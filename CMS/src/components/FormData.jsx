import { useState, useEffect } from "react";
import axios from "axios";
import url from "../constant/url";
import { showError } from "../components/toastUI";

export default function FormData({ nameProp, handleSubmit, product }) {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imgUrl: "",
    categoryId: 0,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
        categoryId: product.categoryId,
      });
    }
  }, [product]);

  function handleForm(e, fieldName) {
    const { value } = e.target;

    setForm((old) => ({
      ...old,
      [fieldName]: ["price", "stock", "categoryId"].includes(fieldName)
        ? value === ""
          ? ""
          : +value
        : value,
    }));
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setData(data.data);
    } catch (error) {
      showError(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-30 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-wide">
        {nameProp}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, form);
        }}
        className="space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Produk
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleForm(e, "name")}
            placeholder="Masukkan nama produk"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleForm(e, "description")}
            placeholder="Tulis deskripsi produk..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => handleForm(e, "price")}
              placeholder="Harga produk"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stok
            </label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => handleForm(e, "stock")}
              placeholder="Jumlah stok"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Gambar
          </label>
          <input
            type="text"
            value={form.imgUrl}
            onChange={(e) => handleForm(e, "imgUrl")}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            value={form.categoryId}
            onChange={(e) => handleForm(e, "categoryId")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black transition bg-white"
          >
            <option value={0} disabled>
              Pilih kategori
            </option>
            {data.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
