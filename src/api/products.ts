import { UseQueryOptions, useQuery } from "react-query";
import { Product } from "../model/Product";
import queryClient from "../queryClient";
import delay from "../util/delay";

export const productKeys = {
  list: ["products"],
  single: (id: string) => ["products", id]
};

export const fetchProducts = async (): Promise<Product[]> => {
  const products = fetch("/sample/products.json").then((res) => res.json());
  return delay(products);
};

export const useProducts = (opts: UseQueryOptions<Product[], Error> = {}) => {
  return useQuery<Product[], Error>({
    queryKey: productKeys.list,
    queryFn: fetchProducts,
    ...opts
  });
};

export const addProduct = async (product: Product): Promise<Product> => {
  const products = queryClient.getQueryData<Product[]>(productKeys.list) || [];

  if (products.map((p) => p.id).includes(product.id)) {
    return delay(Promise.reject("Duplicate ID"));
  }

  queryClient.setQueryData(productKeys.list, [...products, product]);
  return delay(product);
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const products = queryClient.getQueryData<Product[]>(productKeys.list) || [];
  const existing = products.find((p) => p.id === product.id);

  if (!existing) {
    return delay(Promise.reject("Product not found"));
  }

  queryClient.setQueryData(
    productKeys.list,
    products.map((p) => (p.id === product.id ? product : p))
  );
  return product;
};

export const deleteProduct = async (product: Product): Promise<Product[]> => {
  let products = queryClient.getQueryData<Product[]>(productKeys.list) || [];
  products = products.filter((p) => p.id !== product.id);
  queryClient.setQueryData(productKeys.list, products);
  return delay(products);
};
