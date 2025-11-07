import Card from "../components/Card";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import axios from "axios";
import url from "../url/url";
import { useEffect, useState } from "react";
import pacmanLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import { showError } from "../components/toastUI";

export default function HomePage() {
  const [totalData, setTotaData] = useState(0);
  const [data, setData] = useState([]);
  const [dataPage, setDataPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    search: "",
    filter: "",
    sort: "",
    pageNumber: 1,
    pageSize: 8,
  });

  function getInput(fieldName, event) {
    const value = event.target.value;
    setInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function handleSearch(event) {
    const value = event.target.value;
    setInput((prev) => ({
      ...prev,
      search: value,
      pageNumber: 1,
    }));
  }

  async function fetchProduct() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${url}/pub?search=${input.search}&filter=${input.filter}&sort=${input.sort}&page[number]=${input.pageNumber}&page[size]=${input.pageSize}`
      );

      setData(response.data.data);
      setDataPage(response.data.totalPages || 1);
      setTotaData(response.data.totalData);
    } catch (error) {
      showError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [input]);

  return (
    <>
      <Filter
        getInput={getInput}
        totalData={totalData}
        handleSearch={handleSearch}
      />

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <img
            src={pacmanLoading}
            alt="Loading..."
            className="w-32 h-32 animate-pulse"
          />
        </div>
      ) : (
        <>
          <main
            className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            gap-6
            justify-items-center
            w-full px-40"
          >
            {data.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </main>
          <Pagination
            getInput={getInput}
            dataPage={dataPage}
            activePage={input.pageNumber}
            totalData={totalData}
            setDataPage={setDataPage}
          />
        </>
      )}
    </>
  );
}
