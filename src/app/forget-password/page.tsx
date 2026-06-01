import AuthButton from "@/src/components/auth/AuthButton";
import AuthContainer from "@/src/components/auth/AuthContainer";
import AuthInput from "@/src/components/auth/AuthInput";
import Link from "next/link";

export default function ForgetPasswordPage() {
  return (
    <AuthContainer
      title="Reset Your Password"
      subtitle="Enter your contact number to receive a password reset link"
    >
      <AuthInput placeholder="Enter contact number" />
      <div className="button-row">
        <AuthButton title="Send Reset Link" />
      </div>
    </AuthContainer>
  );
}