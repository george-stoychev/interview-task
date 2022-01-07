import { useMemo } from "react";
import { Link } from "react-router-dom";

import { useProducts } from "src/api/products";

import "src/styles.css";

export const useFeaturedProduct = () => {
  const productsQuery = useProducts();
  const featuredProduct = useMemo(() => {
    const products = productsQuery.data;
    return products
      ? products[Math.floor(Math.random() * products.length)]
      : undefined;
  }, [productsQuery.data]);
  return { ...productsQuery, data: featuredProduct };
};

export default function Home() {
  const { isLoading, error, data: featuredProduct } = useFeaturedProduct();

  if (isLoading || !featuredProduct) {
    return (
      <div className="center">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  return (
    <main>
      <h2>
        <Link to="/products">Products</Link>
      </h2>
      <div
        className="center"
        style={{ height: "auto", flexDirection: "column" }}
      >
        <img
          width="200px"
          src={featuredProduct.imageUrl}
          alt={featuredProduct.name}
        />
        <h5>{featuredProduct.name}</h5>
        <p>{featuredProduct.description}</p>
      </div>
    </main>
  );
}
