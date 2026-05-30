// Import reusable component
import WelcomeCard from "../components/WelcomeCard";

// Import Next.js image component
import Image from "next/image";

// Main screen
export default function HomePage() {

  return (

    // Full screen container
    <main className="main-container">

      {/* Header section */}
      <header className="header">

        {/* Left side logo */}
        <div className="logo-container">

          {/* Ecommerce logo */}
          <Image
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="logo"
            width={45}
            height={45}
          />

          {/* App name */}
          <h2 className="logo-text">
            EazyBuy
          </h2>
        </div>

      </header>

      {/* Center content */}
      <section className="content-section">

        {/* Reusable component */}
        <WelcomeCard />

      </section>

    </main>
  );
}