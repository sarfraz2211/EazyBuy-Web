import AuthContainer from "@/src/components/auth/AuthContainer";
import AuthInput from "@/src/components/auth/AuthInput";
import AuthButton from "@/src/components/auth/AuthButton";
import Link from "next/link";

export default function RegisterPage() {
  return (

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
      <AuthInput placeholder="Enter full name" />
      <AuthInput placeholder="Enter contact number" />
      <AuthInput type="password" placeholder="Create password" />
      <AuthInput placeholder ="Enter Address" />
      <AuthInput placeholder = "Enter Merchant ID" />
      <div className="button-row">
        <AuthButton title="Register" />
      </div>
    </AuthContainer>
  );
}