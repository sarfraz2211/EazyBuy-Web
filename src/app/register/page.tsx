
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthButton from "@/src/components/auth/AuthButton";
import AuthContainer from "@/src/components/auth/AuthContainer";
import AuthInput from "@/src/components/auth/AuthInput";

import Toast from "@/src/components/common/Toast";
import CustomModal from "@/src/components/common/CustomModal";

import { validateSignUp } from "@/src/utils/validation";

export default function RegisterPage() {
  
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [merchantId, setMerchantId] = useState("");

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<"success" | "error">("success");

    const [showModal, setShowModal] =
    useState(false);

  const handleSignup = () => {

  const errorMessage = validateSignUp(
    name,
    mobile,
    password,
    address,
    merchantId
  );

  if (errorMessage) {

    setToastMessage(errorMessage);
    setToastType("error");

  } else {

    setToastType("success");

    setToastMessage(
      "Registration Successful"
    );

    setShowModal(true);
  }
};
  
  return (
    <>
      <Toast
        message={toastMessage}
        type={toastType}
      />

              {/* Success Modal */}
        <CustomModal
              open={showModal}
              title="Registration Success"
              message="Welcome to EazyBuy"
              onClose={() => {

            setShowModal(false);

            router.push("/home-screen");

          }}
        />

    <AuthContainer
      title="Create Account"
      subtitle="Join us to enjoy exclusive deals and personalized shopping experience"
    >

       {/* Profile Image Upload */}
      <div className="profile-upload-container">

        <label
          htmlFor="profileImage"
          className="profile-upload-label"
        >
          +
        </label>

        <input
          type="file"
          id="profileImage"
          accept="image/*"
          className="profile-upload-input"
        />

      </div>
      <AuthInput placeholder="Enter full name" 
         value={name}
          onChange={(e) =>
            setName(e.target.value)
          }/>
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
      <AuthInput type="password" placeholder="Create password" 
         value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }/>
      <AuthInput placeholder ="Enter Address" 
         value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }/>
      <AuthInput placeholder = "Enter Merchant ID" 
         value={merchantId}
          onChange={(e) =>
            setMerchantId(e.target.value)
          }/>
       <div className="button-row">
        <AuthButton
          title="Register"
          onClick={handleSignup}
        />
      </div>

    </AuthContainer>

  </>

  );
}