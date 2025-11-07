import pacmanLoading from "../assets/Bean Eater@1x-1.0s-200px-200px.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import url from "../url/url";

export default function DetailProduct() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState({});

  async function fetchProduct() {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/pub/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
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
        <div className="bg-gray-50 min-h-screen flex justify-center items-start pt-20 pb-10">
          <div className="bg-white w-4/5 md:w-3/5 shadow-md border border-gray-200 flex flex-col md:flex-row rounded-md overflow-hidden">
            <div className="w-full md:w-1/2 bg-gray-100 flex justify-center items-center">
              <img
                src={product.imgUrl}
                alt="Product image"
                className="object-cover w-full h-full md:h-[500px] "
              />
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-3 tracking-wide">
                  {product.name}
                </h1>

                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {product.description}
                </p>

                <p className="text-base text-gray-500 mb-2">
                  Stock:{" "}
                  <span className="font-medium text-gray-700">
                    {product.stock}
                  </span>
                </p>

                <p className="text-2xl font-semibold text-black">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="mt-8">
                <Link to="/">
                  <button className="w-full mt-3 py-3 border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition">
                    BACK TO HOME
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
