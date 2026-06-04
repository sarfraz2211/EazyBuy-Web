import React from "react";

interface AuthInputProps {
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function AuthInput({
  type = "text",
  placeholder,
  value = "",
  onChange,
}: AuthInputProps) {

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="auth-input"
    />
  );
}