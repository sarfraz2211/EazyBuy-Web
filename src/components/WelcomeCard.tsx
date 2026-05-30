// React component for reusable welcome box

// "use client" means this component runs on browser side
"use client";

// Next.js component for navigation
import Link from "next/link";

// Reusable component
export default function WelcomeCard() {
  return (

    // Main card container
    <div className="welcome-card">

      {/* Title */}
      <h1 className="welcome-title">
        Welcome to EazyBuy
      </h1>

      {/* Quote */}
      <p className="welcome-subtitle">
        Shop smarter, faster and easier with modern ecommerce experience.
      </p>

      {/* Buttons container */}
      <div className="button-group">

        {/* Register button */}
        <Link href="/register">
          <button className="primary-button">
            Register
          </button>
        </Link>

        {/* Login button */}
        <Link href="/login">
          <button className="secondary-button">
            Sign In
          </button>
        </Link>

      </div>
    </div>
  );
}