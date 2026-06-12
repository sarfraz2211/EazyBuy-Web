
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthButton from "@/src/components/auth/AuthButton";
import AuthContainer from "@/src/components/auth/AuthContainer";
import AuthInput from "@/src/components/auth/AuthInput";

import Toast from "@/src/components/common/Toast";
import CustomModal from "@/src/components/common/CustomModal";

import { validateSignUp } from "@/src/utils/validation";

import { useAppDispatch } from "@/src/redux/hooks";

import { registerUser } from "@/src/redux/authSlice";

import { useAppSelector } from "@/src/redux/hooks";

export default function RegisterPage() {
  
  const router = useRouter();
 
  const dispatch = useAppDispatch();
  
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [merchantId, setMerchantId] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState("");

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<"success" | "error">("success");

    const [showModal, setShowModal] = useState(false);

    const loading = useAppSelector(state => state.auth.loading);

  const handleSignup = async () => {

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

    return;

  } 

  try {
    
    const formData = new FormData();

    formData.append("name", name);

    formData.append( "contactNumber", mobile);

    formData.append( "password", password);

    formData.append( "address", address);

    formData.append("merchantId",merchantId);

    if (image) {

    formData.append( "image", image);
    }
    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
          setToastType("success");

        setToastMessage(
          "Registration Successful"
      );

      sessionStorage.setItem(
        "token",
        result.payload.token
      );

      sessionStorage.setItem(
        "profile",
        JSON.stringify(result.payload)
      );

       setShowModal(true);
    } else {

      setToastType("error");

      setToastMessage(
        "Registration Failed"
      );
    }

  } catch (error) {

    setToastType("error");

    setToastMessage(
      "Something went wrong"
    );
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

              <img
                src={
                  imagePreview ||
                  "/default-user.png"
                }
                alt="Profile"
                className="profile-image"
              />

              <label
                htmlFor="profileImage"
                className="upload-button"
              >
                Change Photo
              </label>

              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="profile-upload-input"
                onChange={(e) => {

                  if (
                    e.target.files &&
                    e.target.files[0]
                  ) {

                    const file =
                      e.target.files[0];

                    setImage(file);

                    setImagePreview(
                      URL.createObjectURL(file)
                    );
                  }
                }}
              />

            </div>

      <div className="register-form-grid">

     
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
    </div>
       <div className="button-row">

            <AuthButton
              title={
                loading
                  ? "Registering..."
                  : "Register"
              }
              disabled={loading}
              onClick={handleSignup}
            />

</div>

    </AuthContainer>

  </>

  );
}