import { useEffect, useState } from "react";
import axios from "axios";
import url from "../url/url";
import { showError } from "./toastUI";
export default function Filter({ getInput, totalData, handleSearch }) {
  const [data, setData] = useState([]);

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${url}/pub/categories`);
      setData(data.data);
    } catch (error) {
      showError(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="navbar">
      <div className="category-title font-semibold">
        Produk Ditemukan : {totalData}
      </div>

      <div>
        <form className="search-section flex items-center gap-2">
          <input
            type="text"
            placeholder="Cari produk..."
            className="search-ui border border-gray-400 rounded-lg px-3 py-1 w-64"
            name="search"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </form>
      </div>

      <div className="filter-title flex gap-4">
        <select
          name="filter"
          className="filter-container border border-gray-400 rounded-lg px-2 py-1"
          defaultValue=""
          onChange={(event) => getInput("filter", event)}
        >
          <option value="" disabled>
            Pilih Kategori
          </option>
          <option value="">None</option>

          {data.map((el) => {
            return (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            );
          })}
        </select>

        <select
          name="sort"
          className="filter-container border border-gray-400 rounded-lg px-2 py-1"
          defaultValue=""
          onChange={(event) => getInput("sort", event)}
        >
          <option value="" disabled>
            Urutkan Berdasarkan
          </option>
          <option value="">None</option>
          <option value="DESC">Terbaru</option>
          <option value="ASC">Terlama</option>
        </select>
      </div>
    </div>
  );
}
