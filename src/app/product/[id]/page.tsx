"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addToCart, changeQuantity, setCartItems } from "@/src/redux/cartSlice";
import { useGetProductsQuery } from "@/src/services/productApi";
import { useAddCartMutation, useUpdateCartMutation } from "@/src/services/cartApi";
import { getProductList } from "@/src/models/Product";

const reviews = [
  { name: "Priya S.", initials: "PS", rating: 5, text: "Great quality and exactly as shown. Packaging was neat and delivery was quick." },
  { name: "Arjun K.", initials: "AK", rating: 4, text: "Very good value for the price. I would happily recommend this product." },
  { name: "Neha R.", initials: "NR", rating: 5, text: "Loved it! The finish feels premium and it has become one of my favourites." },
];

// Loads the selected product and connects its quantity buttons to the server-backed cart.
export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productId = decodeURIComponent(id);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.profile);
  const merchantId = user?.merchantId ?? "";
  const userId = user?.id ?? "";
  const cartItem = useAppSelector(state => state.cart.items.find(item => item._id === productId));
  const { data, isLoading } = useGetProductsQuery(merchantId, { skip: !merchantId });
  const [addCart] = useAddCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const product = getProductList(data).find(item => item._id === productId) || cartItem;

  const handleAddToCart = async () => {
    if (!product) return;

    dispatch(addToCart(product));
    if (!userId) return;

    try {
      const response = await addCart({ userId, productId, quantity: 1 }).unwrap();
      dispatch(setCartItems(response.items));
    } catch {
      // The local cart remains usable if the backend is temporarily unavailable.
    }
  };

  const handleQuantityChange = async (amount: number) => {
    if (!cartItem || !userId) return;

    const nextQuantity = cartItem.quantity + amount;
    dispatch(changeQuantity({ id: productId, amount }));

    try {
      const response = await updateCart({ userId, productId, quantity: nextQuantity }).unwrap();
      dispatch(setCartItems(response.items));
    } catch {
      // The next cart fetch will reconcile with the server.
    }
  };

  if (isLoading) return <><Header /><div className="product-status page-loading"><span className="loader" /> Loading product details...</div></>;
  if (!product) return <><Header /><div className="not-found"><span>404</span><h1>Product not found</h1><Link href="/home-screen">Return to shopping</Link></div></>;

  return (
    <div className="storefront-page">
      <Header />
      <main className="product-detail-page">
        <nav className="breadcrumbs"><Link href="/home-screen">Home</Link><span>/</span><span>{product.category || "Products"}</span><span>/</span><strong>{product.productName}</strong></nav>
        <section className="product-hero">
          <div className="detail-image-panel"><span className="detail-badge">Bestseller</span><img src={product.image || "/product-placeholder.svg"} alt={product.productName} /></div>
          <div className="detail-copy">
            <span className="detail-category">{product.category || "EAZYBUY COLLECTION"}</span>
            <h1>{product.productName}</h1>
            <div className="detail-rating"><span>Star 4.6</span><a href="#reviews">238 verified ratings</a></div>
            <div className="detail-price">Rs. {Number(product.price).toLocaleString("en-IN")} <small>inclusive of all taxes</small></div>
            <p className="detail-description">{product.description || "A thoughtfully selected product made for everyday use. Enjoy dependable quality, a modern finish, and excellent value delivered safely to your doorstep."}</p>
            <ul className="detail-benefits"><li>7-day easy returns</li><li>Free delivery on eligible orders</li><li>Secure payments</li></ul>
            <div className="delivery-box"><span>PIN</span><div><strong>Delivery across India</strong><small>Usually dispatched within 1-2 business days</small></div></div>
          </div>
        </section>

        <section className="reviews-section" id="reviews">
          <div className="reviews-heading"><div><span className="section-kicker">CUSTOMER STORIES</span><h2>Reviews & ratings</h2></div><div className="review-score"><strong>4.6</strong><span>*****</span><small>Based on 238 ratings</small></div></div>
          <div className="review-grid">{reviews.map(review => <article className="review-card" key={review.name}><div className="review-person"><span>{review.initials}</span><div><strong>{review.name}</strong><small>Verified buyer</small></div></div><div className="review-stars">{"*".repeat(review.rating)}{".".repeat(5 - review.rating)}</div><p>{review.text}</p></article>)}</div>
          <p className="dummy-review-note">Demo reviews - replace these with your review API later.</p>
        </section>

        <section className="add-cart-panel">
          <div><small>Your price</small><strong>Rs. {Number(product.price).toLocaleString("en-IN")}</strong><span>Free delivery available</span></div>
          {cartItem ? <div className="quantity-control" aria-label="Cart quantity"><button onClick={() => handleQuantityChange(-1)} aria-label="Decrease quantity">-</button><span>{cartItem.quantity}</span><button onClick={() => handleQuantityChange(1)} aria-label="Increase quantity">+</button></div> : null}
          <button className="add-cart-button" onClick={handleAddToCart}>{cartItem ? "Add one more" : "Add to cart"}<span>-&gt;</span></button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
