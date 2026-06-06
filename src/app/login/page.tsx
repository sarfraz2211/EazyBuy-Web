"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AuthButton from "@/src/components/auth/AuthButton";
import AuthContainer from "@/src/components/auth/AuthContainer";
import AuthInput from "@/src/components/auth/AuthInput";

import Toast from "@/src/components/common/Toast";
import CustomModal from "@/src/components/common/CustomModal";

import { validateLogin } from "@/src/utils/validation";

export default function LoginPage() {

  const router = useRouter();

  const [mobile, setMobile] = useState("");

  const [password, setPassword] = useState("");

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<"success" | "error">("success");

  const [showModal, setShowModal] =
    useState(false);

  const handleLogin = () => {

    const error = validateLogin(
      mobile,
      password
    );

    if (error) {

      setToastType("error");

      setToastMessage(error);

      return;
    }

    setToastType("success");

    setToastMessage(
      "Validation Successful"
    );

    // setShowModal(true);

    router.push("/home-screen");

  };

  return (

    <>

      {/* Toast */}
      <Toast
        message={toastMessage}
        type={toastType}
      />

      {/* Success Modal */}
      <CustomModal
        open={showModal}
        title="Login Success"
        message="Welcome to EazyBuy"
        onClose={() =>
          setShowModal(false)
        }
      />

      <AuthContainer
        title="Welcome Back"
        subtitle="Login to continue shopping smarter"
      >

        {/* Mobile Number */}
        <AuthInput
          type="tel"
          placeholder="Enter contact number"
          value={mobile}
          onChange={(e) =>
            setMobile(
              e.target.value
                .replace(/\D/g, "")
                .slice(0, 10)
            )
          }
      />

        {/* Password */}
        <AuthInput
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* Forgot Password */}
        <div className="forgot-password-container">

          <Link href="/forget-password">
            Forgot Password?
          </Link>

        </div>

        {/* Buttons */}
        <div className="button-row">

          <div className="button-wrapper">
            <AuthButton
              title="Login"
              onClick={handleLogin}
            />
        

          </div>

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

    </>

  );
}