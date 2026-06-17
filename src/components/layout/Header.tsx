"use client";

import Link from "next/link";
import { useAppSelector } from "@/src/redux/hooks";

export default function Header() {

  const user =
    useAppSelector(
      state => state.auth.profile
    );

  return (

    <header className="header-container">

      <div className="logo">
        EazyBuy
      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="search-box"
      />

      <div className="header-right">

        <span>
          Hello,
          {user?.name}
        </span>

        <Link href="/profile">
          Profile
        </Link>

        <Link href="/cart">
          Cart
        </Link>

      </div>

    </header>
  );
}