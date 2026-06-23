"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { changeQuantity, clearCart, removeFromCart, setCartItems } from "@/src/redux/cartSlice";
import { useDeleteCartMutation, useGetCartQuery, useUpdateCartMutation } from "@/src/services/cartApi";

// Shows server-backed cart items and keeps Redux in sync for the header count.
export default function CartPage() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.profile?.id ?? "");
  const items = useAppSelector(state => state.cart.items);
  const { data: cartData, isFetching } = useGetCartQuery(userId, { skip: !userId });
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (cartData?.items) {
      dispatch(setCartItems(cartData.items));
    }
  }, [cartData, dispatch]);

  const syncQuantity = async (productId: string, quantity: number) => {
    if (!userId) return;

    try {
      const response = await updateCart({ userId, productId, quantity }).unwrap();
      dispatch(setCartItems(response.items));
    } catch {
      // Keep the optimistic UI local when the server is temporarily unreachable.
    }
  };

  const handleQuantityChange = (productId: string, amount: number, currentQuantity: number) => {
    const nextQuantity = currentQuantity + amount;
    dispatch(changeQuantity({ id: productId, amount }));
    void syncQuantity(productId, nextQuantity);
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
    void syncQuantity(productId, 0);
  };

  const handleClearCart = async () => {
    if (!userId) return;

    dispatch(clearCart());
    try {
      await deleteCart(userId).unwrap();
    } catch {
      // Local cart is already cleared; the next getCart request will reconcile.
    }
  };

  return (
    <div className="storefront-page">
      <Header />
      <main className="cart-page">
        <div className="cart-title">
          <span className="section-kicker">YOUR BAG</span>
          <h1>Shopping cart</h1>
          <p>{isFetching ? "Refreshing cart..." : `${items.length} ${items.length === 1 ? "item" : "items"} ready for checkout`}</p>
        </div>
        {items.length === 0 ? (
          <section className="empty-cart">
            <div>Bag</div>
            <h2>Your cart is waiting</h2>
            <p>Explore today&apos;s picks and add something you love.</p>
            <Link href="/home-screen">Continue shopping</Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items">
              {items.map(item => (
                <article className="cart-item" key={item._id}>
                  <img src={item.image || "/product-placeholder.svg"} alt={item.productName} />
                  <div className="cart-item-copy">
                    <small>{item.category || "EazyBuy"}</small>
                    <Link href={`/product/${encodeURIComponent(item._id)}`}>{item.productName}</Link>
                    <strong>Rs. {Number(item.price).toLocaleString("en-IN")}</strong>
                    <button className="remove-button" onClick={() => handleRemove(item._id)}>Remove</button>
                  </div>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item._id, -1, item.quantity)} aria-label="Decrease quantity">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, 1, item.quantity)} aria-label="Increase quantity">+</button>
                  </div>
                  <b>Rs. {Number(item.price * item.quantity).toLocaleString("en-IN")}</b>
                </article>
              ))}
            </section>
            <aside className="order-summary">
              <h2>Order summary</h2>
              <div><span>Subtotal</span><strong>Rs. {subtotal.toLocaleString("en-IN")}</strong></div>
              <div><span>Delivery</span><strong className="free-text">FREE</strong></div>
              <hr />
              <div className="total-row"><span>Total</span><strong>Rs. {subtotal.toLocaleString("en-IN")}</strong></div>
              <button>Proceed to checkout <span>-&gt;</span></button>
              <button type="button" className="remove-button" onClick={handleClearCart}>Clear cart</button>
              <small>Safe and secure checkout</small>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
