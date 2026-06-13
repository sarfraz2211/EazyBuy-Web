
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthButton from "@/src/components/auth/AuthButton";
import AuthContainer from "@/src/components/auth/AuthContainer";
import AuthInput from "@/src/components/auth/AuthInput";

import Toast from "@/src/components/common/Toast";
import CustomModal from "@/src/components/common/CustomModal";

import { useAppDispatch } from "@/src/redux/hooks";

import { resetPassword } from "@/src/redux/authSlice";

import { validatePasswordReset } from "@/src/utils/validation";

import { useAppSelector } from "@/src/redux/hooks";

export default function ForgetPasswordPage() {

  const router = useRouter();

  const [contactNumber, setContactNumber] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [showModal, setShowModal] = useState(false);

  const loading = useAppSelector(state => state.auth.loading);

   const dispatch = useAppDispatch();

  const handleResetPassword = async () => {
    
    const error = validatePasswordReset(contactNumber,newPassword);

    if ( error) {
      setToastMessage( error);
      setToastType("error")

      return;
    }

    try {
       // call reset password api here and handle response accordingly
        const result = await dispatch(
              resetPassword({
                contactNumber: contactNumber,
                newPassword: newPassword
              })
            );

            if (resetPassword.fulfilled.match(result)) { 
                setToastType("success");

                  setToastMessage(
                    "Password reset successful. please login to enjoy services."
                  );

                  setShowModal(true);

            } else {
                setToastType("error");

              setToastMessage(
                "Reset Password Failed. please try again."
                );
            }
       
    } catch (error) {
      setToastMessage("An error occurred while resetting the password.");
      setToastType("error");
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
      subtitle="Enter new password as your login password."
    >
      <AuthInput
        type="tel"
        placeholder="Enter contact number"
        value={contactNumber}
        onChange={(e) =>
          setContactNumber(
            e.target.value
              .replace(/\D/g, "")
              .slice(0, 10)
          )
        }
      />
      <div className= "forget-password-container">
         {/* Password */}
                 <AuthInput
                   type="password"
                   placeholder="Enter new password"
                   value={newPassword}
                   onChange={(e) =>
                     setNewPassword(e.target.value)
                   }
                 />
      </div>
      <div className="button-row">
        <AuthButton 
        title={
                loading
                  ? "Resetting..."
                  : "Reset Password"
              }
              disabled={loading} 
         onClick={handleResetPassword}/>
      </div>
    </AuthContainer>


    </>
  );
}