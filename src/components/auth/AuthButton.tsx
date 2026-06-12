import React from "react";

interface AuthButtonProps {

  title: string;

  variant?: "primary" | "secondary";

  disabled?: boolean;

  onClick?: () => void;
}

export default function AuthButton({

  title,

  variant = "primary",

  disabled = false,

  onClick,

}: AuthButtonProps) {

  return (

    <button
      disabled={disabled}
      onClick={onClick}
      className={
        variant === "primary"
          ? "auth-button-primary"
          : "auth-button-secondary"
      }
    >
      {title}
    </button>
  );
}