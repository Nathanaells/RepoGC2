import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage";
import ProductTable from "./views/ProductTable";
import BaseLayout from "./views/BaseLayout";
import CategoryTable from "./views/CategoryTable";
import CreateProduct from "./views/CreateProduct";
import EditProduct from "./views/EditProduct";
import AddUser from "./views/AddUser";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<BaseLayout />}>
          <Route path="/home" element={<ProductTable />} />
          <Route path="/category" element={<CategoryTable />} />
          <Route path="/addProduct" element={<CreateProduct />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/product/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
