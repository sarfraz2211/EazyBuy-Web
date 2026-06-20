"use client";

import Link from "next/link";
import { useAppSelector } from "@/src/redux/hooks";

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

// Displays shared navigation, optional search controls, and the live cart count.
export default function Header({ searchTerm = "", onSearchChange }: HeaderProps) {
  const user = useAppSelector(state => state.auth.profile);
  const cartCount = useAppSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="header-container">
      <Link href="/home-screen" className="logo" aria-label="EazyBuy home">
        <span className="logo-mark">E</span>EazyBuy
      </Link>

      <label className="search-container">
        <span className="sr-only">Search products</span>
        <input
          type="search"
          placeholder="Search for products, brands and more"
          className="search-box"
          value={searchTerm}
          onChange={event => onSearchChange?.(event.target.value)}
          disabled={!onSearchChange}
        />
        <span className="search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg>
        </span>
      </label>

      <div className="header-right">
        <span className="hello-user">Hello, <strong>{user?.name || "Shopper"}</strong></span>
        <Link href="/profile">Profile</Link>
        <Link href="/cart" className="cart-link">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h2l2.2 10.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 7H6M10 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" /></svg>
          Cart <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}
