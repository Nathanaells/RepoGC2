import { Link } from "react-router";

export default function Card({ product }) {
  return (
    <>
      <div className="card" key={product.id}>
        <img
          className="image-product"
          src={product.imgUrl}
          alt="Product Image"
        />
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">
          Rp.{product.price.toLocaleString("id-ID")}
        </p>
        <p className="product-stock">Sisa Stock {product.stock}</p>

        <Link to={`/detail/${product.id}`}>
          <button className="button-detail">Detail</button>
        </Link>
      </div>
    </>
  );
}
