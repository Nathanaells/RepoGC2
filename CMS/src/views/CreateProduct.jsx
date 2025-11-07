import { useNavigate } from "react-router";
import url from "../constant/url";
import axios from "axios";
import { showError, showSuccess } from "../components/toastUI";
import FormProduct from "../components/FormData";

export default function CreateProduct() {
  const navigate = useNavigate();

  async function handleSubmit(e, form) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/products`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/home");
      showSuccess(data.message);
    } catch (error) {
      showError(error.response.data.message);
    }
  }
  return (
    <>
      <FormProduct nameProp={"Add Product"} handleSubmit={handleSubmit} />
    </>
  );
}
