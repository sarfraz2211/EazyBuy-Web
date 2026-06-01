import AuthButton from "@/src/components/auth/AuthButton";
import AuthContainer from "@/src/components/auth/AuthContainer";
import AuthInput from "@/src/components/auth/AuthInput";
import Link from "next/link";

export default function LoginPage() {

  return (

    <AuthContainer
      title="Welcome Back"
      subtitle="Login to continue shopping smarter"
    >

      <AuthInput
        placeholder="Enter contact number"
      />

      <AuthInput
        type="password"
        placeholder="Enter password"
      />

      <div className="forgot-password-container">

        <Link href="/forget-password">
          Forgot Password?
        </Link>

      </div>

      <div className="button-row">

        {/* Login Button */}
        <div className="button-wrapper">

          <AuthButton
            title="Login"
          />

        </div>

        {/* Register Button */}
        <div className="button-wrapper">

          <Link
            href="/register"
            className="full-width-link"
          >

            <AuthButton
              title="Register"
              variant="secondary"
            />

          </Link>

        </div>

      </div>

    </AuthContainer>

  );
}