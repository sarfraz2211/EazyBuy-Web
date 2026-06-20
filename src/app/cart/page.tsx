"use client";

import Link from "next/link";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { changeQuantity, removeFromCart } from "@/src/redux/cartSlice";

// Shows persisted cart items and calculates totals whenever quantities change.
export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return <div className="storefront-page"><Header /><main className="cart-page"><div className="cart-title"><span className="section-kicker">YOUR BAG</span><h1>Shopping cart</h1><p>{items.length} {items.length === 1 ? "item" : "items"} ready for checkout</p></div>
    {items.length === 0 ? <section className="empty-cart"><div>🛍️</div><h2>Your cart is waiting</h2><p>Explore today’s picks and add something you love.</p><Link href="/home-screen">Continue shopping</Link></section> : <div className="cart-layout"><section className="cart-items">{items.map(item => <article className="cart-item" key={item._id}><img src={item.image || "/product-placeholder.svg"} alt={item.productName} /><div className="cart-item-copy"><small>{item.category || "EazyBuy"}</small><Link href={`/product/${encodeURIComponent(item._id)}`}>{item.productName}</Link><strong>₹{Number(item.price).toLocaleString("en-IN")}</strong><button className="remove-button" onClick={() => dispatch(removeFromCart(item._id))}>Remove</button></div><div className="quantity-control"><button onClick={() => dispatch(changeQuantity({ id: item._id, amount: -1 }))}>−</button><span>{item.quantity}</span><button onClick={() => dispatch(changeQuantity({ id: item._id, amount: 1 }))}>+</button></div><b>₹{Number(item.price * item.quantity).toLocaleString("en-IN")}</b></article>)}</section><aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div><div><span>Delivery</span><strong className="free-text">FREE</strong></div><hr /><div className="total-row"><span>Total</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div><button>Proceed to checkout <span>→</span></button><small>🔒 Safe and secure checkout</small></aside></div>}
  </main><Footer /></div>;
}
