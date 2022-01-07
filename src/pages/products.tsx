import AddProduct from "src/components/Product/Modals/Add";
import Edit from "src/components/Product/Modals/Edit";
import ConfirmDelete from "src/components/Product/Modals/ConfirmDelete";

import { useProducts } from "../api/products";

export default function Products() {
  const { isLoading, error, data } = useProducts();

  if (isLoading || !data) {
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
    <>
      <div className="container align-center">
        <h2>List of products:</h2>
        <AddProduct />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td key={p.id}>{p.name}</td>
              <td>{p.description}</td>
              <td>
                <img style={{ width: "50px" }} src={p.imageUrl} alt={p.name} />
              </td>
              <td>
                <div className="text-right">
                  <Edit product={p} />
                  <ConfirmDelete product={p} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
