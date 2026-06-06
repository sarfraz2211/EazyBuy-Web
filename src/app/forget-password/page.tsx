
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthButton from "@/src/components/auth/AuthButton";
import AuthContainer from "@/src/components/auth/AuthContainer";
import AuthInput from "@/src/components/auth/AuthInput";

import Toast from "@/src/components/common/Toast";
import CustomModal from "@/src/components/common/CustomModal";

import { validatePasswordReset } from "@/src/utils/validation";

export default function ForgetPasswordPage() {

  const router = useRouter();

  const [mobile, setMobile] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [showModal, setShowModal] = useState(false);

  const handleResetPassword = () => {
    
    const error = validatePasswordReset(mobile);

    if ( error) {
      setToastMessage( error);
      setToastType("error")

    } else {
       setToastType( "success")

       setToastMessage ("Password Reset Successfully");

       setShowModal(true);
    }

  };


  return (
    <>

        <Toast
              message = {toastMessage}
              type = {toastType}
        />

         <CustomModal
              open={showModal}
              title = "Password Reset"
              message = " Password reset successful . Please login to enjoy our services."
              onClose={() => {

            setShowModal(false);

            router.push("/login");

          }}
        />

    <AuthContainer
      title="Reset Your Password"
      subtitle="Enter your contact number to receive a password reset link"
    >
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
      <div className="button-row">
        <AuthButton 
        title="Reset Password" 
         onClick={handleResetPassword}/>
      </div>
    </AuthContainer>


    </>
  );
}