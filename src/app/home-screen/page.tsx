"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import Banner from "@/src/components/layout/Banner";
import ProductCard from "@/src/components/product/ProductCard";
import { useAppSelector } from "@/src/redux/hooks";
import { useGetProductsQuery, useSearchProductsQuery } from "@/src/services/productApi";
import { getProductList } from "@/src/models/Product";

// Builds the searchable and filterable storefront home page.
export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceSort, setPriceSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const user = useAppSelector(state => state.auth.profile);
  const merchantId = user?.merchantId ?? "";

  // Waits briefly after typing so the protected API is not called for every key press.
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchTerm.trim()), 450);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  const productsQuery = useGetProductsQuery(merchantId, { skip: !merchantId });
  const searchQuery = useSearchProductsQuery(
    { merchantId, searchTerm: debouncedSearch, category: selectedCategory, priceSort },
    { skip: !merchantId || (debouncedSearch.length < 2 && selectedCategory === "All") }
  );

  const isSearching = debouncedSearch.length >= 2;
  const canUseSearchData = (isSearching || selectedCategory !== "All") && !searchQuery.error;
  const products = getProductList(canUseSearchData ? searchQuery.data : productsQuery.data);
  const isLoading = canUseSearchData ? searchQuery.isFetching : productsQuery.isLoading;
  const error = productsQuery.error;

  const categories = useMemo(() => [
    "All",
    ...Array.from(new Set(getProductList(productsQuery.data).map(item => item.category).filter(Boolean) as string[])),
  ], [productsQuery.data]);

  // Applies category, text search, and price options to whichever list is visible.
  const filteredProducts = useMemo(() => {
    const searched = isSearching
      ? products.filter(item => item.productName.toLowerCase().includes(debouncedSearch.toLowerCase()))
      : products;

    const result = selectedCategory === "All"
      ? [...searched]
      : searched.filter(item => item.category === selectedCategory);

    if (priceSort === "low") result.sort((a, b) => a.price - b.price);
    if (priceSort === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, selectedCategory, priceSort, isSearching, debouncedSearch]);

  return (
    <div className="storefront-page">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main>
        <Banner />
        <section className="catalog-section" id="products">
          <div className="catalog-heading">
            <div>
              <span className="section-kicker">HANDPICKED FOR YOU</span>
              <h2>{isSearching ? `Results for "${debouncedSearch}"` : "Discover your next favourite"}</h2>
            </div>
            <div className="category-filter">
              <select aria-label="Filter by category" value={selectedCategory} onChange={event => setSelectedCategory(event.target.value)}>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
              <select aria-label="Sort by price" value={priceSort} onChange={event => setPriceSort(event.target.value)}>
                <option value="">Featured</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
              </select>
            </div>
          </div>

          {isLoading && <div className="product-status"><span className="loader" /> Finding the best products...</div>}
          {error && <div className="product-status error-state">We could not load products. Please check your login and try again.</div>}
          {!isLoading && !error && filteredProducts.length === 0 && <div className="product-status empty-state"><strong>No products found</strong><span>Try a different search word or category.</span></div>}
          <div className="product-grid">{filteredProducts.map(item => <ProductCard key={item._id} product={item} />)}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
