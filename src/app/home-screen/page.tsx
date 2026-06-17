"use client";

import { useState } from "react";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import Banner from "@/src/components/layout/Banner";

import ProductCard from "@/src/components/product/ProductCard";

import { useAppSelector } from "@/src/redux/hooks";

import { useGetProductsQuery } from "@/src/services/productApi";

export default function HomeScreen() {

  // Selected category from dropdown
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Selected price sort
  const [priceSort, setPriceSort] =
    useState("");

  // Logged in user from Redux
  const user =
    useAppSelector(
      state => state.auth.profile
    );

  // API Call
  const {
    data,
    isLoading,
    error,
  } = useGetProductsQuery(
    user?.merchantId ?? "",
    {
      skip: !user?.merchantId,
    }
  );

  /*
   * Create category list dynamically
   *
   * Example:
   * Electronics
   * Clothes
   * Toys
   * Shoes
   *
   * becomes:
   *
   * ["All","Electronics","Clothes","Toys","Shoes"]
   */
  const categories: string[] = [

  "All",

  ...Array.from(
    new Set<string>(
      data?.map(
        (item: any) => item.category
      ) || []
    )
  ),
];

  /*
   * Initially show all products
   */
  let filteredProducts = data || [];

  /*
   * Category filtering
   *
   * If user selects Electronics
   * show only Electronics products
   */
  if (
    selectedCategory !== "All"
  ) {

    filteredProducts =
      filteredProducts.filter(
        (item: any) =>
          item.category ===
          selectedCategory
      );
  }

  /*
   * Price Sorting
   */

  // Low → High
  if (priceSort === "low") {

    filteredProducts =
      [...filteredProducts].sort(
        (a: any, b: any) =>
          a.price - b.price
      );
  }

  // High → Low
  if (priceSort === "high") {

    filteredProducts =
      [...filteredProducts].sort(
        (a: any, b: any) =>
          b.price - a.price
      );
  }

  return (

    <div>

      <Header />

      <Banner />

      {/* Filter Section */}
      <div
        className="category-filter"
      >

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
        >

          {categories.map(
            (category) => (

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            )
          )}

        </select>

        {/* Price Filter */}
        <select
          value={priceSort}
          onChange={(e) =>
            setPriceSort(
              e.target.value
            )
          }
        >

          <option value="">
            Price
          </option>

          <option value="low">
            Low To High
          </option>

          <option value="high">
            High To Low
          </option>

        </select>

      </div>

      {/* Loading */}
      {isLoading && (

        <h2>
          Loading Products...
        </h2>

      )}

      {/* Error */}
      {error && (

        <h2>
          Failed To Load Products
        </h2>

      )}

      {/* Product Grid */}
      <div
        className="product-grid"
      >

        {filteredProducts.map(
          (item: any) => (

            <ProductCard
              key={item._id}
              product={item}
            />

          )
        )}

      </div>

      <Footer />

    </div>
  );
}