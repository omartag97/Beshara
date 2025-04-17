import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "@/interface/product.interface";
import { customBaseQuery } from "../helpers/baseQuery";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  refetchOnReconnect: true,
  tagTypes: ["Product", "Category"],
  keepUnusedDataFor: 300,
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getCategories: build.query<string[], void>({
      query: () => "/products/categories",
      providesTags: ["Category"],
    }),

    getProductsByCategory: build.query<Product[], string>({
      query: (category) => `/products/category/${category}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getAllProducts: build.query<Product[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProduct: build.query<Product, number>({
      query: (id: number) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetAllProductsQuery,
  useGetProductQuery,
} = productsAPI;
